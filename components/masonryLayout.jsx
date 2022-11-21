import Masonry from "react-masonry-css";
import Pin from "../pages/pin/index";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  // 500: 1,
};

const MansoryLayout = ({ pins }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MansoryLayout;
