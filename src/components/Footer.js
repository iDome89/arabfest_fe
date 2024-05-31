import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa6";

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
  console.log(contact);
  if (!contact) {
    return <div>Loading...</div>;
  }
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <h2>Contact Us</h2>
        <p>{contact.attributes.full_name}</p>
        <p>{contact.attributes.email}</p>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href={contact.attributes.instagram} target="_blank">
            <FaInstagram />
          </a>
          <a href={contact.attributes.facebook} target="_blank">
            <FaFacebook />
          </a>
          <a href={contact.attributes.youtube} target="_blank">
            <FaYoutube />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Arabfest</p>
      </aside>
    </footer>
  );
};
