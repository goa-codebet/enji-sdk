import { Currency, Product } from "@/api/types";

export type WalletBalance = {
  Balance: number;
  ReservedBalance: number;
};

export type BalanceSheet = {
  Total: WalletBalance;
  Real: WalletBalance;
  Bonus: WalletBalance;
};

export type PerCurrencyBalanceSheet = {
  Balances: Record<Currency, BalanceSheet>;
};

export type GetBalanceParams = {
  product?: Product;
};

export type GetAllBalancesParams = {
  product?: Product;
};
