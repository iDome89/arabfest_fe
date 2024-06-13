import React, { useEffect, useState } from 'react';
import apiRequest from '../utils/apiRequest';

export const Hero = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await apiRequest.get('/banner?populate=background_image', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setBanner(response.data.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="hero h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${banner?.attributes.background_image.data.attributes.url || ''})`,
      }}
    >
      <div className="text-white text-center p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-4">Vítejte na Arabfestu!</h1>
        <p className="text-lg sm:text-xl max-w-lg mx-auto">Přijďte s námi oslavit kulturu, umění a komunitu.</p>
      </div>
    </div>
  );
};



