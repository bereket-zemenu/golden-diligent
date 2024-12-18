import mobilepic1 from "../assets/images/mobile-pic.png";
import mobilepic2 from "../assets/images/mobile-pic2.png";
import mobilepic3 from "../assets/images/mobile-pic3.png";
import bku from "../assets/images/bku.svg";
import bkuBackground from "../assets/images/bku background.svg";
import playstore from "../assets/images/playstore.svg";
import appstore from "../assets/images/appstore.svg";

function DownloadSection() {
  return (
    <div className="flex flex-col phone:py-[3rem] tablet:py-[5rem]">
      {/* Images Section */}
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={mobilepic1}
          className="z-1 h-[30rem] phone:h-[15rem] mdphone:h-[20rem] ptab:h-[25rem] -mr-20 phone:-mr-10 transform translate-y-[150px] phone:translate-y-[50px] object-cover"
          alt="Mobile 1"
        />
        <img
          src={mobilepic2}
          className="z-10 h-[30rem] phone:h-[15rem] mdphone:h-[20rem] ptab:h-[25rem] transform translate-y-[100px] phone:translate-y-[30px] object-cover"
          alt="Mobile 2"
        />
        <img
          src={mobilepic3}
          className="z-1 h-[30rem] phone:h-[15rem] mdphone:h-[20rem] ptab:h-[25rem] -ml-20 phone:-ml-10 transform translate-y-[150px] phone:translate-y-[50px] object-cover"
          alt="Mobile 3"
        />
      </div>

      {/* Content Section */}
      <div className="relative w-full flex justify-center items-center py-10 z-30 transform -translate-y-[50px] phone:-translate-y-[20px] tablet:-translate-y-[50px]">
        <img
          src={bkuBackground}
          className="bg-gradient-to-r to-[#0859A8] from-[#0C4160] absolute bottom-0 left-0 z-10 h-full w-full object-cover"
          alt="Background"
        />
        <div className="z-20 w-full flex flex-col justify-center items-center gap-10 phone:gap-6 py-24 px-6 phone:py-12">
          <img src={bku} className="w-20 phone:w-14" alt="Logo" />
          <h1 className="text-[#FFFFFFB3] opacity-[0.7] text-4xl phone:text-2xl mdphone:text-3xl text-center leading-tight font-bold max-w-xl">
            Download, Register, discover tailored job offers
          </h1>
          <p className="text-[#FFFFFFB3] opacity-[0.5] text-sm phone:text-xs mdphone:text-sm text-center leading-tight max-w-md">
            Quick and trusted mobile application to advance your profession more
            quickly and smoothly. Download this app from the Android Play Store
            or the iPhone App Store.
          </p>
          <div className="flex gap-4">
            <img
              src={playstore}
              className="h-16 phone:h-10 mdphone:h-12"
              alt="Play Store"
            />
            <img
              src={appstore}
              className="h-16 phone:h-10 mdphone:h-12"
              alt="App Store"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadSection;
