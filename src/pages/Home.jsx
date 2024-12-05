import About from "../components/About";
import Header from "../components/Header";
// import AutoSlider from "../components/AutoSlider";
import InfiniteScroll from "../components/InfiniteScroll";
import Services from "../components/Services";

function Home() {
  return (
    <div className="">
      <Header />
      <InfiniteScroll />
      <Services />
      <About />
    </div>
  );
}

export default Home;
