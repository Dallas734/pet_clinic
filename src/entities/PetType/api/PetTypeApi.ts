import { baseQuery } from "@/app/RTKQuery/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { PetType } from "../types/PetType";




export const PetTypesApi = createApi({
    reducerPath: 'PetTypes',
    baseQuery: baseQuery,
    tagTypes: ['PetType'],
    endpoints: (builder) => ({
        fetchAllPetTypes: builder.query<PetType[], void>({
            query: () => ({
                url: 'petclinic_PetType/'
            }),
            providesTags: ['PetType']
        })
    })
})

export const { useFetchAllPetTypesQuery } = PetTypesApi;