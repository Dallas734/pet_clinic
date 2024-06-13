import { combineReducers, configureStore } from '@reduxjs/toolkit';
import navReducer from '@/widgets/Page/model/slices/navSlice'
import { PetTypesApi, PetsApi } from '../../../RTKQuery/query';

const rootReducer = combineReducers ({
  nav: navReducer,
  [PetTypesApi.reducerPath]: PetTypesApi.reducer,
  [PetsApi.reducerPath]: PetsApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(PetTypesApi.middleware)
  .concat(PetsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;