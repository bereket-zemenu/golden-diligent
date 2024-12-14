const RegistrationForm = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 border shadow-md">
      <h1 className="text-xl font-bold text-center mb-6">
        Application Form for the Grant/Renewal of Ethiopian Origin
        Identification Card
      </h1>

      {/* Personal Details */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block font-semibold">First Name</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">
            Grand Father&apos;s Name
          </label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Father&apos;s Name</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Date of Birth</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Day"
              className="w-1/3 border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Month"
              className="w-1/3 border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Year"
              className="w-1/3 border p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Place of Birth */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block font-semibold">Place of Birth</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Country</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* Physical Attributes */}
      <div className="grid grid-cols-3 gap-6 mb-4">
        <div>
          <label className="block font-semibold">Height</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Color of Eyes</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Color of Hair</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* Passport Details */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block font-semibold">Passport No.</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Place of Issue</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Date of Issue</label>
          <input type="date" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Issuing Authority</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* Family Details */}
      <h2 className="font-bold text-lg mt-6 mb-2">Family Details</h2>
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block font-semibold">Father&apos;s Line</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Mother&apos;s Line</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* Submit */}
      <div className="text-center mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
