import { useGetAll } from "@/features/useGetAll";
import { useState, useEffect } from "react";

export const Hero = () => {


  const [isMobile, setIsMobile] = useState(false);

  const { banner } = useGetAll();

  const desktopImage = banner?.attributes?.background_image?.data?.attributes?.url || "";
  const mobileImage = banner?.attributes?.mobile_image?.data?.attributes?.url || desktopImage; // Use mobile image if available

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };
    
    checkIsMobile();
    
    window.addEventListener("resize", checkIsMobile);
    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={isMobile ? mobileImage : desktopImage}
        alt="Banner"
        style={{ objectFit: isMobile ? "fill" : "cover" }}
        className="w-full h-full"
      />
    </div>
  );
};

export default Hero;
