import { signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";

const SignOut = ({ session }) => {
  let { asPath } = useRouter();
  let handleSignOut = (provider) => {
    signOut(provider);
    localStorage.clear();
  };

  let isLoginPage = () => {
    return asPath === "/login" ? true : false;
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        type="button"
        className={`${
          !isLoginPage()
            ? "bg-red-500  text-white font-bold rounded-full"
            : "bg-white rounded-lg"
        } flex justify-center items-center p-3 cursor-pointer outline-none`}
        onClick={() => handleSignOut()}
      >
        {isLoginPage() && <FcGoogle className="mr-4" />}
        {isLoginPage() && <p className="mr-2">{session?.user?.name}</p>}
        {!isLoginPage() && <AiOutlineLogout className="mr-1" />}
        Sign out
      </button>
    </div>
  );
};

export default SignOut;
