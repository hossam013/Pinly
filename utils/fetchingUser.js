export const fetchingUser = () => {
  if (typeof window !== "undefined") {
    const userInfo =
      localStorage?.getItem("user") !== "null" || "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    return userInfo;
  } else {
    return null;
  }
};
