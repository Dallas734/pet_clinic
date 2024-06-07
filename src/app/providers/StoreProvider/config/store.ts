import { configureStore } from '@reduxjs/toolkit';
import historyMapReducer from './slice/historyMapSlice';


export const store = configureStore({
  reducer: {
    historyMap: historyMapReducer,
  }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.dispatch>;