import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function PageNav() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div>
        <img src="logo.png" className="h-8 tablet:h-10" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul
        className={`hidden tablet:flex gap-6 laptop:gap-10 items-center transition-all duration-300`}
      >
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <NavLink
            to="/"
            className="before:block before:content-[''] before:absolute before:bottom-[-2px] 
              before:w-full before:h-[2px] before:bg-btn-bg-main before:scale-x-0 
              group-hover:before:scale-x-100 before:transition-transform duration-300"
          >
            Home
          </NavLink>
        </li>
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <NavLink to="/locations">OSSC Locations</NavLink>
        </li>
        <li className="group relative font-bold text-gray-500 hover:text-[#000080] capitalize">
          <NavLink to="/lists">OSSC Lists</NavLink>
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

      {/* Mobile Menu Toggle */}
      <div className="flex tablet:hidden">
        {isMenuOpen ? (
          <IoCloseOutline
            size={30}
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer"
          />
        ) : (
          <MdMenu
            size={30}
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 px-6 tablet:hidden">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-500 hover:text-[#000080] font-semibold"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-500 hover:text-[#000080] font-semibold"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/locations"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-500 hover:text-[#000080] font-semibold"
              >
                OSSC Locations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/lists"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-500 hover:text-[#000080] font-semibold"
              >
                OSSC Lists
              </NavLink>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <NavLink
              to="/auth"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center border-2 border-[#000080] text-[#000080] rounded-lg py-1"
            >
              Login
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#000080] text-white rounded-lg py-1"
            >
              Download App
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageNav;
