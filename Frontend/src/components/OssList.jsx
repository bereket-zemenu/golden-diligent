/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import LocationCard from "./LocationCard";
import PageNav from "./PageNav";
import MobileMenu from "./MobileMenu";

const data = [
  {
    id: 1,
    type: "Region",
    name: "Addis Ababa",
    subCity: [
      "Lemi Kura",
      "Yeka",
      "Kirkos",
      "Adis Ketema",
      "Nifas Silk",
      "Gullele",
    ],
    wereda: [
      "wereda 01",
      "wereda 02",
      "wereda 03",
      "wereda 04",
      "wereda 05",
      "wereda 06",
      "wereda 07",
      "wereda 08",
      "wereda 09",
      "wereda 10",
    ],
    lat: "9.01686969",
    lng: "38.88869621",
    description: "የተባበሩት አካባቢ አዲስ እየተሰራ ያለው የአፍሪካ ኮንቬንሽን ሴንተር ፊትለፊት",
  },
  {
    id: 2,
    type: "City",
    name: "Afar",
    lat: "9.0226918",
    lng: "38.8950227",
    description: "የተባበሩት አካባቢ አዲስ እየተሰራ ያለው የአፍሪካ ኮንቬንሽን ሴንተር ፊትለፊት",
  },
  {
    id: 3,
    type: "Sub City",
    name: "Dire Dawa",
    lat: "9.03060657",
    lng: "38.89756821",
    description: "እንደ አገልግሎት ድርሻ",
  },
  {
    id: 4,
    type: "region",
    name: "Harari",
    wereda: [
      "Harari Abadir Wereda",
      "Harari Shenkor Wereda",
      "Harari Aboker Wereda",
    ],
    lat: "9.03424888",
    lng: "38.87728227",
    description: "በአካባቢ ስስታ በማህበረሰብ",
  },
  {
    id: 5,
    type: "region",
    name: "Gambela",
    wereda: [
      "Gambela 01 Kebele",
      "Gambela 03 kebele",
      "Gambela 04 kebele",
      "Gambela 05 kebele",
    ],
    lat: "9.06274348",
    lng: "38.88677185",
    description: "እንደምርና በማካይበላይ ማህበረሰብ እንደ ሌላ",
  },
  {
    id: 6,
    type: "region",
    name: "Oromia",
    wereda: [
      "Fiche",
      "Fiche",
      "Fiche",
      "Fiche",
      "Sululta",
      "Sululta",
      "Sululta",
      "Jimma",
      "Jimma",
      "Jimma",
    ],
    lat: "9.03697139",
    lng: "38.89257844",
    description: "እንደ ሌላ እንዲህ በማህበረሰብ",
  },
  {
    id: 7,
    type: "region",
    name: "South Ethiopia",
    wereda: [
      "sodo zone 01",
      "sodo zone 01",
      "sodo zone 01",
      "sodo zone 01",
      "sodo zone 01",
      "sodo zone 01",
      "Dilla Ketema",
      "Dilla Ketema",
      "Dilla Ketema",
      "Dilla Ketema",
    ],
    lat: "9.0453601",
    lng: "38.78945185",
    description: "እንደ ምር አገልግሎት",
  },
];

const OssList = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSubCity, setSelectedSubCity] = useState("");
  const [selectedWoreda, setSelectedWoreda] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <PageNav />
      <MobileMenu />

      <div className="p-8 pt-36">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-4">
          One-Stop Service Center
        </h1>

        {/* Search and Filters */}
        <div className="max-w-[1100px] m-auto flex gap-4 items-center mb-8 bg-red-200 bg-opacity-[0.3] py-2 px-2 rounded-lg">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-md w-96 border-none outline-none focus:ring-[2px] focus:ring-red-300"
            />
          </div>
          <div>
            <CustomDropdown
              options={data.map((item) => item.name)}
              selected={selectedRegion}
              defualt="Region"
              onSelect={setSelectedRegion}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
          </div>
          <div>
            <CustomDropdown
              options={data.map((item) => item.name)}
              selected={selectedCity}
              defualt="City"
              onSelect={setSelectedCity}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
          </div>
          <div>
            <CustomDropdown
              options={data.map((item) => item.name)}
              selected={selectedSubCity}
              defualt="Sub City"
              onSelect={setSelectedSubCity}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
          </div>
          <div>
            <CustomDropdown
              options={data.map((item) => item.name)}
              selected={selectedWoreda}
              defualt="Woreda"
              onSelect={setSelectedWoreda}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
          </div>
          <div>
            <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md w-28 px-4">
              Clear
            </button>
          </div>
        </div>
        <LocationCard data={data} />

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex gap-2">
            <button className="text-gray-600 hover:text-blue-600">&lt;</button>
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  i === 0 ? "bg-blue-600 text-white" : "text-gray-600"
                } hover:bg-blue-600 hover:text-white`}
              >
                {i + 1}
              </button>
            ))}
            <button className="text-gray-600 hover:text-blue-600">&gt;</button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OssList;
