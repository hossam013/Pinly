import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  let router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="font-bold text-3xl">Oops, This page can not be found.</h1>
      <p className="text-2xl mt-5">we will redirect you to Home page...</p>
    </div>
  );
};

export default NotFound;
