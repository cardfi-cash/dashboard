import { Card, StakingPool, Transaction } from '../types';

export const mockCards: Card[] = [
  {
    id: '1',
    name: 'Primary Card',
    balance: 1234.56,
    currency: 'USDC',
    cardNumber: '**** **** **** 8429',
    isActive: true,
    type: 'prepaid',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Travel Card',
    balance: 567.89,
    currency: 'USDT',
    cardNumber: '**** **** **** 1337',
    isActive: true,
    type: 'prepaid',
    createdAt: new Date('2024-02-20'),
  },
];

export const mockStakingPools: StakingPool[] = [
  {
    id: '1',
    name: 'USDC Vault',
    token: 'USDC',
    apy: 8.5,
    totalStaked: 2500000,
    userStaked: 5000,
    rewards: 125.75,
    isActive: true,
  },
  {
    id: '2',
    name: 'ETH Staking',
    token: 'ETH',
    apy: 12.3,
    totalStaked: 1800,
    userStaked: 2.5,
    rewards: 0.087,
    isActive: true,
  },
  {
    id: '3',
    name: 'Cardfi LP',
    token: 'CFI-ETH',
    apy: 24.7,
    totalStaked: 850000,
    userStaked: 1200,
    rewards: 89.4,
    isActive: true,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'recharge',
    amount: 500,
    currency: 'USDC',
    status: 'completed',
    timestamp: new Date('2024-07-12'),
    description: 'Card recharge from wallet',
    hash: '0x1234...5678',
  },
  {
    id: '2',
    type: 'stake',
    amount: 1000,
    currency: 'USDC',
    status: 'completed',
    timestamp: new Date('2024-07-10'),
    description: 'Staked in USDC Vault',
    hash: '0xabcd...efgh',
  },
  {
    id: '3',
    type: 'spend',
    amount: 89.99,
    currency: 'USDC',
    status: 'completed',
    timestamp: new Date('2024-07-08'),
    description: 'Coffee Shop Purchase',
  },
  {
    id: '4',
    type: 'reward',
    amount: 25.5,
    currency: 'USDC',
    status: 'completed',
    timestamp: new Date('2024-07-05'),
    description: 'Staking rewards claimed',
    hash: '0x9876...5432',
  },
];