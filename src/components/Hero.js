import { useGetAll } from "@/features/useGetAll";
import { useState } from "react";

export const Hero = () => {

  const [isMobile, setIsMobile] = useState(false);

  const { banner } = useGetAll();

  const desktopImage = banner?.attributes?.background_image?.data?.attributes?.url || "";
  const mobileImage = banner?.attributes?.mobile_image?.data?.attributes?.url || desktopImage; // Use mobile image if available

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={isMobile ? mobileImage : desktopImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Hero;
