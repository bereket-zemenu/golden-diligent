import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/images/animation.json";

const MyAnimation = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData} // Replace with your Lottie JSON file path
        style={{
          color: "red",
          height: "180px",
          width: "400px",
          transform: "rotate(180deg)",
        }}
      ></Player>
    </div>
  );
};

export default MyAnimation;
