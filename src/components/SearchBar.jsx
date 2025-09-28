import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="px-4 py-2 rounded-lg text-black outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
      >
        Search
      </button>
    </div>
  );
}
