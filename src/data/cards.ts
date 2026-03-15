import cardsData from "./cards.json";

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  purchaseRate: number;
  cashAdvanceRate: number;
  interestFreeDays: number;
  rewardsType: "points" | "cashback" | "none";
  rewardsRate: string;
  signupBonus: string;
  balanceTransferRate: number;
  balanceTransferPeriod: number;
  foreignTransactionFee: number;
  minIncome: number;
  cardNetwork: "Visa" | "Mastercard" | "Amex";
  features: string[];
  category: "low-fee" | "rewards" | "low-rate" | "cashback" | "premium" | "balance-transfer";
  bestFor: string[];
  url: string;
}

export const creditCards: CreditCard[] = cardsData.cards as CreditCard[];
