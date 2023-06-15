import React from 'react';
import './Card.css'; // Import the CSS file for styling

const Card = ({ card }) => {
  return (
    <div className="card-grid">
      <h3 className="card-title">{card.name}</h3>
      <p className="card-info">Budget: {card.budget_name}</p>
      <p className="card-info">Owner ID: {card.owner_id}</p>
      {card.card_type === 'burner' ? (
        <p className="card-info">
          <span className="status-icon burner-icon">&#128293;</span>
          Expiry: {card.expiry}
        </p>
      ) : (
        <p className="card-info">
          <span className="status-icon subscription-icon">&#128179;</span>
          Limit: {card.limit}
        </p>
      )}
      <p className="card-info">Status: {card.status}</p>
    </div>
  );
};

export default Card;
