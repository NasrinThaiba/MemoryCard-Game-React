import React from "react";

export default function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <div>Current Score: <strong>{score}</strong></div>
      <div>High Score: <strong>{bestScore}</strong></div>
    </div>
  );
}