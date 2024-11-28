import React, { useState } from "react";

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const IMAGES_API_URL = "https://api.shecodes.io/images/v1/search";
  const API_KEY = "8e1oeft5a9242f18ee913e0b45ad1a06";

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const fetchDefinition = async (query) => {
    const response = await fetch(`${DICTIONARY_API_URL}${query}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No definitions found for "${capitalize(query)}".`);
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  };

  const fetchImages = async (query) => {
    const response = await fetch(
      `${IMAGES_API_URL}?query=${query}&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch images.");
    }
    return response.json();
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a valid word.");
      setResult("");
      setImages([]);
      return;
    }

    setError("");
    setResult("Loading...");
    setImages([]);

    try {
      const [dictionaryData, imagesData] = await Promise.all([
        fetchDefinition(searchTerm.trim()),
        fetchImages(searchTerm.trim()),
      ]);

      const correctedWord = capitalize(dictionaryData[0].word);
      const firstMeaning = dictionaryData[0].meanings[0];
      const partOfSpeech =
        firstMeaning?.partOfSpeech || "Unknown part of speech";
      const firstDefinition =
        firstMeaning?.definitions[0]?.definition || "Definition not available.";
      const synonyms = firstMeaning?.definitions[0]?.synonyms || [];
      const example =
        firstMeaning?.definitions[0]?.example || "No example available.";
      const audio =
        dictionaryData[0].phonetics.find((phonetic) => phonetic.audio)?.audio ||
        null;

      setResult(
        <div>
          <h2>{correctedWord}</h2>
          {audio && (
            <p>
              <audio controls>
                <source src={audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </p>
          )}
          <p>
            <strong>Part of Speech:</strong> {partOfSpeech}
          </p>
          <p>
            <strong>Definition:</strong> {firstDefinition}
          </p>
          {synonyms.length > 0 && (
            <p>
              <strong>Synonyms:</strong> {synonyms.join(", ")}
            </p>
          )}
          <p>
            <strong>Example:</strong> {example}
          </p>
        </div>
      );

      if (imagesData && imagesData.photos && imagesData.photos.length > 0) {
        setImages(imagesData.photos.slice(0, 5));
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("Error occurred:", err);
      setError(err.message || "An error occurred. Please try again.");
      setResult("");
      setImages([]);
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
            placeholder="Search for a word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="result-container">
          {result || <p>Type a word to search</p>}
        </div>
        {images.length > 0 && (
          <div className="images-container">
            <h3>Related Images</h3>
            <div className="images-grid">
              {images.map((image, index) => (
                <img key={index} src={image.src.landscape} alt={searchTerm} />
              ))}
            </div>
          </div>
        )}
      </main>
      <br />
      <footer className="app-footer">
        <p>
          <br />
          Coded by <strong>Shanice Jones</strong> | Hosted on
          <a
            href="https://github.com/OShaniceO/dictionary-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub{" "}
          </a>{" "}
          and
          <a
            href="https://willowy-kashata-3a436e.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Netlify{" "}
          </a>
        </p>
      </footer>
    </div>
  );
};

export default DictionarySearch;
