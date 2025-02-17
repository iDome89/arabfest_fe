import {
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
} from "./endpoints";

export const useGetAll = () => {
  const { data: visual, isLoading: isLoadingVisual } = useFetchVisualsQuery();
  const { data: aboutData, isLoading: isLoadingAbout } = useFetchAboutQuery();
  const { data: footerData } = useFetchFooterDataQuery();
  const { data: gallery } = useFetchGalleryQuery();
  const { data: banner, isLoading: isLoadingBanner } = useFetchBannerQuery();
  const { data: locations } = useFetchLocationsQuery();
  const { data: mediaArticles } = useFetchMediaArticlesQuery();
  const { data: pressReleases } = useFetchPressReleasesQuery();
  const { data: events, isLoading: isLoadingEvents } = useFetchEventsQuery();
  const { data: speakers } = useFetchSpeakersQuery();
  const { data: sponsors } = useFetchSponsorsQuery();
  const { data: team } = useFetchTeamQuery();
  const { data: news } = useFetchNewsQuery();
  return {
    isLoading:
      isLoadingAbout || isLoadingBanner || isLoadingEvents || isLoadingVisual,
    about: aboutData?.data,
    contact: footerData?.data,
    gallery: gallery?.data,
    banner: banner?.data,
    locations: locations?.data,
    mediaArticles: mediaArticles?.data,
    pressReleases: pressReleases?.data,
    events: events?.data,
    speakers: speakers?.data,
    sponsors: sponsors?.data,
    team: team?.data,
    news: news?.data,
    color: visual?.data.attributes.color,
  };
};
