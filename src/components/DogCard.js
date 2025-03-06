import React from 'react';

const DogCard = ({ dog, onFavorite, isFavorite }) => {
  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age}</p>
        <p><strong>Location:</strong> {dog.zip_code}</p>
      </div>
      <button onClick={() => onFavorite(dog.id)}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default DogCard;