import { useState } from 'react';

export default function StartPage({ onStart }) {
  const [selected, setSelected] = useState("easy");

  function startGame() {
    onStart(selected);
  };

  function handleClick(e){
    setSelected(e.target.value)
  }

  return (
    <div className="start-page">
      <h1>Memory Card Game</h1>
      <p className="muted"> Choose your game level and start playing </p>

      <div className="difficulty">
        <label>
          <input type="radio" name="difficulty" value="easy" checked={selected === 'easy'} onChange={handleClick}/>
          Easy 
        </label>

        <label>
          <input type="radio" name="difficulty" value="medium" checked={selected === 'medium'} onChange={handleClick}/>
          Medium 
        </label>

        <label>
          <input type="radio" name="difficulty" value="hard" checked={selected === 'hard'} onChange={handleClick}/>
          Hard
        </label>
      </div>

      <button className="primary" onClick={startGame}> Start Game </button>
    </div>
  );
}

