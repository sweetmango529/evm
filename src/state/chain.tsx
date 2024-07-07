import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChainData {
  balance: string;
  denom: string;
}

interface ChainsState {
  [chain: string]: ChainData;
}

const initialState: ChainsState = {};

const chainsSlice = createSlice({
  name: 'chains',
  initialState,
  reducers: {
    addChains(state, action: PayloadAction<{ chains: { [chain: string]: ChainData } }>) {
      const { chains } = action.payload;
      Object.keys(chains).forEach((chain) => {
        if (state[chain]) {
          state[chain].balance = (parseFloat(state[chain].balance) + parseFloat(chains[chain].balance)).toString();
        } else {
          state[chain] = chains[chain];
        }
      });
    },
  },
});

export const { addChains } = chainsSlice.actions;
export default chainsSlice.reducer;