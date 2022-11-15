import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../utils/data";
import { client } from "../api/auth/client";
import MasonryLayout from "../../components/masonryLayout";
import Spinner from "../../components/spinner";
import { handleImage } from "../../utils/handleUserImage";
import { fetchingUser } from "../../utils/fetchingUser";
import SignOut from "../../components/signOut";
import { useSession } from "next-auth/react";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfileWithId = () => {
  let { query } = useRouter(),
    { id: userProfileId } = query;
  let currentUser = fetchingUser();
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  useEffect(() => {
    let query = userQuery(userProfileId);

    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
      .catch((ex) => {
        console.error(ex);
      });
  }, [userProfileId, user]);

  useEffect(() => {
    if (text === "Created") {
      let createdPinsQueryByUser = userCreatedPinsQuery(userProfileId);

      client.fetch(createdPinsQueryByUser).then((data) => {
        setPins(data);
      });
    } else {
      let savedPinsQueryByUser = userSavedPinsQuery(userProfileId);

      client.fetch(savedPinsQueryByUser).then((data) => {
        setPins(data);
      });
    }
  }, [userProfileId, user]);

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
              referrerPolicy="no-referrer"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.image}
              referrerPolicy="no-referrer"
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3 flex">
              {user?.userName}
            </h1>
            {userProfileId === process.env.NEXT_PUBLIC_ADMIN_SECRET_ID ? (
              <div className="pb-7">
                <h3 className="flex mb-3 gap-2 p-2 items-center bg-white rounded-full shadow-lg mx-3 text-2xl">
                  Owner
                </h3>
              </div>
            ) : (
              ""
            )}
            <div className="absolute top-0 z-1 right-0 p-2">
              {userProfileId === currentUser?._id && <SignOut />}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>
          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              This User Has No Pins Yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileWithId;
