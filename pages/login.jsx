import { useSession } from "next-auth/react";
import RenderLoginBottun from "../components/renderLogin";
import { client } from "./api/auth/client";
import { useRouter } from "next/router";
import { createId } from "../utils/createId";

const Login = () => {
  const router = useRouter();
  let returnUrl = router.query.returnUrl;
  const { data: session } = useSession();

  if (session) {
    const { name, image, email } = session.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: createId(name, email),
        ...session.user,
      })
    );

    const doc = {
      // the _id below supposed to be got from google response but here i got it from the .env
      _id: createId(name, email),
      _type: "user",
      userName: name,
      image,
    };

    client.createIfNotExists(doc).then(() => {
      if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push("/");
      }
    });
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          autoPlay
          muted
          loop
          controls={false}
          className="w-full h-full object-cover"
        >
          <source src="share.mp4" type="video/mp4" />
        </video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src="logowhite.png" width="130px" alt="logo" />
          </div>
          <div className="shadow-2×1">
            <RenderLoginBottun session={session} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
