import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginSchema, authSchema } from "@/features/AuthByUsername";
import { baseAuth } from "@/app/RTKQuery/query";






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

export const { useAuthMutation } = UserApi;