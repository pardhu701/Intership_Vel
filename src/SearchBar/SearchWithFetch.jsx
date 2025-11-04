import React, { useState, useMemo } from "react";
import { AutoComplete, Input } from "antd";
import debounce from "lodash.debounce";

const SearchWithFetch = () => {
  const [options, setOptions] = useState([]);

  // Fetch suggestions from Wikipedia API
  const fetchSuggestions = async (value) => {
  if (!value.trim()) {
    setOptions([]);
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/users`);
    const data = await response.json();
    console.log(data); // check the structure of data

    setOptions(
      data
        .filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
        .map((item) => ({ value: item.name }))
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    setOptions([]);
  }
};


  // Debounce to avoid too many API calls
  const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 300), []);

  const onSelect = (value) => {
    console.log("Selected:", value);
  };


  return (
    <div style={{ width: 400, margin: "100px auto" }}>
      <AutoComplete
        options={options}
        onSearch={debouncedFetch}
        onSelect={onSelect}
        placeholder="Search Wikipedia..."
        style={{ width: "100%" }}
      >
        <Input.Search size="middle" enterButton />
      </AutoComplete>
    </div>
  );
};

export default SearchWithFetch;
