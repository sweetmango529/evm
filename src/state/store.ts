import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modal';
import evmSlice from './evm';
import chainsSlice from './chain';
import tokensSlice from './token';

export const store = configureStore({
  reducer: {
    modalState: modalSlice,
    evmState: evmSlice,
    chainState: chainsSlice,
    tokenState: tokensSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
