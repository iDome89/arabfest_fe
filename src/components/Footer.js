import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";

export const Footer = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await apiRequest.get("/contact?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setContact(response.data.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContacts();
  }, []);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-black">ARABFEST</h2>
        </div>

        <div className="flex space-x-6">
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-500">
        <h3 className="text-lg">{contact.attributes.full_name}</h3>
        <h3 className="text-lg">{contact.attributes.email}</h3>
        <p className="text-sm">© 2024 Arabfest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
