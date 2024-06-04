import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
  }
})


export type AppDispatch = ReturnType<typeof configureStore>['dispatch'];
export type RootState = ReturnType<typeof store.getState>;