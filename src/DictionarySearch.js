
import React, { useState } from "react";

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [result, setResult] = useState(""); 
  const handleSearch = () => {
    setResult(`Searching for "${searchTerm}"`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dictionary App</h1>
      <h2>{result || "Type a word to search"}</h2>
      <div>
        <input
          type="text"
          placeholder="Enter a word"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DictionarySearch;
