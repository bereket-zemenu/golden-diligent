import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useStores } from "../contexts/storeContext";
function MobileMenu() {
  const { isMenuOpen, setIsMenuOpen } = useStores();
  return (
    <>
      <div className="z-[99999999999] absolute top-5 right-16 tablet:hidden">
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
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-500 hover:text-[#000080] font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="location"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-500 hover:text-[#000080] font-semibold"
              >
                OSSC Locations
              </Link>
            </li>
            <li>
              <NavLink
                to="/list"
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
              className="w-[90%] text-center border-2 border-[#000080] text-[#000080] rounded-lg py-1"
            >
              Login
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-[90%] bg-[#000080] text-white rounded-lg py-1"
            >
              Download App
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
