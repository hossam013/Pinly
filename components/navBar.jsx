import Link from "next/link";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { useRouter } from "next/router";

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
  let { asPath } = useRouter();

  let handleSearch = (e) => {
    console.log(e.target.value);
  };

  if (!user) return;

  return (
    <div>
      <div className="flex gap-2 md:gap-5 w-full mt-2 pb-7">
        <div className="flex justify-start items-center w-full px-2 rounded-md bd-white border-none outline-none focus-within:shadow-sm bg-white">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search"
            value={searchTerm}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex gap-3">
          <Link href="/createPin">
            <div className="bg-hhh text-white text-2xl rounded-full mr-2 w-12 h-10 md:w-14 md:h-12 flex justify-center items-center cursor-pointer">
              <IoMdAdd />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
