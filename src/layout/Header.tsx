import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { BASE_URL_APP } from "../utils";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store/hooks";
import { clearUser, setUser } from "../store/loginSlice";
import { setNav } from "../store/NavSlice";
import { useNavigate } from "react-router-dom";
import { setLan } from "../store/lanSlice";
import { CircleUserRound, UserRound } from "lucide-react";
import axiosInstance from "../service/AxiosInstance";
import { useHeaderData } from "../hooks/useHeaderData";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMenuOpen1, setIsMenuOpen1] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuRef1 = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const headerData = useHeaderData();
  


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        menuRef1.current &&
        !menuRef1.current.contains(event.target as Node)
      ) {
        setIsMenuOpen1(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenu1 = () => {
    setIsMenuOpen1(!isMenuOpen1);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      dispatch(clearUser());
      localStorage.clear();
      navigate("/login");
      toast("Logout Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <header className="flex h-20 items-center justify-between bg-white p-6 px-4 md:px-12 border-b">
      <img
        src="/images/agri.png"
        className="w-[180px] hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />

      {/* <div className="hidden md:flex items-center space-x-4">
        <Button
          variant="link"
          className={`text-base text-black ${active === "Home" ? "text-[20px]" : ""} hover:no-underline hover:text-[20px]`}
          style={{ width: "100px" }}
          onClick={() => {
            dispatch(setNav("Home"));
            setActive("Home");
          }}
        >
          Home
        </Button>
        <Button
          variant="link"
          className={`text-base text-black ${active === "Community Forum" ? "text-[20px]" : ""} hover:no-underline hover:text-[20px]`}
          style={{ width: "150px" }}
          onClick={() => {
            dispatch(setNav("Community Forum"));
            setActive("Community Forum");
          }}
        >
          Community Forum
        </Button>
      </div> */}

      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        onClick={toggleMobileMenu}
      >
        <div className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-white p-4">
          <button
            onClick={toggleMobileMenu}
            className="mb-4 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <nav className="space-y-2">
            <a
              href="/"
              className="block text-base text-black hover:text-gray-700"
            >
              Home
            </a>
            <a
              href="/community-forum"
              className="block text-base text-black hover:text-gray-700"
            >
              Community Forum
            </a>
            {/* Add more links as needed */}
          </nav>
        </div>
      </div>

      <div className="hidden items-center space-x-5 md:flex">
        <div className="relative" ref={menuRef1}>
          <img
            src="/images/language.svg"
            alt="Language"
            className="h-10 w-10 rounded-full hover:cursor-pointer"
            onClick={toggleMenu1}
          />
          {isMenuOpen1 && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  dispatch(setLan(1));
                  setIsMenuOpen1(false);
                }}
              >
                English
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  dispatch(setLan(2));
                  setIsMenuOpen1(false);
                }}
              >
                Hindi
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 rounded-full border border-gray-400 p-2">
          <img src="/images/coin.svg" alt="Coins" className="h-5 w-6" />
          <span>300</span>
        </div>
        <Button variant="link" size="icon">
          <img src="/images/bell.svg" alt="Notifications" className="h-5 w-5" />
        </Button>
        <div className="relative" ref={menuRef}>
          {headerData?.basic_info[0]?.profile ? (
            <img
              src={`${BASE_URL_APP}/media/${headerData?.basic_info[0]?.profile}`}
              onClick={toggleMenu}
              className="h-12 w-12 border-primary border-2 rounded-full hover:cursor-pointer"
            />
          ) : (
            <CircleUserRound
              size={48}
              color="#a49d9d"
              strokeWidth={1.5}
              absoluteStrokeWidth
              onClick={toggleMenu}
              className="hover:cursor-pointer"
            />
          )}

          {isMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
              <a
                href="/dashboard/userProfile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
