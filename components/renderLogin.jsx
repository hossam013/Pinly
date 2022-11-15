import SignIn from "./signIn";
import SignOut from "./signOut";

const RenderLoginBottun = ({ session }) => {
  if (session) {
    return <SignOut session={session}  />;
  } else {
    return <SignIn />;
  }
};

export default RenderLoginBottun;
