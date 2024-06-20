import { combineReducers, configureStore } from '@reduxjs/toolkit';
import navReducer from '@/widgets/Page/model/slices/navSlice'
import { OwnersApi, PetTypesApi, PetsApi } from '../../../RTKQuery/query';
import { VisitApi } from '@/entities/Visit/api/VisitApi';

const rootReducer = combineReducers ({
  nav: navReducer,
  [PetTypesApi.reducerPath]: PetTypesApi.reducer,
  [PetsApi.reducerPath]: PetsApi.reducer,
  [VisitApi.reducerPath]: VisitApi.reducer,
  [OwnersApi.reducerPath]: OwnersApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(PetTypesApi.middleware)
  .concat(PetsApi.middleware)
  .concat(VisitApi.middleware)
  .concat(OwnersApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;