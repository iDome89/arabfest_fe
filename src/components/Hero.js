// components/Hero.js
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
      className="hero h-screen"
      style={{
        backgroundImage: `url(${banner?.attributes.background_image.data.attributes.url || ''})`,
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <p className="mb-5 text-white">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};


