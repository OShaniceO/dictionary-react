import React, { useState } from "react";

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [result, setResult] = useState(""); 
  const [error, setError] = useState(""); 
  const API_KEY = "8e1oeft5a9242f18ee913e0b45ad1a06";
  const API_URL = "https://api.shecodes.io/dictionary/v1/define";

  
  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Please enter a word.");
      setResult("");
      return;
    }
    setError(""); 

    try {
      const response = await fetch(
        `${API_URL}?word=${searchTerm}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data && data.word) {
        const definitions = data.definitions.map((def, index) => (
          <p key={index}>
            <strong>{index + 1}:</strong> {def.definition}
          </p>
        ));
        setResult(
          <div>
            <h3>Definitions for "{data.word}":</h3>
            {definitions}
          </div>
        );
      } else {
        setResult("No definitions found.");
      }
    } catch (err) {
      setError(
        "An error occurred while fetching the definition. Please try again."
      );
      setResult("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dictionary App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result || <h2>Type a word to search</h2>}
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
