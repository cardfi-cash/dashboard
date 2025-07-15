export interface Card {
  id: string;
  name: string;
  balance: number;
  currency: string;
  cardNumber: string;
  isActive: boolean;
  type: 'prepaid' | 'credit';
  createdAt: Date;
}

export interface StakingPool {
  id: string;
  name: string;
  token: string;
  apy: number;
  totalStaked: number;
  userStaked: number;
  rewards: number;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  type: 'recharge' | 'spend' | 'stake' | 'unstake' | 'reward';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description: string;
  hash?: string;
}

export interface User {
  address: string;
  balance: number;
  totalStaked: number;
  totalRewards: number;
  cards: Card[];
  transactions: Transaction[];
}