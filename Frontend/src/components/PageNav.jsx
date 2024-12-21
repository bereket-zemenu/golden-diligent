import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import MobileMenu from "./MobileMenu";
function PageNav() {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[9999999999] bg-white flex justify-between items-center 
        px-2 mdphone:px-4 ptab:px-6 tablet:px-10 laptop:px-12 
        py-4 transition-all duration-300 ${isSticky ? "shadow-md" : ""}`}
    >
      {/* Logo */}
      <NavLink to="/">
        <img src="logo.png" className="h-8 tablet:h-10" alt="Logo" />
      </NavLink>

      {/* Navigation Links */}
      <ul
        className={`hidden tablet:flex gap-6 laptop:gap-10 items-center transition-all duration-300`}
      >
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <NavLink
            to="/"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="before:block before:content-[''] before:absolute before:bottom-[-2px] 
              before:w-full before:h-[2px] before:bg-btn-bg-main before:scale-x-0 
              group-hover:before:scale-x-100 before:transition-transform duration-300 cursor-pointer"
          >
            Home
          </NavLink>
        </li>
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="cursor-pointer"
          >
            About
          </Link>
        </li>
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <Link
            to="location"
            spy={true}
            smooth={true}
            offset={-50}
            duration={1000}
            className="cursor-pointer"
          >
            OSSC Locations
          </Link>
        </li>
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <NavLink to="/list" className="cursor-pointer">
            OSSC Lists
          </NavLink>
        </li>
      </ul>

      {/* Login and Download */}
      <div className="hidden tablet:flex gap-4">
        <NavLink
          to="/auth"
          className="px-4 py-1 border-2 border-[#000080] text-[#000080] rounded-lg text-sm"
        >
          Login
        </NavLink>
        <button className="px-4 py-1 bg-[#000080] opacity-90 hover:opacity-100 text-white rounded-lg text-sm">
          Download App
        </button>
      </div>
      <MobileMenu />
    </div>
  );
}

export default PageNav;
