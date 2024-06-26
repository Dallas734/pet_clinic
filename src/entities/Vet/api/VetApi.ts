import { baseQuery } from "@/app/RTKQuery/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Vet } from "../types/Vet";

export const VetApi = createApi({
    reducerPath: 'Veterinarians',
    baseQuery: baseQuery,
    tagTypes: ['Veterinarian'],
    endpoints: (builder) => ({
      fetchAllVets: builder.query<Vet[], void>({
        query: () => ({
          url: 'petclinic_Veterinarian'
        }),
        providesTags: ['Veterinarian']
      })
    })
  })


  

  export const { useFetchAllVetsQuery } = VetApi;