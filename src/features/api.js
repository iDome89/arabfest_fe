import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: async (headers) => {
      headers.set(
        "authorization",
        `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`
      );
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: [
    "About",
    "Contacts",
    "Gallery",
    "Banner",
    "Events",
    "Speakers",
    "Locations",
    "MediaArticles",
    "PressReleases",
    "Sponsors",
    "Organization",
    "Team",
    "News",
    "Vizual"
  ],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
