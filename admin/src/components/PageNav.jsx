import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
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
      <div className="pl-10">
        <img src="logo.png" className="h-8 tablet:h-32" alt="Logo" />
      </div>
    </div>
  );
}

export default PageNav;
