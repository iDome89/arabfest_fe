import { useSelector } from "react-redux";
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
  useFetchOrganizationQuery
} from "./endpoints";

export const useGetAll = () => {
   const currentLanguage = useSelector(state => state.language.current);
  const { data: visual, isLoading: isLoadingVisual } = useFetchVisualsQuery();
  const { data: aboutData, isLoading: isLoadingAbout } = useFetchAboutQuery({ language: currentLanguage });
  const { data: footerData } = useFetchFooterDataQuery();
  const { data: gallery } = useFetchGalleryQuery();
  const { data: banner, isLoading: isLoadingBanner } = useFetchBannerQuery();
  const { data: locations } = useFetchLocationsQuery();
  const { data: mediaArticles } = useFetchMediaArticlesQuery({ language: currentLanguage });
  const { data: pressReleases } = useFetchPressReleasesQuery({ language: currentLanguage });
  const { data: events, isLoading: isLoadingEvents } = useFetchEventsQuery({ language: currentLanguage });
  const { data: speakers } = useFetchSpeakersQuery({ language: currentLanguage });
  const { data: sponsors } = useFetchSponsorsQuery();
  const { data: team } = useFetchTeamQuery({ language: currentLanguage });
  const { data: news } = useFetchNewsQuery({ language: currentLanguage });
  const {data:organization} = useFetchOrganizationQuery({ language: currentLanguage });
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
    organization: organization?.data,
  };
};
