// to make  a unique string for each user to put into id
export const createId = (name, email) => {
  name = name.replace(/\s/g, "");
  email = email.replace("@", "");
  email = email.replace(".", "");
  return `31613283683p8ifr4nqpbocs${name}ef188a0${email}rjontm`;
};
