import { baseQuery } from "@/app/RTKQuery/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Pet } from "../types/Pet";

export const PetsApi = createApi({
    reducerPath: 'Pets',
    baseQuery:  baseQuery,
    tagTypes: ['Pet'],
    endpoints: (builder) => ({
      fetchAllPets: builder.query<Pet[], void>({
        query: () => ({
          url: 'petclinic_Pet'
        }),
        providesTags: ['Pet']
      }),
      deletePet: builder.mutation<void, string | undefined>({
        query: (id) => ({
          url: `petclinic_Pet/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Pet']
      }),
      createPet: builder.mutation<Pet, Pet>({
        query: (pet) => ({
          url: 'petclinic_Pet',
          method: 'POST',
          body: pet
        })
      })
    })
})

export const { useFetchAllPetsQuery} = PetsApi;
export const { useDeletePetMutation } = PetsApi;
export const { useCreatePetMutation } = PetsApi;