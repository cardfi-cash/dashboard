import { useState } from 'react';
import { useAccount } from 'wagmi';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Clock,
  ArrowUpCircle,
  ArrowDownCircle,
  Info,
  Coins,
  Zap
} from 'lucide-react';
import { mockStakingPools } from '../utils/mock-data';
import { StakingPool } from '../types';

const Farming = () => {
  const { isConnected } = useAccount();
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  const handleStake = async () => {
    if (!stakeAmount || !selectedPool) return;
    
    setIsStaking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsStaking(false);
    setStakeAmount('');
    setSelectedPool(null);
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || !selectedPool) return;
    
    setIsUnstaking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUnstaking(false);
    setUnstakeAmount('');
    setSelectedPool(null);
  };

  const handleClaimRewards = async (poolId: string) => {
    // Simulate claiming rewards
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  if (!isConnected) {
    return (
      <div className="text-center space-y-6 py-20">
        <Card className="max-w-md mx-auto">
          <div className="space-y-4">
            <TrendingUp className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Connect your wallet to start earning yield on your crypto assets.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          <span className="gradient-text">Yield Farming</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Earn passive income on your crypto while your Cardfi balance grows. 
          Stake your assets in our high-yield pools and watch your portfolio flourish.
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm text-muted-foreground">Total Staked</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${mockStakingPools.reduce((sum, pool) => sum + pool.userStaked, 0).toLocaleString()}
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-muted-foreground">Total Rewards</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${mockStakingPools.reduce((sum, pool) => sum + pool.rewards, 0).toFixed(2)}
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-muted-foreground">Avg APY</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {(mockStakingPools.reduce((sum, pool) => sum + pool.apy, 0) / mockStakingPools.length).toFixed(1)}%
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-muted-foreground">Next Reward</span>
            </div>
            <p className="text-2xl font-bold text-white">2h 45m</p>
          </div>
        </Card>
      </div>

      {/* Staking Pools */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Available Pools</h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {mockStakingPools.map((pool) => (
            <Card key={pool.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-defi-pink to-defi-purple flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{pool.name}</h3>
                    <p className="text-sm text-muted-foreground">{pool.token}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">{pool.apy}%</p>
                  <p className="text-xs text-muted-foreground">APY</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Staked</span>
                  <span className="text-white">${formatNumber(pool.totalStaked)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Stake</span>
                  <span className="text-white">
                    {pool.userStaked > 0 ? `${pool.userStaked.toLocaleString()} ${pool.token}` : 'None'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rewards</span>
                  <span className="text-green-400">
                    {pool.rewards > 0 ? `${pool.rewards.toFixed(2)} ${pool.token}` : '0.00'}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  style={{color:"white"}}
                  className="flex-1"
                  onClick={() => {
                    setSelectedPool(pool);
                    setActiveTab('stake');
                  }}
                >
                  Stake
                </Button>
                
                {pool.userStaked > 0 && (
                  <Button 
                    variant="outline" 
                    style={{color:"white"}}
                    className="flex-1"
                    onClick={() => {
                      setSelectedPool(pool);
                      setActiveTab('unstake');
                    }}
                  >
                    Unstake
                  </Button>
                )}
                
                {pool.rewards > 0 && (
                  <Button 
                    gradient 
                    className="flex-1"
                    onClick={() => handleClaimRewards(pool.id)}
                  >
                    Claim
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Staking Modal */}
      {selectedPool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {activeTab === 'stake' ? 'Stake' : 'Unstake'} {selectedPool.token}
                </h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPool(null)}
                  className="text-muted-foreground hover:text-white"
                >
                  ✕
                </Button>
              </div>
              
              {/* Pool Info */}
              <div className="bg-defi-overlay rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pool APY</span>
                  <span className="text-green-400 font-semibold">{selectedPool.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span className="text-white">
                    {activeTab === 'stake' ? '10,000' : selectedPool.userStaked.toLocaleString()} {selectedPool.token}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Staked</span>
                  <span className="text-white">${formatNumber(selectedPool.totalStaked)}</span>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex rounded-lg bg-defi-overlay p-1">
                <button
                  onClick={() => setActiveTab('stake')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'stake'
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <ArrowDownCircle className="w-4 h-4 inline mr-2" />
                  Stake
                </button>
                <button
                  onClick={() => setActiveTab('unstake')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'unstake'
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <ArrowUpCircle className="w-4 h-4 inline mr-2" />
                  Unstake
                </button>
              </div>
              
              {activeTab === 'stake' ? (
                <div className="space-y-4">
                  <Input
                    label={`Stake Amount (${selectedPool.token})`}
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-blue-400 mb-2">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">Earning Projection</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Daily: ~${(Number(stakeAmount) * selectedPool.apy / 365 / 100).toFixed(2)}</p>
                      <p>Monthly: ~${(Number(stakeAmount) * selectedPool.apy / 12 / 100).toFixed(2)}</p>
                      <p>Yearly: ~${(Number(stakeAmount) * selectedPool.apy / 100).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* <Button 
                    gradient 
                    className="w-full" 
                    onClick={handleStake}
                    disabled={!stakeAmount || isStaking}
                  >
                    {isStaking ? 'Staking...' : `Stake ${selectedPool.token}`}
                  </Button> */}
                  <Button 
                    gradient 
                    className="w-full" 
                    onClick={handleStake}
                    disabled={true}
                  >
                    Coming Soon...
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    label={`Unstake Amount (${selectedPool.token})`}
                    type="number"
                    placeholder="0.00"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                  />
                  
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-orange-400 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Unstaking Period</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your funds will be available after a 7-day unbonding period.
                    </p>
                  </div>
                  
                  {/* <Button 
                    gradient 
                    className="w-full" 
                    onClick={handleUnstake}
                    disabled={!unstakeAmount || isUnstaking}
                  >
                    {isUnstaking ? 'Unstaking...' : `Unstake ${selectedPool.token}`}
                  </Button> */}

                  <Button 
                    gradient 
                    className="w-full" 
                    onClick={handleStake}
                    disabled={true}
                  >
                    Coming Soon...
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Farming;