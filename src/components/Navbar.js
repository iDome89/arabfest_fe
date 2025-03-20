import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/features/languageReducer";
import { useGetAll } from "@/features/useGetAll";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {color} = useGetAll();
  const selectedLanguage = useSelector((state) => state.language.current);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    if (lng === selectedLanguage) return;
    dispatch(setLanguage(lng));
      window.location.reload();
    };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const headerElement = document.querySelector(".navbar");
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { key: "news", sectionId: "novinky" },
    { key: "about", sectionId: "o festivalu" },
    { key: "team", sectionId: "tým" },
    { key: "program", sectionId: "program" },
    { key: "partners", sectionId: "partneři" },
    { key: "contact", sectionId: "kontakt" },
  ];

  return (
    <div
      className={`navbar p-4 sm:p-6 fixed z-10 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent header-shadow"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full z-50">
          <a
            className={`cursor-pointer ml-3 text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            ARABFEST
          </a>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`cursor-pointer focus:outline-none transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
          </div>
        </div>
        <div className="hidden md:flex space-x-4 sm:space-x-6 w-full justify-end items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.sectionId}
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`cursor-pointer transition-colors duration-300 text-xs md:text-sm md:text-md ${
                isScrolled ? "text-black" : "text-white font-bold"
              }`}
            >
              {t(`navigation.${item.key}`).toUpperCase()}
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            <ReactCountryFlag
             style={{
              borderColor:
                selectedLanguage === "cs" ? color : "transparent",
                borderBottomWidth: 2
            }}
              countryCode="CZ"
              onClick={() => changeLanguage("cs")}
              className="cursor-pointer"
            />
            <ReactCountryFlag
              style={{
                borderColor:
                  selectedLanguage === "en" ? color : "transparent",
                  borderBottomWidth: 2
              }}
              countryCode="GB"
              onClick={() => changeLanguage("en")}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-20">
          <div className="flex flex-col w-full space-y-4 items-center justify-center h-full">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.sectionId}
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className={`cursor-pointer text-base sm:text-lg
                 "text-white font-bold"
                `}
              >
                {t(`navigation.${item.key}`).toUpperCase()}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <ReactCountryFlag
                style={{
                  borderColor:
                    selectedLanguage === "cs" ? color : "transparent",
                    borderBottomWidth: 2
                }}
                countryCode="CZ"
                onClick={() => changeLanguage("cs")}
                className="cursor-pointer"
              />
              <ReactCountryFlag
              style={{
                borderColor:
                  selectedLanguage === "en" ? color : "transparent",
                  borderBottomWidth: 2
              }}
                countryCode="GB"
                onClick={() => changeLanguage("en")}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
