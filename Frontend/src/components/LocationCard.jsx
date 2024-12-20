/* eslint-disable react/prop-types */
import bag from "../assets/images/bag.png";
import locationImg from "../assets/images/location-img.svg";
import location from "../assets/images/location.svg";
function LocationCard({ data }) {
  return (
    <div>
      {/* Location Cards */}
      <div className="max-w-[1100px] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) =>
          item.wereda?.map((woreda, woredaIndex) => (
            <div
              key={`${item.id}-${woredaIndex}`}
              className="border border-red-200 opacity-[1] rounded-lg p-4 shadow-sm hover:shadow-lg shadow-red-200 transition duration-300"
            >
              <div className="flex gap-4 items-center justify-left pb-4 border-b-[1px]">
                <img
                  src={bag}
                  className="w-[40px] h-[40px] bg-red-200 opacity-[0.7] rounded-xl py-[6px] px-[6px]"
                />
                <h2 className="text-lg font-semibold mb-2">{woreda}</h2>
              </div>

              <div className="flex items-start gap-2 justify-center py-6 px-2">
                <img src={location} />
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
              </div>
              <div className="border-t pt-2">
                <div className="w-full flex gap-2 items-center border border-red-200 rounded-md overflow-hidden scale-95 hover:scale-100 trnsform transition-all duration-300 cursor-pointer backface-hidden">
                  <img
                    src={locationImg}
                    className="h-[80px] w-[70px] object-cover rounded-sm"
                  />
                  <div>
                    {" "}
                    <h3 className="text-sm font-semibold">Location</h3>
                    <p className="text-gray-500 text-sm font-Poppins">
                      Lat: {item.lat} <br />
                      Lng: {item.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LocationCard;
