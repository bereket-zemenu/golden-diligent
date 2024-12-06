import mobilepic1 from "../assets/images/mobile-pic.png";
import mobilepic2 from "../assets/images/mobile-pic2.png";
import mobilepic3 from "../assets/images/mobile-pic3.png";
import bku from "../assets/images/bku.svg";
import bkuBackground from "../assets/images/bku background.svg";
import playstore from "../assets/images/playstore.svg";
import appstore from "../assets/images/appstore.svg";

function DownloadSection() {
  return (
    <div className="flex flex-col py-[5rem]">
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={mobilepic1}
          className="z-1 h-[30rem] -mr-20 transform translate-y-[150px] object-cover"
        />
        <img
          src={mobilepic2}
          className="z-10 h-[30rem] transform translate-y-[100px] object-cover"
        />
        <img
          src={mobilepic3}
          className="z-1 h-[30rem] transform translate-y-[150px] -ml-20 object-cover"
        />
      </div>
      <div className="relative w-full flex justify-center items-center z-30 transform -translate-y-[50px]">
        <img
          src={bkuBackground}
          className="bg-gradient-to-r to-[#0859A8] from-[#0C4160] absolute bottom-0 left-0 z-10 h-full w-full"
        />
        <div className="z-20 w-full flex flex-col justify-center items-center gap-10 py-24 px-6">
          <img src={bku} className="w-20" />
          <h1 className="text-[#FFFFFFB3] opacity-[0.7] text-4xl text-center leading-tight font-bold max-w-xl">
            Download, Register, discover tailored job offers
          </h1>
          <p className="text-[#FFFFFFB3] opacity-[0.5] text-sm text-center leading-tight max-w-md">
            Quick and trusted mobile application to advance your profession more
            quickly and smoothly Download this app from the Android Play Store
            or the iPhone App Store.
          </p>
          <div className="flex gap-4">
            <img src={playstore} className="h-16" />
            <img src={appstore} className="h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadSection;
