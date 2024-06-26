import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginSchema, authSchema } from "@/features/AuthByUsername";
import { baseAuth, baseQuery } from "@/app/RTKQuery/query";
import { User } from "../types/User";






export const UserApi = createApi({
    reducerPath: 'Auth',
    baseQuery:  baseAuth,
    tagTypes: ['user'],
    endpoints: (builder) => ({
      auth: builder.mutation<authSchema, LoginSchema>({
        query: (user) => ({
          url: `token?grant_type=password&username=${user.username}&password=${user.password}`,
          method: 'POST',
        })
      })
    })
})

export const CRUDUserApi = createApi({
  reducerPath: 'Users',
    baseQuery:  baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
      fetchAllUsers: builder.query<User[], void>({
        query: () => ({
          url: 'petclinic_User'
        }),
        providesTags: ['User']
      }),
    })
})

export const { useAuthMutation } = UserApi;
export const { useFetchAllUsersQuery } = CRUDUserApi;