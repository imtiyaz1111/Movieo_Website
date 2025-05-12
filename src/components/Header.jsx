import React, { useEffect, useState } from "react";
import logo from "../assets/logo.avif";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAuth } from "../redux/Slice/authSlice";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Sample logout handler (you can enhance it as needed)
  const handleLogout = () => {
    dispatch(clearAuth());
    toast.success("Successfully logged out");
    navigate("/login");
    closeDropdown();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => (
            <div key={nav.label + "header" + index}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive && "text-neutral-100"
                  }`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 relative">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block text-white"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>
          {auth?.user && (
            <span className="text-white hidden lg:block">
              Hello, {auth.user.name || auth.user.username || "User"}
            </span>
          )}
          {/* User Icon with Dropdown */}
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all"
              onClick={toggleDropdown}
            >
              <img
                src={userIcon}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md py-2 z-50">
                {auth?.user ? (
                  <>
                   <Link to="/update-password">
                   <button
                      className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                    >
                      UpdatePassword
                    </button>
                   </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
