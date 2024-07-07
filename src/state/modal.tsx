import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalStates {
  bAddModal: boolean;
}

const initialState: modalStates = {
  bAddModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleAddModal: (state, action: PayloadAction<boolean>) => {
      state.bAddModal = action.payload;
    },
  },
  extraReducers: (builder) => { },
})

export const {
  toggleAddModal,
} = modalSlice.actions;
export default modalSlice.reducer;
