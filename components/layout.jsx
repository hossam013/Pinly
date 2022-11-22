import Head from "next/head";
import Link from "next/link";
import SideBar from "./../components/sideBar";
import { HiMenu } from "react-icons/hi";
import { useState, useEffect } from "react";
import { userQuary } from "./../utils/data";
import { client } from "../pages/api/auth/client";
import { AiFillCloseCircle } from "react-icons/ai";
import { handleImage } from "../utils/handleUserImage";
import { fetchingUser } from "../utils/fetchingUser";
import { useSession } from "next-auth/react";

const LatOut = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = fetchingUser();
  let session = useSession();
  let currentUser = session?.data?.user;

  useEffect(() => {
    const quary = userQuary(userInfo?._id);

    client.fetch(quary).then((data) => {
      setUser(data[0]);
    });
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Pinly</title>
        <link
          rel="icon"
          type="image/png"
          sizes="auto"
          href="favicon.ico"
        ></link>
      </Head>
      <div className="body flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial">
          <SideBar closeToggle={setToggleSidebar} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
            <Link href="/">
              <img src="/logo.png" alt="logo" className="w-20" />
            </Link>
            <Link href={user ? `/userProfile/${user?._id}` : "/login"}>
              <img
                referrerPolicy="no-referrer"
                src={handleImage(user)}
                alt="User Image"
                className="w-10 rounded-full"
              />
            </Link>
          </div>
          {toggleSidebar && (
            <div className="fixed w-2/3 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <SideBar closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>
        <div className="hasScrollbar pb-2 flex-1 h-screen overflow-y-scroll ml-3 mt-3">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default LatOut;
