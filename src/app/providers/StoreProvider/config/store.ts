import { combineReducers, configureStore } from '@reduxjs/toolkit';
import navReducer from '@/widgets/Page/model/slices/navSlice'
import { VisitApi } from '@/entities/Visit/api/VisitApi';
import { PetTypesApi } from '@/entities/PetType';
import { PetsApi } from '@/entities/Pet';
import { OwnersApi } from '@/entities/Owners';
import { CRUDUserApi, UserApi } from '@/entities/User/api/userApi';
import { VetApi } from '@/entities/Vet/api/VetApi';
import { SpecialityApi } from '@/entities/Speciality/api/SpecialityApi';

const rootReducer = combineReducers ({
  nav: navReducer,
  [PetTypesApi.reducerPath]: PetTypesApi.reducer,
  [PetsApi.reducerPath]: PetsApi.reducer,
  [VisitApi.reducerPath]: VisitApi.reducer,
  [OwnersApi.reducerPath]: OwnersApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [VetApi.reducerPath]: VetApi.reducer,
  [SpecialityApi.reducerPath]: SpecialityApi.reducer,
  [CRUDUserApi.reducerPath]: CRUDUserApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(PetTypesApi.middleware)
  .concat(PetsApi.middleware)
  .concat(VisitApi.middleware)
  .concat(OwnersApi.middleware)
  .concat(UserApi.middleware)
  .concat(VetApi.middleware)
  .concat(SpecialityApi.middleware)
  .concat(CRUDUserApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;