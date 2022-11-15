import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

const SignIn = () => {
  let handleSignIn = (provider) => {
    signIn(provider);
  };
  return (
    <div>
      <button
        id="signInButton"
        type="button"
        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
        onClick={() => handleSignIn()}
      >
        <FcGoogle className="mr-4" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
