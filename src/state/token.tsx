import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.molaris.io/getWalletTokenBalancesPrice';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjUxZDA0MzIxLWNkNTQtNGNjZi1hNThhLTZmZDZiYmJjMzM0ZiIsIm9yZ0lkIjoiMzk0NDM5IiwidXNlcklkIjoiNDA1MzEyIiwidHlwZUlkIjoiZWZiZDUyYTYtZjE4OC00ODAzLTg2NWYtOTU0YWNmOGI1MmUyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTcxNTg0NDgsImV4cCI6NDg3MjkxODQ0OH0.xVGBeIM0xqArv9pI_3G_B0-dkhlZztRK8wVGx_jTKb8';

interface TokenData {
  token_address: string;
  symbol: any;
  name: string;
  balance_formatted: number;
  usd_price: number;
  usd_value: number;
  portfolio_percentage: number;
}

export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokenBalances',
  async ({ selectedEVm, denom }: { selectedEVm: any; denom: string }) => {
    const response = await axios.get(
      `https://deep-index.moralis.io/api/v2.2/wallets/${selectedEVm}/tokens?chain=${denom}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    return response.data.result;
  }
);

interface TokenState {
  tokens: TokenData[];
  status: 'idle' | 'loading' | 'failed';
  totalUsd: number;
}

const initialState: TokenState = {
  tokens: [],
  status: 'idle',
  totalUsd: 0,
};

function merge(a: any, b: any, prop: any) {
  var reduced = a.filter(function (aitem: [any]) {
    return !b.find(function (bitem: [any]) {
      return aitem[prop] === bitem[prop];
    });
  });
  return reduced.concat(b);
}

const mergeArrays = (arr1: TokenData[], arr2: TokenData[]): TokenData[] => {
  const map = new Map<number, TokenData>();

  arr1.forEach(item => {
    if (map.has(item.symbol)) {
      map.get(item.symbol)!.balance_formatted += Number(item.balance_formatted);
      map.get(item.symbol)!.usd_value += item.usd_value;
      map.get(item.symbol)!.usd_price += item.usd_price;
      map.get(item.symbol)!.portfolio_percentage = item.portfolio_percentage;
    } else {
      map.set(item.symbol, { ...item });
    }
  });

  arr2.forEach(item => {
    if (map.has(item.symbol)) {
      map.get(item.symbol)!.balance_formatted += Number(item.balance_formatted);
      map.get(item.symbol)!.usd_value += item.usd_value;
      map.get(item.symbol)!.usd_price += item.usd_price;
      map.get(item.symbol)!.portfolio_percentage = item.portfolio_percentage;
    } else {
      map.set(item.symbol, { ...item });
    }
  });

  return Array.from(map.values());
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.tokens = [];
        state.status = 'loading';
      })
      .addCase(fetchTokens.fulfilled, (state, action: PayloadAction<TokenData[]>) => {
        state.status = 'idle';
        const mergedArrays = mergeArrays(state.tokens, action.payload);
        const returnArr = mergedArrays.filter(arr => arr.usd_value !== 0 && arr.usd_value !== null).sort((a, b) => (a.usd_value > b.usd_value ? -1 : 1));
        let tempTotalUsd: number = 0;
        returnArr.map((item, index) => {
          tempTotalUsd += item.usd_value;
        })
        state.tokens = returnArr;
        state.totalUsd = tempTotalUsd;
      })
      .addCase(fetchTokens.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default tokensSlice.reducer;