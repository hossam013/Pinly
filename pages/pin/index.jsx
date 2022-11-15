import { urlFor } from "../../pages/api/auth/client";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useState } from "react";
import { fetchingUser } from "../../utils/fetchingUser";
import { client } from "./../api/auth/client";

const Pin = ({ pin }) => {
  const router = useRouter();
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const userInfo = fetchingUser();
  // console.log(pin);

  const alreadySaved = !!pin?.save?.filter((item) => {
    if (item?.postedBy) {
      item?.postedBy?._id === userInfo?._id;
    }
  }).length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?._id,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?._id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          router.push(`/pin/pinDetail/${pin?._id}`);
        }}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {console.log(pin?.image?.asset?.url)}
        <img
          // src={urlFor(pin?.image?.asset?.url).width(250)?.url()}
          src={pin?.image?.asset?.url}
          alt=""
          className="rounded-lg w-full"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between ">
              <div className="flex gap-2">
                <a
                  href={`${pin?.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin?._id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-1 w-full">
              {pin?.destination && (
                <a
                  href={pin?.destination}
                  target="_balnk"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 p-1 text-black font-bold rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin?.destination.slice(8)}
                </a>
              )}
              {pin?.postedBy?._id === userInfo?._id && (
                <button
                  type="button"
                  className="bg-white p-1 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin?._id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {pin?.postedBy ? (
        <Link
          href={`/userProfile/${pin?.postedBy?._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          <div className="flex items-center space-x-4 ml-1">
            <img
              src={pin?.postedBy?.image}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover mt-1"
              alt="user-profile"
            />
            <p className="font-semibold capitalize">
              {pin?.postedBy?.userName}
            </p>
          </div>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pin;
