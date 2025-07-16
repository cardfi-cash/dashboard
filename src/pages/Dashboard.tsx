import { useEffect, useState } from 'react';
import { useAccount, useConnect, useSendTransaction, useSignMessage ,useWriteContract } from 'wagmi';
import { parseUnits ,isAddress} from 'viem';
import { erc20Abi } from 'viem';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card as tCard, StakingPool as tStakingPool, Transaction as tTransaction } from '../types';
import { 
  CreditCard, 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  MoreVertical,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';
import { defaultCards, defaultTransactions, mockCards, mockTransactions } from '../utils/mock-data';
import { Transaction } from '../types';
import { api_card_apply, api_order_check, api_user_cards, api_user_data, api_user_info, api_user_info_update, api_user_login } from '@/core/api';
import { checkAuth, formatPan, formatTime, sleep } from '@/core/utils';
import { setAuth, setUserId } from '@/core/storage';
import config, { getChain, getToken } from '@/core/config';
import { generateQRCodeBase64 } from '@/core/qr';
import { getChainId } from 'viem/actions';

const Dashboard = () => {
  
  const countries = config.region;
  const [copiedIndex, setCopiedIndex] = useState<number>(0);
  const [generatingOpen, setGeneratingOpen] = useState(false);
  const [targetQr, setTargetQr] = useState('');
  const [target, setTarget] = useState("0x0ff238b62d8E38102e3225cAb5F61f459eDb893e");
  const [targetAmount, setTargetAmount] = useState('');
  
  const [tips,setTips] = useState(` ⚠ Tips : Please wait for few min for transaction confirm . ❗ Don't pay twice !`);

  const [from, setFrom] = useState("USDTARBITRUM");
  const [invoiceId , setInvoiceId] = useState("")
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [email, setEmail] = useState('');
  const [firstName,setFirstName]= useState('');
  const [lastName,setLastName]= useState('');
  const [holderRegion, setHolderRegion] = useState('HK');
  const [holderZipcode, setHolderZipcode] = useState('');
  const [holderCity, setHolderCity] = useState('');
  const [holderDetails, setHolderDetails] = useState('');


  const { address, isConnected , chain } = useAccount();
  const { signMessageAsync } =useSignMessage();
  const { writeContract ,writeContractAsync } = useWriteContract()
  const { sendTransactionAsync } = useSendTransaction();
  const [selectedCard, setSelectedCard] = useState({} as any);
  const [transactions, setTransactions] = useState({} as any);
  const [showBalance, setShowBalance] = useState(true);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [isRecharging, setIsRecharging] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [newCardName, setNewCardName] = useState('');

  const [cards, setCards] = useState([]);

  const [sumInfo, setSumInfo] = useState({
    totalBalance:0,
    activeCard:0,
    usedBalance:0
  });

  const [isAuth , setIsAuth] = useState(false)
  const [initLock , setInitLock] = useState(false)
    useEffect(() => {
    const auth = checkAuth()
    setIsAuth(auth);

    const init = async () => {
      setCards(defaultCards)
      setSelectedCard(defaultCards[0])
      setTransactions(defaultTransactions)
      await userInfoInit()
      await userCardInit()
    };
    if(!auth)
    {
      console.log('Not auth yet , sign message');
      signIn()
    }else{
      if(isConnected)
      {
        if(!initLock)
        {
          setInitLock(true);
          init();
        }
      }else{
        //Logout
        setAuth("")
      }

    }

  }, [isConnected]); 

  const signIn = async () => {
    const msg = `CardFi Protocol Sign : ${Date.now()}`  
    const data = await signMessageAsync({ message: msg } as any);
    
    const body = {
      address : address.toString(),
      msg,
      sign:data
    }

    console.log(body)
    const auth = await api_user_login(body)
    console.log(auth)
    if(auth && auth?.code == 200 && auth?.data)
    {
      setAuth(auth.data.token);
      setUserId(auth.data.info.id);
      setIsAuth(true);
    }
  };

  const userInfoInit = async()=>
  {
          const data = await api_user_info()
          // console.log(data)
          if(data && data.data)
          {
            let d = data.data
            setPhoneCode(d.mobile.nation_code)
            setPhone(d.mobile.mobile)
            setEmail(d.email)
            setFirstName(d.first_name)
            setLastName(d.last_name)
            setHolderRegion(d.region);

            let add = d.address.split("|");
            if(add[0])
            {
              setHolderZipcode(add[0]);
            }
            if(add[1])
            {
              setHolderCity(add[1])
            }

            if(add[2])
            {
              setHolderDetails(add[2])
            }
          }
  }
  const userCardInit = async()=>
  {
     const data = await api_user_cards()
    //  console.log(data)
     if(data && data.code ==200 &&data?.data && data.data?.length>0)
     {

     }else{
      return false;
     }
    let cs = [];
    let txs = [];
    let sum = JSON.parse(
      JSON.stringify(sumInfo)
    )
    for(let i of data.data)
    {
      let c =   {
        id: i?.user_card_id,
        name: `${i.card_region} CARD`,
        balance: i?.available_balance,
        currency: 'USD',
        cardNumber: formatPan(i?.pan),
        isActive: true,
        type: 'prepaid',
        createdAt: new Date(i?.create_time),
        cvv:i?.cvv,
        month:i?.expire_month,
        year:i?.expire_year
      }
      // console.log(c)
      cs.push(c)
      sum.totalBalance+=Number(i?.available_balance)

      //Transaction check
      for(let u of i.hisotry.transactions)
      {
        txs.push(
          {
            id: u?.transaction_id,
            type: 'spend',
            amount: u.surcharge.amount,
            currency: 'USDC',
            status: 'completed',
            timestamp: u.confirm_time,
            description: u.biz_type,
            hash: '0x1234...5678',
          }
        )
      }
    }
    sum.activeCard = data.data.length;
    setSumInfo(sum)
    setCards(cs)
    setSelectedCard(cs[0])
    if(txs.length>0)
    {
      setTransactions(txs);
    }
  }
  
  const apply = async() =>
  {
    if(!isConnected)
    {
      
    }else{

      try{
          //Submit the address to server and generate invoice id
          await updateHolderInfo()
          //Submit the invoice id on chain .
          await confirmPayment()
          // location.href="/home/card"
      }catch(e)
      {
        console.error(e)
      }

     
    }
  }

  const updateHolderInfo=async()=>
{
      const infoUpdate = await api_user_info_update(
        {
          first_name:firstName,
          last_name:lastName,
          birth:"2001-12-20",
          email,
          mobile: {
              nation_code:phoneCode,
              mobile:phone
          },
          region:holderRegion,
          address:`${holderZipcode}|${holderCity}|${holderDetails}`
        }
      )
      console.log(infoUpdate)
      return infoUpdate
}

const confirmPayment = async ()=>
{
      if(generatingOpen)
      {
        return false // avoide twice click .
      }
      const newOrder = await api_card_apply(
        {
          cardId:0,
          token:from
        }
      )
      console.log(
        newOrder
      )
      const qr = await generateQRCodeBase64(newOrder.data.to);
      setGeneratingOpen(true)
      setTargetQr(qr)
      setTarget(newOrder.data.to);
      setTargetAmount(Number(newOrder.data.amount).toString())
      timer()
      setShowInvoice(true)
      while(true)
      {
          await sleep(10000);
          const check = await api_order_check(newOrder.data.orderId);
          console.log("check",check)
          if(check.data)
          {
              location.href="/"
          }
          if(secondsLeft == 0 )
          {
              location.href="/"
          }
      }
}

  const timer = ()=>
  {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }

const applyNewCardPayment = async () => {
  try {
    if (!isAddress(target)) {
        throw new Error('Invalid address');
    }
    const tkf = getToken(from)
    if(!tkf)
    {
      throw new Error('Invalid token');
    }
const tx = await writeContractAsync({
  address: (tkf.address ?? '') as `0x${string}`,
  abi: erc20Abi,
  functionName: 'transfer',
  args: [target as `0x${string}`, parseUnits(targetAmount, 6)],
  account: address as `0x${string}`,
  chain,
});

    console.log('Transaction hash:', tx);
    setTips(`
      🍺 Transaction sent successfully. Please wait for block confirmation. Don't pay twice!
    `);
    return true;
  } catch (err) {
    console.error('Transfer failed:', err);
    setTips(`❌ Transaction failed: ${err.message}`);
    return false;
  }
};

  const handleRecharge = async () => {
    if (!rechargeAmount || isNaN(Number(rechargeAmount))) return;
    
    setIsRecharging(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRecharging(false);
    setRechargeAmount('');
    // In a real app, this would update the card balance
  };

  const handleNewCard = async () => {
    if (!newCardName.trim()) return;
    
    // Simulate card creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowNewCardForm(false);
    setNewCardName('');
    // In a real app, this would create a new card
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'recharge': return <ArrowDownCircle className="w-4 h-4 text-green-400" />;
      case 'spend': return <ArrowUpCircle className="w-4 h-4 text-red-400" />;
      case 'stake': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'unstake': return <TrendingUp className="w-4 h-4 text-orange-400" />;
      case 'reward': return <DollarSign className="w-4 h-4 text-purple-400" />;
      case 'signin': return <ArrowDownCircle className="w-4 h-4 text-green-400" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (!isConnected || !isAuth) {
    return (
      <div className="text-center space-y-6 py-20">
        <Card className="max-w-md mx-auto">
          <div className="space-y-4">
            <CreditCard className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Please connect your wallet to access your Cardfi dashboard and manage your prepaid cards.
            </p>
            {
              isConnected?
            <Button 
              gradient 
              onClick={() => signIn()}
              className="self-start"
            >
              
              SignIn
            </Button>
            :
            null
            }
          </div>
        </Card>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your DeFi prepaid cards and track your spending
          </p>
        </div>
        <Button 
          gradient 
          onClick={() => setShowNewCardForm(true)}
          className="self-start"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Card
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold text-white">
                ${sumInfo.totalBalance}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Cards</p>
              <p className="text-2xl font-bold text-white">
                {sumInfo.activeCard}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Used</p>
              <p className="text-2xl font-bold text-white">${sumInfo.usedBalance}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Card Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Card Display */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Active Card</h3>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="relative">
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-defi-pink via-defi-purple to-defi-blue p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-sm opacity-80">CARDFI</p>
                        <p className="text-xl font-bold">{selectedCard.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-80">{selectedCard.currency}</p>
                        <p className="text-lg font-bold">
                          {showBalance ? `$${selectedCard.balance.toLocaleString()}` : '••••'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-2xl font-mono tracking-wider">
                        {showBalance ? selectedCard.cardNumber : '•••• •••• •••• ••••'}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs opacity-60">VALID THRU</p>
                          <p className="text-sm font-mono">{selectedCard?.month ?`${selectedCard?.month}/${selectedCard?.year}` :"12/2027"}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-60">CVV</p>
                          <p className="text-xl font-mono tracking-wider">
                            {showBalance ? selectedCard?.cvv : '•••'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Selection */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`flex-shrink-0 p-3 rounded-lg border transition-all ${
                      selectedCard.id === card.id
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{card.name}</p>
                      <p className="text-xs text-muted-foreground">{card.cardNumber}</p>
                      <p className="text-xs text-primary">${card.balance.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="text-sm font-medium text-white">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'spend' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {transaction.type === 'spend' ? '-' : '+'}
                        ${transaction.amount.toLocaleString()}
                      </p>
                      <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Recharge Card */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recharge Card</h3>
              
              <div className="space-y-3">
                <Input
                  label="Amount (USDC)"
                  type="number"
                  placeholder="0.00"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                />
                <select
                  id="from"
                  required
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px',
                    fontSize: '10px',
                    borderRadius: '10px',
                    border: `1px solid`,
                    backgroundColor: 'transparent',
                    boxSizing: 'border-box',
                    color:"white",
                    
                  }}
                >
                  <option value="" disabled>
                    {'Select Token'}
                  </option>
                  {(config.tokens).map((tk) => (
                    <option key={tk.id} value={tk.id} style={{color:"black"}}>
                      {tk.name}
                    </option>
                  ))}
              </select>
                <Button 
                  gradient 
                  className="w-full" 
                  onClick={handleRecharge}
                  disabled={!rechargeAmount || isRecharging}
                >
                  {isRecharging ? 'Processing...' : 'Deposit'}
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Funds will be available instantly</p>
                <p>• Gas fees: ~$0.50</p>
                <p>• Deposit fees: 1.49%</p>
                <p>• Supported: USDC, USDT</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="space-y-4" >
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" style={{color:"white"}} onClick={() => setShowBalance(!showBalance)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Card Details
                </Button>
                
                <Button variant="outline" className="w-full justify-start" style={{color:"white"}}>
                  <Activity className="w-4 h-4 mr-2" />
                  Transaction History
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New Card Modal */}
      {showNewCardForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Apply New Card</h3>
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="holder"
                className='text-white'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {"Holder"}
                <span style={{ marginLeft: '4px' }}>*</span>
              </label>
              <div className="w-full flex">
              <Input
                id="holder"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                 
                }}
              />
                <Input
                id="holder"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                  
                }}
              />
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="phone"
                className='text-white'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {"Phone Number"}
                <span style={{ marginLeft: '4px' }}>*</span>
              </label>
              <div className="w-full flex">
              <input
                id="phoneCode"
                type="text"
                placeholder="852"
                required
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                style={{
                  width: '20%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                  color:"white",
                  backgroundColor:"transparent"
                }}
              />
              <input
                id="phone"
                type="text"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '80%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                  color:"white",
                  backgroundColor:"transparent"
                }}
              />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                className='text-white'
                htmlFor="email"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {"Email"}
                <span style={{ marginLeft: '4px' }}>*</span>
              </label>
              <Input
                id="holder"
                type="text"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                   
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label
                  className='text-white'
                  htmlFor="holderRegion"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {"Address"}
                  <span style={{ marginLeft: '4px' }}>*</span>
                </label>

                <select
                  id="holderRegion"
                  required
                  value={holderRegion}
                  onChange={(e) => setHolderRegion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    backgroundColor: 'transparent',
                    boxSizing: 'border-box',
                    color:"white",
                    
                  }}
                >
                  <option value="" disabled>
                    {'Select Region'}
                  </option>
                  {(Object.keys(countries)).map((country) => (
                    <option key={country} value={country} style={{color:"black"}}>
                      {countries[country]}
                    </option>
                  ))}
              </select>
              </div>
              <div style={{ flex: 1 }}>
                <label
                  className='text-white'
                  htmlFor="holderZipcode"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  &nbsp;
                </label>
                <Input
                  id="holderZipcode"
                  type="text"
                  placeholder={"PostCode"}
                  required
                  value={holderZipcode}
                  onChange={(e) => setHolderZipcode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    boxSizing: 'border-box',
                     
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  className='text-white'
                  htmlFor="holderCity"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  &nbsp;
                </label>
                <Input
                  id="holderCity"
                  type="text"
                  placeholder={"City"}
                  required
                  value={holderCity}
                  onChange={(e) => setHolderCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    boxSizing: 'border-box',
                     
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Input
                id="holderDetails"
                type="text"
                placeholder={"Stree"}
                required
                value={holderDetails}
                onChange={(e) => setHolderDetails(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                   
                }}
              />
            </div>


            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label
                  className='text-white'
                  htmlFor="holderRegion"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {"Pay With"}
                  <span style={{ marginLeft: '4px' }}>*</span>
                </label>

                <select
                  id="from"
                  required
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    backgroundColor: 'transparent',
                    boxSizing: 'border-box',
                    color:"white",
                    
                  }}
                >
                  <option value="" disabled>
                    {'Select Token'}
                  </option>
                  {(config.tokens).map((tk) => (
                    <option key={tk.id} value={tk.id} style={{color:"black"}}>
                      {tk.name}
                    </option>
                  ))}
              </select>
              </div>

            </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowNewCardForm(false)}
                  style={{color:"white"}}
                >
                  Cancel
                </Button>
                <Button 
                  gradient 
                  className="flex-1" 
                  onClick={apply}
                >
                  Apply Card
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Confirm Payment</h3>
              <p className="grow text-center font-bold text-white">Transfer {targetAmount} {from} to</p>
              <section className="flex flex-col gap-2">
                    <div className="search-items flex flex-wrap gap-2">
                      <div className="w-full flex justify-center items-center">
                        <div className="flex w-full">
                          <pre className="w-full text-center text-sm bg-gray-800 p-2 rounded text-white overflow-hidden text-ellipsis whitespace-nowrap">{target}</pre>
                        </div>
                      </div>
                        <div className="w-full flex justify-center items-center">
                          <button
                            // onClick={() => handleCopy(target, 0)}
                            className="w-3/5 text-xs px-2 py-1 rounded-xl bg-gray-800 hover:bg-gray-500 transition text-center  text-white"
                          >
                            {copiedIndex === 1  ? 'Copied!' : 'Copy'}
                          </button>
                        </div>

                      <div className="w-full flex justify-center items-center">
                          <img
                          src={targetQr?targetQr:"/img/logo.png"}
                          style={{
                            width:"50%",
                            height:"50%",
                            minWidth:"256px",
                            minHeight:"256px"
                          }}
                          />
                        </div>


                        <div className="w-full flex justify-center items-center  text-white">
                          <div className="text-6xl font-bold text-gray-300">
                            {formatTime(secondsLeft)}
                          </div>
                        </div>

                          <Button 
                            gradient 
                            className="flex-1 w-full min-h-[50px]" 
                            onClick={applyNewCardPayment}
                          >
                            Connect And Send
                          </Button>
                    </div>
                        <div className="w-full flex justify-center items-center text-sm text-white">
                         {tips}
                        </div>
                  </section>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowInvoice(false)}
                  style={{color:"white"}}
                >
                  Cancel
                </Button>
                <Button 
                  gradient 
                  className="flex-1" 
                  onClick={handleNewCard}
                  // disabled={!newCardName.trim()}
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;