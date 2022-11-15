import { fetchingUser } from "../utils/fetchingUser";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedLink = () => {
  let user = fetchingUser();
  let router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
  });
};

export default ProtectedLink;
