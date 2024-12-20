import About from "../components/About";
import DownloadSection from "../components/DownloadSection";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import InfiniteScroll from "../components/InfiniteScroll";
import Locations from "../components/Locations";
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
      <Locations />
      <Footer />
    </div>
  );
}

export default Home;
