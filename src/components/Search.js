import React, { useState, useEffect } from 'react';
import DogCard from './DogCard';
import MatchModal from './MatchModal';
import { fetchBreeds, fetchDogs, fetchMatch } from '../utils/api';

const Search = () => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [sortOrder, setSortOrder] = useState('breed:asc'); // Default sort by breed ascending
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);

  const pageSize = 10; // Number of results per page

  useEffect(() => {
    fetchBreeds().then(setBreeds);
  }, []);

  useEffect(() => {
    fetchDogs(selectedBreed, sortOrder, currentPage, pageSize).then((data) => {
      setDogs(data.dogs);
      setTotalResults(data.total);
    });
  }, [selectedBreed, sortOrder, currentPage]);

  const handleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
    );
  };

  const handleGenerateMatch = async () => {
    const match = await fetchMatch(favorites);
    setMatchedDog(match);
    setShowMatchModal(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="search">
      <h1>Search Dogs</h1>
      <div className="filters">
        <label>
          Filter by Breed:
          <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
            <option value="">All</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="breed:asc">Breed (A-Z)</option>
            <option value="breed:desc">Breed (Z-A)</option>
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="age:asc">Age (Low to High)</option>
            <option value="age:desc">Age (High to Low)</option>
          </select>
        </label>
      </div>
      <div className="dog-list">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} onFavorite={handleFavorite} isFavorite={favorites.includes(dog.id)} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First Page
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last Page
        </button>
      </div>
      <button onClick={handleGenerateMatch} disabled={favorites.length === 0}>
        Generate Match
      </button>
      {showMatchModal && <MatchModal dog={matchedDog} onClose={() => setShowMatchModal(false)} />}
    </div>
  );
};

export default Search;