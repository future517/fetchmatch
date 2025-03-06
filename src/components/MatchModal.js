import React from 'react';

const MatchModal = ({ dog, onClose }) => {
  if (!dog) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>You've been matched with {dog.name}!</h2>
        <img src={dog.img} alt={dog.name} />
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Location: {dog.zip_code}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MatchModal;