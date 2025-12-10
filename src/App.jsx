import { useState } from 'react';
import GamePage from './Pages/Gamepage';
import StartPage from './Pages/Startpage';

export default function App() {
  const [page, setPage] = useState('start'); 
  const [difficulty, setDifficulty] = useState(null); 

  const handleStart = (level) => {
    setDifficulty(level);
    setPage('game');
  };

  const handleQuit = () => {
    setDifficulty(null);
    setPage('start');
  };

  return (
    <div className="app">
      {page === 'start' && (
        <StartPage onStart={handleStart} />
      )}

      {page === 'game' && (
        <GamePage difficulty={difficulty} onQuit={handleQuit} />
      )}
    </div>
  );
}
