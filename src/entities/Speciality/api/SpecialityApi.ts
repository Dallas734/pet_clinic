import { baseQuery } from "@/app/RTKQuery/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Speciality } from "../types/Speciality";

export const SpecialityApi = createApi({
    reducerPath: 'Specialities',
    baseQuery: baseQuery,
    tagTypes: ['Speciality'],
    endpoints: (builder) => ({
      fetchAllSpecialities: builder.query<Speciality[], void>({
        query: () => ({
          url: 'petclinic_Specialty'
        }),
        providesTags: ['Speciality']
      })
    })
  })


  

  export const { useFetchAllSpecialitiesQuery } = SpecialityApi;