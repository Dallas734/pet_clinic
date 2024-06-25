import { authSchema } from "@/features/AuthByUsername";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/rest/entities/',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAuth = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/oauth/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.set('Authorization', 'Basic Y2xpZW50OnNlY3JldA==')
      return headers;
    },
  });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const tokenRefresh = localStorage.getItem('refreshToken') || sessionStorage.getItem('accessToken');
        const refreshResult = await baseAuth(
          {
            url: "", //  на какой url отправлять обновление токенов?
            method: "POST",
            body: { refresh_token: tokenRefresh, access_token:  token },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const tokenData = refreshResult.data as authSchema;
          if(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
            localStorage.setItem("accessToken", tokenData.access_token);
            localStorage.setItem("refreshToken", tokenData.refresh_token);
          }
          else {
            sessionStorage.setItem("accessToken", tokenData.access_token);
            sessionStorage.setItem("refreshToken", tokenData.refresh_token);
          }
          result = await baseQuery(args, api, extraOptions);
        } else {
         // api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};


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