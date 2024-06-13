import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
export const PressReleases = () => {
  const [pressReleases, setPressReleases] = useState([]);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await apiRequest.get(
          "/press-releases?sort=date&populate=*",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
            },
          }
        );
        setPressReleases(response.data.data);
      } catch (error) {
        console.error("Error fetching press-releases:", error);
      }
    };
    fetchPressReleases();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour12: false,
    };
    const locale = navigator.language;
    const formattedDate = date.toLocaleDateString(locale, options);
    return `${formattedDate.replace(/\//g, ".")}`;
  };

  const formatSize = (sizeInKB) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(2)} KB`;
    } else {
      const sizeInMB = sizeInKB / 1024;
      return `${sizeInMB.toFixed(2)} MB`;
    }
  };

  if (!pressReleases) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto min-h-[300px]">
      {pressReleases.length > 0 && (
        <div className="bg-white table-xs md:table-md lg:table-xl p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <table className="table">
            <thead>
              <tr>
                <th className="text-gray-700">Publikováno</th>
                <th className="text-gray-700">Tisková zpráva</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pressReleases.length > 0 &&
                pressReleases.map((pressRelease, index) => (
                  <tr key={index}>
                    <th className="text-gray-600 text-xs sm:text-md">
                      {formatDate(pressRelease.attributes.date)}
                    </th>
                    <td className="text-gray-600 text-xs sm:text-md">
                      {pressRelease.attributes.name}
                    </td>
                    <td className="text-gray-600 text-xs sm:text-md">
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={
                          pressRelease.attributes.pdf_document.data.attributes
                            .url
                        }
                      >{`Stahnout PDF(${formatSize(
                        pressRelease.attributes.pdf_document.data.attributes
                          .size
                      )})`}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
