import { combineReducers, configureStore } from '@reduxjs/toolkit';
import navReducer from '@/widgets/Page/model/slices/navSlice'


const rootReducer = combineReducers ({
  nav: navReducer
})

export const store = configureStore({
  reducer: rootReducer
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;