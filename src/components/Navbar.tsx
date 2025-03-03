import { useCallback, useEffect, useRef, useState } from "react";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { useTheme } from "next-themes";
import { isMobile } from "react-device-detect";
import Search from "./Search";
import NavbarItem from "./NavbarItem";

import Icon from "./Icon";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  convertToTitleCaseForDisplay,
  convertToTitleCaseForPath,
} from "@/utils";
import IconTheme from "./IconTheme";
import { EThemes } from "@/enums";
import useCurrentUser from "@/hooks/useCurrentUser";
import AccountMenu from "./AccountUser";
import Image from "next/image";

const navbarItemListData = ["Trang_chủ"];

const Navbar: React.FC = () => {
  const { data: currentUser } = useCurrentUser();
  const { theme } = useTheme();
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [showAccountUser, setShowAccountUser] = useState<boolean>(false);
  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const showNavbarMobileRef = useRef<HTMLDivElement>(null);
  const showAccountUserRef = useRef<HTMLDivElement>(null);

  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const toggleAccountUser = useCallback(() => {
    setShowAccountUser((prev) => !prev);
  }, []);

  const handleShowNavbarMobile = useCallback(() => {
    setShowNavbarMobile((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ((isMobile &&
          showNavbarMobileRef.current &&
          !showNavbarMobileRef.current.contains(event.target as Node)) ||
          (showAccountUserRef.current &&
            !showAccountUserRef.current.contains(event.target as Node))) &&
        event.type === "mousedown"
      ) {
        setShowNavbarMobile(false);
        setShowAccountUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNavbarMobileRef, showAccountUserRef]);

  return (
    <nav className="w-full fixed z-40 top-0">
      <div className="h-[10vh] px-4 md:px-16 py-6 flex flex-row items-center bg-opacity-70 backdrop-blur-sm transition duration-500 border-b">
        <Link href={"/"} className="text-white">
          Review
        </Link>

        {/* PC, Tablet */}
        <div
          ref={showAccountUserRef}
          className="hidden md:flex flex-row gap-7 items-center justify-between w-full"
        >
          <div className="flex-row ml-8 gap-12 hidden lg:flex">
            {navbarItemListData.map((item) => (
              <NavbarItem
                label={convertToTitleCaseForDisplay(item)}
                path={convertToTitleCaseForPath(item)}
                key={item}
              />
            ))}
          </div>
          <div className="flex items-center ml-auto gap-8 lg:flex">
            <Icon onClick={isOpenSearch}>
              <BsSearch className="dark:text-white text-themeDark" />
            </Icon>
            <Icon>
              <IconTheme />
            </Icon>
            {currentUser && Object.keys(currentUser).length ? (
              <div
                className="flex flex-row items-center gap-2 cursor-pointer relative"
                onClick={toggleAccountUser}
              >
                <div className="overflow-hidden">
                  <Image
                    className="w-8 rounded-2xl"
                    src={
                      currentUser.image ? currentUser.image : "/images/user.png"
                    }
                    alt="Image_user"
                    width={32}
                    height={32}
                  />
                </div>
                <BsChevronDown
                  className={`text-white transition ${
                    showAccountUser ? "rotate-180" : "rotate-0"
                  }`}
                />
                <AccountMenu visible={showAccountUser} userData={currentUser} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile */}
        <div
          ref={showNavbarMobileRef}
          className="fixed md:hidden right-3 top-3"
        >
          {!showNavbarMobile ? (
            <div className="flex items-center gap-4">
              <Icon onClick={isOpenSearch}>
                <BsSearch />
              </Icon>
              <Icon>
                <IconTheme />
              </Icon>
              <button
                onClick={handleShowNavbarMobile}
                className="bg-transparent z-30 transition"
              >
                <Bars4Icon
                  className={`${
                    theme === EThemes.LIGHT ? "text-black" : "text-white"
                  } transition ease-in-out`}
                  width="40"
                  height="40"
                />
              </button>
              {currentUser && Object.keys(currentUser).length ? (
                <div
                  className="flex flex-row items-center gap-2 cursor-pointer relative"
                  onClick={toggleAccountUser}
                >
                  <div className="overflow-hidden">
                    <Image
                      className="w-8 rounded-2xl"
                      src={
                        currentUser.image
                          ? currentUser.image
                          : "/images/user.png"
                      }
                      alt="Image_user"
                      width={32}
                      height={32}
                    />
                  </div>
                  <BsChevronDown
                    className={`transition ${
                      showAccountUser ? "rotate-180" : "rotate-0"
                    } ${theme === EThemes.LIGHT ? "text-black" : "text-white"}`}
                  />
                  <AccountMenu
                    visible={showAccountUser}
                    userData={currentUser}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <button
              onClick={handleShowNavbarMobile}
              className="bg-transparent z-30 transition"
            >
              <XMarkIcon className="text-white" width="40" height="40" />
            </button>
          )}
        </div>
      </div>
      <div
        className={`top-16 left-0 right-0 h-[50vh] bg-opacity-70 backdrop-blur-sm transition md:p-10 md:pl-20 fixed z-30 ease-in-out duration-500 overflow-auto ${
          showNavbarMobile ? "translate-y-0" : "-translate-y-[120%]"
        }`}
      >
        <div className="text-center mt-12">
          {navbarItemListData.map((item) => (
            <NavbarItem
              label={convertToTitleCaseForDisplay(item)}
              path={convertToTitleCaseForPath(item)}
              key={item}
            />
          ))}
        </div>
      </div>
      {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
    </nav>
  );
};

export default Navbar;
