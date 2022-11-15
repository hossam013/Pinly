export const handleImage = (user) => {
  let defaultImage = "/defaultImage.png";

  if (user?.image) return user?.image;
  else return defaultImage;
};
