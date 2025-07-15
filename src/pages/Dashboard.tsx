import { useEffect, useState } from 'react';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
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
import { api_user_info, api_user_login } from '@/core/api';
import { checkAuth } from '@/core/utils';
import { setAuth, setUserId } from '@/core/storage';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } =useSignMessage();
  const [selectedCard, setSelectedCard] = useState({} as any);
  const [transactions, setTransactions] = useState({} as any);
  const [showBalance, setShowBalance] = useState(true);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [isRecharging, setIsRecharging] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
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
        // const data = await api_user_info()
        // console.log(data)
        // if(data && data.data)
        //   {
            
        //   }
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
                        {selectedCard.cardNumber}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs opacity-60">VALID THRU</p>
                          <p className="text-sm font-mono">12/27</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-60">CARDHOLDER</p>
                          <p className="text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
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
                
                <Button 
                  gradient 
                  className="w-full" 
                  onClick={handleRecharge}
                  disabled={!rechargeAmount || isRecharging}
                >
                  {isRecharging ? 'Processing...' : 'Recharge Card'}
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
              <h3 className="text-lg font-semibold text-white">Create New Card</h3>
              
              <Input
                label="Card Name"
                placeholder="e.g., Travel Card, Shopping Card"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
              />
              
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
                  onClick={handleNewCard}
                  disabled={!newCardName.trim()}
                >
                  Create Card
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