import About from "../components/About";
import DownloadSection from "../components/DownloadSection";
import Gallery from "../components/Gallery";
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
      <Gallery />
      <DownloadSection />
    </div>
  );
}

export default Home;
