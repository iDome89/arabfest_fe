import { apiSlice } from "./api";

const generalApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchAbout: build.query({
      query: () => ({
        url: `/about?populate[components][populate]=*`,
      }),
      providesTags: ["About"],
    }),
    fetchFooterData: build.query({
      query: () => ({
        url: `/contact?populate=*`,
      }),
      providesTags: ["Contacts"],
    }),
    fetchGallery: build.query({
      query: () => ({
        url: "/images?sort=id&populate[image][populate]=*&populate[category][populate][thumbnail][populate]=*",
      }),
      providesTags: ["Gallery"],
    }),
    fetchBanner: build.query({
      query: () => ({
        url: "/banner?populate=*",
      }),
      providesTags: ["Banner"],
    }),
    fetchLocations: build.query({
      query: () => ({
        url: "/locations?sort=id&populate=*",
      }),
      providesTags: ["Locations"],
    }),
    fetchOrganization: build.query({
      query: () => ({
        url: "/organization?populate=*",
      }),
      providesTags: ["Organization"],
    }),
    fetchMediaArticles: build.query({
      query: () => ({
        url: "/media-articles?sort=id&populate=*",
      }),
      providesTags: ["MediaArticles"],
    }),
    fetchPressReleases: build.query({
      query: () => ({
        url: "/press-releases?sort=date&populate=*",
      }),
      providesTags: ["PressReleases"],
    }),
    fetchEvents: build.query({
      query: () => ({
        url: "/events?populate=*",
      }),
    }),
    fetchSpeakers: build.query({
      query: () => ({
        url: "/speakers?sort=id&populate[picture][populate]=*"
      }),
      providesTags: ["Speakers"],
    }),
    fetchSponsors: build.query({
      query: () => ({
        url: "/partners?populate=*&pagination[pageSize]=30&sort=id:asc",
      }),
      providesTags: ["Sponsors"],
    }),
    fetchTeam: build.query({
      query: () => ({
        url: "/teams?sort=order&populate=team_member.picture",
      }),
      providesTags: ["Team"],
    }),
    fetchNews: build.query({
      query: () => ({
        url: "/news?populate=*",
      }),
      providesTags: ["News"],
    }),
    fetchVisuals: build.query({
      query: () => ({
        url: "/vizual?populate=*",
      }),
      providesTags: ["Vizual"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAboutQuery,
  useFetchFooterDataQuery,
  useFetchGalleryQuery,
  useFetchBannerQuery,
  useFetchLocationsQuery,
  useFetchMediaArticlesQuery,
  useFetchPressReleasesQuery,
  useFetchEventsQuery,
  useFetchSpeakersQuery,
  useFetchSponsorsQuery,
  useFetchTeamQuery,
  useFetchNewsQuery,
  useFetchVisualsQuery,
  useFetchOrganizationQuery,
} = generalApi;
