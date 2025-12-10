import { useEffect, useState } from 'react';
import Scoreboard from '../Components/Scoreboard';
import CardGrid from '../Components/CardGrid';
import { shuffle } from '../utils/Shuffle';

function getCardCountByDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy': return 4;
    case 'medium': return 8;
    case 'hard': return 12;
    default: return 5;
  }
}

function getStorageKey(difficulty) {
  return `best_${difficulty}`;
}

export default function GamePage({ difficulty = 'easy', onQuit }) {
  const [cards, setCards] = useState([]);
  const [order, setOrder] = useState([]);

  const [gameover, setGameover] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const key = getStorageKey(difficulty);
    return Number(localStorage.getItem(key)) || 0;
  });

  // const [clicked, setClicked] = useState([]); //store the value, eliminate duplicate 
  const [clicked, setClicked] = useState(new Set())
  const[status, setStatus] = useState("");
  const count = getCardCountByDifficulty(difficulty);
  
  useEffect(() => {
    setScore(0);
    setClicked(new Set())
    // setClicked([]);
    setStatus('');
    const key = getStorageKey(difficulty);
    const scoreValue = Number(localStorage.getItem(key)) || 0;
    setBestScore(scoreValue);
  }, [difficulty]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${count}`);
        const json = await result.json();
        const data = json?.data || [];
        console.log(data);

        const normalized = data.map((a) => ({
          id: a.mal_id,
          name: a.title,
          image: a.images?.jpg?.image_url || '',
        }));
        setCards(normalized)

      } catch (e) {
        setError('Failed to fetch cards. Please try again.')

      } finally {
        setLoading(false)
      }
    }
    
    load();
  }, [count]);


  useEffect(() => {
    if (cards.length) {
      const ids = cards.map((c) => c.id);
      setOrder(shuffle(ids));
    }
  }, [cards]);

  const orderedCards = order.flatMap(id => {
  const card = cards.find(c => c.id === id);
  return card ? [card] : [];
  });

  const handleCardClick = (id) => {
    if(gameover) return;

    // if (clicked.includes(id)) {
    if (clicked.has(id)) {
    setStatus("You Lose the Match! Try again!");
    setGameover(true);
    return;
     
    } else {
      const nextSet = new Set(clicked);
      // const nextArray = [...clicked];
      // nextArray.push(id);
      nextSet.add(id);
      setClicked(nextArray);
      console.log(nextArray);

      setScore((prev) => {
        const score = prev + 1;
        
          setBestScore((high) => {
          const best = Math.max(score, high);
          const key = getStorageKey(difficulty);
          localStorage.setItem(key, best);
          return best;
          })
        return score;
       });

      // if (nextArray.length === count) {
         if (nextSet.size === count) {
      setStatus(" You Win the Match!!");
      setGameover(true);
    }

    }
    setOrder((prev) => shuffle([...prev]));

  };

    function Restart(){
      setScore(0);
      setClicked(new Set());
      // setClicked([]);
      setStatus("");
      setGameover(false);
      setOrder((prev) => shuffle([...prev]));
    }
 

  return (
    <div className="game-page">
      <header className="game-header">
        <h2>Difficulty: {difficulty.toUpperCase()}</h2>
        <Scoreboard score={score} bestScore={bestScore} />
        <button className="secondary" onClick={onQuit}>Quit</button>
        <button className="primary" onClick={Restart}>Restart</button>
      </header>
      
      
      {loading && <p className="muted">Loading cards…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <CardGrid cards={orderedCards} onCardClick={handleCardClick} />
      )}

      {status && (
       <div className="status-box">
       <p>{status}</p>
       <button className="play-again" onClick={Restart}> Play Again </button>
       </div>
      )}

    </div>
  )
}
