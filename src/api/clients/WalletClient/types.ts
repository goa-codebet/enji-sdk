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

export type PerCurrencyBalanceSheet = Record<Currency, WalletBalance>;

export type GetBalanceParams = {
  product?: Product;
};

export type GetAllBalancesParams = {
  product?: Product;
};
