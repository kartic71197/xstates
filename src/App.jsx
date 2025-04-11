import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
      setCities([]);
      setStates([]);
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
      setShowDiv(false);
    }
  };

  const fetchStates = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setCities([]);
    setStates([]);
    setSelectedState("");
    setSelectedCity("");
    setShowDiv(false);
    const response = await fetch(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    );
    const data = await response.json();
    setStates(data);
  };

  const fetchCities = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCities([]);
    setSelectedCity("");
    setShowDiv(false);
    const response = await fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
    );
    const data = await response.json();
    setCities(data);
  };

  function showData(e) {
    const city = e.target.value;
    setSelectedCity(city);
    if (city) {
      setShowDiv(true);
    }
  }

  return (
    <>
      <select onChange={fetchStates}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select onChange={fetchCities}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select onChange={showData}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {showDiv && (
        <h2>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h2>
      )}
    </>
  );
}

export default App;
