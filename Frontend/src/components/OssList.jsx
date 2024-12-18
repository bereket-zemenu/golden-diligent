const data = [
  {
    id: 1,
    name: "Lemi Kura Woreda 10",
    lat: "9.01686969",
    lng: "38.88869621",
    description: "ምር በነፃ አማካይ በሰሜን",
  },
  {
    id: 2,
    name: "Lemi Kura Woreda 13",
    lat: "9.0226918",
    lng: "38.8950227",
    description: "የሌላ አካባቢ ስታ ማህበረሰብ አገልግሎት ላይ",
  },
  {
    id: 3,
    name: "Lemi Kura Woreda 14",
    lat: "9.03060657",
    lng: "38.89756821",
    description: "እንደ አገልግሎት ድርሻ",
  },
  {
    id: 4,
    name: "Lemi Kura Woreda 02",
    lat: "9.03424888",
    lng: "38.87728227",
    description: "በአካባቢ ስስታ በማህበረሰብ",
  },
  {
    id: 5,
    name: "Lemi Kura Woreda 03",
    lat: "9.06274348",
    lng: "38.88677185",
    description: "እንደምርና በማካይበላይ ማህበረሰብ እንደ ሌላ",
  },
  {
    id: 6,
    name: "Lemi Kura Woreda 09",
    lat: "9.03697139",
    lng: "38.89257844",
    description: "እንደ ሌላ እንዲህ በማህበረሰብ",
  },
  {
    id: 7,
    name: "Yeka Woreda 02",
    lat: "9.0453601",
    lng: "38.78945185",
    description: "እንደ ምር አገልግሎት",
  },
  {
    id: 8,
    name: "Yeka Woreda 03",
    lat: "9.04986091",
    lng: "38.78945185",
    description: "እንደ ማህበረሰብ ላይ",
  },
];

const OssList = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4">
        One-Stop Service Center
      </h1>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-md w-64"
        />
        <select className="p-2 border rounded-md">
          <option>Region</option>
        </select>
        <select className="p-2 border rounded-md">
          <option>City</option>
        </select>
        <select className="p-2 border rounded-md">
          <option>Sub City</option>
        </select>
        <select className="p-2 border rounded-md">
          <option>Woreda</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Clear
        </button>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="border-t pt-2">
              <h3 className="text-sm font-semibold">Location</h3>
              <p className="text-gray-600 text-sm">
                Lat: {item.lat} <br />
                Lng: {item.lng}
              </p>
            </div>
          </div>
        ))}
      </div>

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
  );
};

export default OssList;
