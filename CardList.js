import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

// Card component

// Card List component
const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:5000/cards?page=${page}&search=${searchTerm}&filter=${filter}`
      );
      setCards(prevCards => [...prevCards, ...response.data.data]);
      setLoading(false);
    };

    loadCards();
  }, [page, searchTerm, filter]);

  // Implement infinite scrolling by listening to the scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight
      )
        return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCards([]);
        setPage(1);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
    setCards([]);
    setPage(1);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="burner">Burner</option>
        <option value="subscription">Subscription</option>
      </select>
      <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.name} card={card} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
    </div>
  );
};

export default CardsList;