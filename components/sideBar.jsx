import Link from "next/link";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";
import ActiveLink from "./ActiveLink";
import { handleImage } from "../utils/handleUserImage";
import { fetchingUser } from "../utils/fetchingUser";
import { useState, useEffect } from "react";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-51 transition-all duration-200 ease-in-out capitalize shadow-md";

const SideBar = (props) => {
  let { closeToggle } = props;
  const [isHydrated, IsHydrated] = useState(false);
  let userInfo = fetchingUser();

  useEffect(() => {
    IsHydrated(true);
  });

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="hasScrollbar flex flex-col justify-between bg-white h-full min-w-240 overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col">
        <Link href="/" className="flex px-5 gap-2 pt-1 w-190 items-center">
          <img
            src="/logo.png"
            alt="logo"
            className="w-36 ml-10 mt-1 p-1"
            onClick={handleCloseSidebar}
            style={{ width: "100px", height: "70px" }}
          />
        </Link>
        <div className="flex flex-col ">
          <ActiveLink
            activeClassName={isActiveStyle}
            href="/"
            className={isNotActiveStyle}
          >
            <a
              onClick={handleCloseSidebar}
              className="flex items-center px-5 gap-2 text-base 2xl:text-xl rounded-full py-2"
            >
              <RiHomeFill className="flex ml-1" />
              Home
            </a>
          </ActiveLink>
          <h3 className="mt-1 px-5 text-base 2xl:text-xl font-bold text-hhh shadow-md rounded-lg mb-2">
            Categories & Hashtags
          </h3>
          <div className="shadow-md flex flex-col flex-start pb-3">
            {categories.slice(0, categories.length - 1).map((category) => (
              <ActiveLink
                activeClassName={isActiveStyle}
                href={`/category/${category.name}`}
                className={isNotActiveStyle}
                key={category.name}
              >
                <a
                  onClick={handleCloseSidebar}
                  className="px-5 text-base 2xl:text-xl flex flex-row rounded-full py-1"
                >
                  <img
                    src={category?.image}
                    alt="category"
                    className="w-8 h-8 rounded-full shadow-sm mr-2"
                  />
                  {category.name}
                </a>
              </ActiveLink>
            ))}
          </div>
        </div>
        {userInfo && isHydrated ? (
          <ActiveLink
            href={`/userProfile/${userInfo?._id}`}
            activeClassName={isActiveStyle}
          >
            <div
              onClick={handleCloseSidebar}
              className="flex my-1 mb-3 gap-2 p-2 mb-3 items-center bg-white rounded-full shadow-lg mx-3 font-bold cursor-pointer"
            >
              <img
                referrerPolicy="no-referrer"
                src={handleImage(userInfo)}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p>{userInfo?.name}</p>
            </div>
          </ActiveLink>
        ) : (
          <Link href="/login">
            <a
              onClick={handleCloseSidebar}
              className="flex justify-center items-center py-2 mt-2 bg-hhh rounded-full shadow-md text-xl font-bold text-white"
            >
              Login
            </a>
          </Link>
        )}
        {<div className="py-3"></div>}
      </div>
    </div>
  );
};

export default SideBar;
