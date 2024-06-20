import PetType from "@/entities/PetType";
import Pet from "@/entities/Pet";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Owner from "@/entities/Owner";
// import { IBannerType } from "../../types";
// import {baseQueryWithReauth} from "../baseQueryWithReauth"


export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/rest/entities/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  });

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
      deletePet: builder.mutation<void, string>({
        query: (id) => ({
          url: `petclinic_Pet/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Pet']
      })
    })
  })

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

  export const { useFetchAllPetTypesQuery } = PetTypesApi;
  export const { useFetchAllPetsQuery} = PetsApi;
  export const { useDeletePetMutation } = PetsApi;
  export const { useFetchAllOwnersQuery } = OwnersApi;

// export const AdminPanel = createApi({
//     reducerPath: 'AdminPanel',
//     baseQuery: baseQuery,
//     tagTypes: ['bannerType'],
//     endpoints: (builder) => ({
//         fetchAllBannerTypes: builder.query<IBannerType[], void>({
//             query: () => ({
//                 url: `BannerType/`
//             }),
//             providesTags: ['bannerType']
//         }),
//         createBannerType: builder.mutation<IBannerType, IBannerType>({
//             query: (bannerType) => ({
//                 url: `BannerType`,
//                 method: 'POST',
//                 body: bannerType
//             }),
//             invalidatesTags: ['bannerType']
//         }),
//         updateBannerType: builder.mutation<IBannerType, IBannerType>({
//             query: (bannerType) => ({
//                 url: `BannerType/${bannerType.id}`,
//                 method: 'PUT',
//                 body: bannerType
//             }),
//             invalidatesTags: ['bannerType']
//         }),
//         deleteBannerType: builder.mutation<void, number>({
//             query: (id) => ({
//                 url: `BannerType/${id}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['bannerType']
//         }),
//     })
// })