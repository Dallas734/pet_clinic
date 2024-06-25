import { combineReducers, configureStore } from '@reduxjs/toolkit';
import navReducer from '@/widgets/Page/model/slices/navSlice'
import { VisitApi } from '@/entities/Visit/api/VisitApi';
import { PetTypesApi } from '@/entities/PetType';
import { PetsApi } from '@/entities/Pet';
import { OwnersApi } from '@/entities/Owners';
import { UserApi } from '@/entities/User/api/userApi';

const rootReducer = combineReducers ({
  nav: navReducer,
  [PetTypesApi.reducerPath]: PetTypesApi.reducer,
  [PetsApi.reducerPath]: PetsApi.reducer,
  [VisitApi.reducerPath]: VisitApi.reducer,
  [OwnersApi.reducerPath]: OwnersApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(PetTypesApi.middleware)
  .concat(PetsApi.middleware)
  .concat(VisitApi.middleware)
  .concat(OwnersApi.middleware)
  .concat(UserApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;