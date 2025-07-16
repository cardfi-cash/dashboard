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
export const defaultCards: Card[] = [
  {
    id: '1',
    name: 'Apply Now',
    balance: 0,
    currency: 'USDC',
    cardNumber: '**** **** **** 0000',
    isActive: true,
    type: 'prepaid',
    createdAt: new Date('0000-00-00'),
  },
];

export const mockStakingPools: StakingPool[] = [
  {
    id: '1',
    name: 'USDC Vault',
    token: 'USDC',
    apy: 8.5,
    totalStaked: 2500,
    userStaked: 500,
    rewards: 125.75,
    isActive: true,
  },
  {
    id: '2',
    name: 'USDT Vault',
    token: 'USDT',
    apy: 12.3,
    totalStaked: 180,
    userStaked: 2.5,
    rewards: 0.087,
    isActive: true,
  },
  {
    id: '3',
    name: 'LPUSDT',
    token: 'LPUSDT',
    apy: 24.7,
    totalStaked: 80,
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


export const defaultTransactions: Transaction[] = [
  {
    id: '1',
    type: 'signin',
    amount: 0,
    currency: 'USDC',
    status: 'completed',
    timestamp: new Date(Date.now()),
    description: 'Sign-In Success',
    hash: '0x1234...5678',
  },
];