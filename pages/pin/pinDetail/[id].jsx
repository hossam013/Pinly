import { fetchingUser } from "../../../utils/fetchingUser";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdDownloadForOffline } from "react-icons/md";
import { v4 as uuid4 } from "uuid";
import { client, urlFor } from "../../api/auth/client";
import MasonryLayout from "../../../components/masonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../../../utils/data";
import Spinner from "../../../components/spinner";
import { useRouter } from "next/router";
import { handleImage } from "../../../utils/handleUserImage";
import ProtectedLink from "./../../../components/protectedLink";

const PinDetailWithId = () => {
  let user = fetchingUser();
  let {
    query: { id: pinID },
  } = useRouter();
  let router = useRouter();
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const addComment = () => {
    if (!user) {
      router.push("/login");
    }
    if (comment && user) {
      setAddingComment(true);

      client
        .patch(pinID)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuid4(),
            postedBy: {
              _type: "postedBy",
              _ref: user?._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
          window.location.reload();
        });
    }
  };

  // const handleDeleteComment = (comment) => {
  //   console.log(comment._key);
  //   let comments = [...pinDetail?.comments];
  //   let updatedComments = comments.filter((com) => com._key !== comment._key);
  //   console.log(updatedComments);

  //   client
  //     .patch(pinID)
  //     .insert("replace", "comments[]", updatedComments)
  //     .commit()
  //     .then(() => {
  //       console.log("done");
  //       // window.location.reload();
  //     });
  // };

  useEffect(() => {
    const fetchPinDetails = async () => {
      let query = pinDetailQuery(pinID);
      if (query) {
        await client.fetch(query).then((pinData) => {
          if (pinData[0]) setPinDetail(pinData[0]);

          if (pinData[0]) {
            query = pinDetailMorePinQuery(pinData[0]);

            client.fetch(query).then((response) => setPins(response));
          }
        });
      }
    };

    fetchPinDetails();
  }, [pinID]);

  let handleImageUrl = () => {
    let url = pinDetail?.image && urlFor(pinDetail?.image).url();
    return url;
  };

  if (!pinDetail) {
    return <Spinner message="Loading pin..." />;
  }

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white mt-2"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={handleImageUrl()}
            alt="Pin Image"
            referrerPolicy="no-referrer"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-350">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail?.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail?.destination} target="_blacnk" rel="noreferrer">
              {pinDetail?.destination?.slice(8)}
            </a>
          </div>
          <div className="flex flex-col items-canter align-center">
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail?.title}
            </h1>
            <p className="mt-3 mb-2">{pinDetail?.about}</p>
          </div>
          <Link
            href={`/userProfile/${pinDetail?.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <div className="flex items-center space-x-1 ml-1">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                referrerPolicy="no-referrer"
                src={pinDetail?.postedBy?.image}
                alt="User Profile"
              />
              <p className="font-semibold capitalize">
                {pinDetail?.postedBy?.userName}
              </p>
            </div>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="hasScrollbar max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                key={i}
                className="flex gap-2 mt-5 items-center bg-white rounded-lg justify-between"
              >
                <div className="flex gap-2 items-center">
                  <Link href={`/userProfile/${comment?.postedBy?._id}`}>
                    <img
                      src={comment?.postedBy?.image}
                      referrerPolicy="no-referrer"
                      alt="user Profile"
                      className="w-8 h-8 rounded-full object-cover mt-1"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <p className="font-bold">{comment?.postedBy?.userName}</p>
                    <p>{comment?.comment}</p>
                  </div>
                </div>
                {/* {user?._id === comment?.postedBy?._id && (
                  <MdDelete
                    className="cursor-pointer"
                    onClick={() => handleDeleteComment(comment)}
                  />
                )} */}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link href={user ? `/userProfile/${user?._id}` : "/login"}>
              <img
                className="w-8 h-8 rounded-full object-cover mt-1"
                referrerPolicy="no-referrer"
                src={handleImage(user)}
                alt="User Profile"
              />
            </Link>
            <input
              type="text"
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300 min-w-0"
              placeholder="Add Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
              id="013"
            >
              <ProtectedLink />
              {addingComment ? "Posting the Comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetailWithId;
