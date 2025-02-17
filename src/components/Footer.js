import { useGetAll } from "@/features/useGetAll";

export const Footer = () => {
const {contact} = useGetAll();

  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-black">ARABFEST</h2>
        </div>

        <div className="flex space-x-6"></div>
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-500">
        <h3 className="text-lg">{contact.attributes.full_name}</h3>
        <a href="mailto:kontakt@arabfest.cz">
          <h3 className="text-lg">{contact.attributes.email}</h3>
        </a>
        <p className="text-sm">© 2024 Arabfest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
