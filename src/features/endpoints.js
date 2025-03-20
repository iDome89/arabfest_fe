import { apiSlice } from "./api";

const generalApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchAbout: build.query({
      query: (params = {}) => {
        const { language = "en" } = params;
        return {
          url: `/about?populate[components][populate]=*&locale=${language}`,
        };
      },
      providesTags: ["About"],
    }),
    fetchFooterData: build.query({
      query: () => {
        return {
          url: `/contact?populate=*`,
        };
      },
      providesTags: ["Contacts"],
    }),
    fetchGallery: build.query({
      query: () => {
        return {
          url: `/images?sort=id&populate[image][populate]=*&populate[category][populate][thumbnail][populate]=*`,
        };
      },
      providesTags: ["Gallery"],
    }),
    fetchBanner: build.query({
      query: () => {
        return {
          url: `/banner?populate=*`,
        };
      },
      providesTags: ["Banner"],
    }),
    fetchLocations: build.query({
      query: () => {
        return {
          url: `/locations?sort=id&populate=*`,
        };
      },
      providesTags: ["Locations"],
    }),
    fetchOrganization: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/organization?populate=*&locale=${language}`,
        };
      },
      providesTags: ["Organization"],
    }),
    fetchMediaArticles: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/media-articles?sort=id&populate=*&locale=${language}`,
        };
      },
      providesTags: ["MediaArticles"],
    }),
    fetchPressReleases: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/press-releases?sort=date&populate=*&locale=${language}`,
        };
      },
      providesTags: ["PressReleases"],
    }),
    fetchEvents: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/events?populate=*&locale=${language}`,
        };
      },
    }),
    fetchSpeakers: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/speakers?sort=id&populate[picture][populate]=*&locale=${language}`,
        };
      },
      providesTags: ["Speakers"],
    }),
    fetchSponsors: build.query({
      query: () => {
        return {
          url: `/partners?populate=*&pagination[pageSize]=30&sort=id:asc`,
        };
      },
      providesTags: ["Sponsors"],
    }),
    fetchTeam: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/teams?sort=order&populate=team_member.picture&locale=${language}`,
        };
      },
      providesTags: ["Team"],
    }),
    fetchNews: build.query({
      query: (params = {}) => {
        const { language } = params;
        return {
          url: `/news?populate=*&locale=${language}`,
        };
      },
      providesTags: ["News"],
    }),
    fetchVisuals: build.query({
      query: () => {
        return {
          url: `/vizual?populate=*`,
        };
      },
      providesTags: ["Vizual"],
    }),
    createContactForm: build.mutation({
      query: (formData) => ({
        url: "/contact-form",
        method: "POST",
        body: {
          data: formData,
        },
      }),
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
  useCreateContactFormMutation,
} = generalApi;
