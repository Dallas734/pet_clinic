import { baseQuery } from "@/app/RTKQuery/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import VisitType from "../Visit";




export const VisitApi = createApi({
    reducerPath: 'Visit',
    baseQuery: baseQuery,
    tagTypes: ['Visit'],
    endpoints: (builder) => ({
        fetchAllVisit: builder.query<VisitType[], void>({
            query: () => ({
                url: 'petclinic_Visit'
            }),
            providesTags: ['Visit']
        })
    })
})

export const { useFetchAllVisitQuery } = VisitApi;