/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Link from "./Link";
import { MdMenu } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useStores } from "../contexts/storeContext";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function PageNav() {
  const [isSticky, setIsSticky] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isMediumScreen = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const [isHidden, setIsHidden] = useState(false);

  const { isOpen, handleIsOpen, setShowPages, showPages } = useStores();
  const handleScroll = () => {
    setIsSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isLargeScreen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[9999999999] bg-white flex justify-between items-center px-12 phone:px-2 mdphone:px-4 ptab:px-6 mtab:px-8 tablet:px-10 laptop:px-12 pt-6 pb-2 content-center items-center overflow-hidden ${
          isSticky ? "shadow-bottom-only" : ""
        }`}
      >
        <div className="">
          <img src="logo.png" className="h-10 mb-4" />
        </div>
        <ul
          className={`flex gap-20 justify-center items-center visible ${
            isHidden ? "" : "hidden"
          }`}
        >
          <li className="font-colasta group py-2 relative font-bold text-[#000080] capitalize text-base text-base hover:cursor-pointer hover:text-btn-bg-main transition-all duration-200">
            <NavLink
              NavLink
              to="/"
              className="before:inline-block before:content-[''] before:absolute before:bottom-[15%] before:w-full before:h-[2px] before:bg-btn-bg-main before:scale-x-0 before:origin-center group-hover:before:scale-x-100 before:transition-all before:duration-[200ms]"
            >
              Home
            </NavLink>
          </li>

          <li className="font-colasta group py-2 relative font-bold text-gray-500 hover:text-[#000080] capitalize text-base text-base hover:cursor-pointer hover:text-btn-bg-main transition-hover duration-200">
            <NavLink
              to="/about"
              className="before:block before:content-[''] before:absolute before:bottom-[15%] before:w-full before:h-[2px] before:bg-btn-bg-main before:scale-x-0 before:origin-center group-hover:before:scale-x-100 before:transition-all before:duration-[200ms]"
            >
              about
            </NavLink>
          </li>
          <li className="font-colasta group py-2 relative font-bold text-gray-500 hover:text-[#000080] capitalize text-base text-base hover:cursor-pointer hover:text-btn-bg-main transition-hover duration-200">
            <NavLink
              to="/about"
              className="before:block before:content-[''] before:absolute before:bottom-[15%] before:w-full before:h-[2px] before:bg-btn-bg-main before:scale-x-0 before:origin-center group-hover:before:scale-x-100 before:transition-all before:duration-[200ms]"
            >
              Ossc Locations
            </NavLink>
          </li>

          <li className="font-colasta group py-2 relative font-bold text-gray-500 hover:text-[#000080] capitalize text-base text-base hover:cursor-pointer hover:text-btn-bg-main transition-hover duration-200">
            <NavLink
              to="/about"
              className="before:block before:content-[''] before:absolute before:bottom-[15%] before:w-full before:h-[2px] before:bg-btn-bg-main before:scale-x-0 before:origin-center group-hover:before:scale-x-100 before:transition-all before:duration-[200ms]"
            >
              Ossc Lists
            </NavLink>
          </li>
        </ul>
        <div className="flex gap-4 ml-8">
          <button className="px-8 py-2 border-2 border-[#000080] text-[#000080] rounded-lg">
            login
          </button>
          <button className="px-4 py-2 bg-[#000080]  opacity-[0.6] hover:opacity-[0.7] transition-200 text-white rounded-lg">
            Download App
          </button>
        </div>
      </div>
    </>
  );
}

export default PageNav;
