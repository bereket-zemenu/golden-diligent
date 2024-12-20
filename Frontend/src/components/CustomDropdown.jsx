/* eslint-disable react/prop-types */

const CustomDropdown = ({
  options,
  selected,
  onSelect,
  defualt,
  isOpen,
  setIsOpen,
}) => {
  console.log(selected);

  return (
    <div className="w-full relative z-[999] w-28 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-32 p-2 px-2 border-none rounded-md bg-white text-left outline-none focus:ring-2 focus:ring-red-300"
      >
        {selected ? selected : defualt}
      </button>
      {isOpen && (
        <ul className="absolute z-1000 flex flex-col gap-2 left-0 w-full mt-2 bg-white border rounded-md shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(!isOpen);
              }}
              className="w-full inline-block flex-col gap-2 px-2 py-2 hover:bg-red-100 cursor-pointer text-[15px]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomDropdown;
