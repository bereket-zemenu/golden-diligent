import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <ThreeDots
        height="25px"
        width="25px"
        radius="9"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
