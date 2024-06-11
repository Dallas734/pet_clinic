import PetType from "@/entities/PetType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

  export const { useFetchAllPetTypesQuery } = PetTypesApi;

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