/* eslint-disable react/prop-types */
import CountryFlag from "react-country-flag";

function FlagImoji({ countryCode }) {
  return (
    <div>
      <CountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "2em",
          height: "1.2em",
        }}
      />
    </div>
  );
}

export default FlagImoji;
