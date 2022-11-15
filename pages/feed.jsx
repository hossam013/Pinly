import { useState, useEffect } from "react";
import { client } from "./api/auth/client";
import MasonryLayout from "../components/masonryLayout";
import Spinner from "../components/spinner";
import { feedQuery, searchQuery } from "../utils/data";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { query } = useRouter();
  const { id: categoryId } = query;

  let handleSearch = ({ target }) => {
    setSearchTerm(target.value);
    console.log(pins);
    pins.filter((pin) => {});
  };

  useEffect(() => {
    setLoading(true);
    if (categoryId === undefined) {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }

    if (searchTerm) {
      setLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId, searchTerm]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  return (
    <div>
      {
        <div className="flex gap-2 md:gap-5 w-full mt-2 pb-7">
          <div className="flex justify-start items-center w-full px-2 rounded-md bd-white border-none outline-none focus-within:shadow-sm bg-white">
            <IoMdSearch fontSize={21} className="ml-1" />
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              placeholder="Search"
              value={searchTerm}
              className="p-2 w-full bg-white outline-none"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <Link href="/createPin">
              <div
                className="bg-hhh text-white gap-1 rounded-full mr-2 w-12 h-10 md:w-14 md:h-12 flex justify-center items-center cursor-pointer"
                style={{ width: "115px", height: "40px" }}
              >
                <IoMdAdd />
                Create Pin
              </div>
            </Link>
          </div>
        </div>
      }
      {!pins?.length ? (
        <div className="flex flex-col items-center justify center mt-40">
          <h1 className="flex items-center justify center font-bold text-4xl">
            No pins available with this category, you can create one!
          </h1>
          <Link href="/createPin">
            <div
              className="flex flex-row bg-hhh text-xl text-white gap-1 rounded-full mt-5 py-2  md:w-14 md:h-12 flex justify-center items-center cursor-pointer"
              style={{ width: "150px", height: "60px" }}
            >
              <IoMdAdd className="font-bold" />
              Create Pin
            </div>
          </Link>
        </div>
      ) : (
        <div>{pins && <MasonryLayout pins={pins} />}</div>
      )}
    </div>
  );
};

export default Feed;
