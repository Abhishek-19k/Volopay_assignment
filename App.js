// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';

import CardsList from './CardList';
import AppHeader from './AppBar';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <CardsList />
    </div>
  );
}

export default App;
