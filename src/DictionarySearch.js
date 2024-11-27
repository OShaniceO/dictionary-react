import React, { useState } from "react";

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [result, setResult] = useState(""); 
  const [error, setError] = useState(""); 

  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a valid word.");
      setResult("");
      return;
    }

    setError(""); 
    setResult("Loading..."); 

    try {
      const response = await fetch(`${API_URL}${searchTerm.trim()}`);

      if (!response.ok) {
       
        if (response.status === 404) {
          setResult(`No definitions found for "${searchTerm}".`);
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return;
      }

      const data = await response.json();

      if (data && data[0] && data[0].meanings.length > 0) {
        const firstMeaning = data[0].meanings[0];
        const firstDefinition =
          firstMeaning.definitions[0]?.definition ||
          "Definition not available.";
        setResult(
          <div>
            <h3>Definition for "{data[0].word}":</h3>
            <p>{firstDefinition}</p>
          </div>
        );
      } else {
        setResult(`No definitions found for "${searchTerm}".`);
      }
    } catch (err) {
      console.error("Error occurred:", err); 
      setError(
        "An error occurred while fetching the definition. Please try again."
      );
      setResult("");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dictionary App</h1>
      </header>
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a word"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="result-container">
          {result || <p>Type a word to search</p>}
        </div>
      </main>
      <footer className="app-footer">
        <p>
          Coded by <strong>Shanice Jones</strong> | Hosted on
          <a
            href="https://github.com/OShaniceO/dictionary-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          and
          <a
            href="https://willowy-kashata-3a436e.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
        </p>
      </footer>
    </div>
  );
};

export default DictionarySearch;
