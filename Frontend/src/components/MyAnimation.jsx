import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/images/animation.json";
import { useStores } from "../contexts/storeContext";

const MyAnimation = () => {
  const { move } = useStores();

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
          transform: move ? "none" : "rotate(180deg)", // Conditional rotation
        }}
      ></Player>
    </div>
  );
};

export default MyAnimation;
