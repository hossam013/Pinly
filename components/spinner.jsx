import { InfinitySpin } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-cener w-full h-full">
      <div className="flex items-center justify-center">
        <InfinitySpin color="red" height={50} width={200} style="color: red" />
      </div>
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
