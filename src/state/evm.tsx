import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface evmStates {
  address: string[];
  selectedEvm: string;
};


const initialState: evmStates = {
  address: [],
  selectedEvm: "",
};

export const evmSlice = createSlice({
  name: 'evm',
  initialState,
  reducers: {
    toggleAddAddress: (state, action: PayloadAction<string>) => {
      state.address.push(action.payload);
    },
    toggleSelectEvm: (state, action: PayloadAction<string>) => {
      state.selectedEvm = action.payload;
    },
  },
  extraReducers: (builder) => { },
})

export const {
  toggleAddAddress,
  toggleSelectEvm,
} = evmSlice.actions;
export default evmSlice.reducer;
