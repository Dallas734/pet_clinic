import { baseQuery } from "@/app/RTKQuery/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Owner } from "../types/Owner";

export const OwnersApi = createApi({
    reducerPath: 'Owners',
    baseQuery: baseQuery,
    tagTypes: ['Owner'],
    endpoints: (builder) => ({
      fetchAllOwners: builder.query<Owner[], void>({
        query: () => ({
          url: 'petclinic_Owner'
        }),
        providesTags: ['Owner']
      })
    })
  })


  

  export const { useFetchAllOwnersQuery } = OwnersApi;