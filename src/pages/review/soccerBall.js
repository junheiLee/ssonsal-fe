import React from 'react';

const SoccerBalls = ({ score }) => {
  const maxBalls = 5;
  const fullBalls = Math.floor(score);
  const halfBalls = score % 1 !== 0 ? 1 : 0;
  const emptyBalls = maxBalls - fullBalls - halfBalls;

  const soccerBalls = [];

  for (let i = 0; i < fullBalls; i++) {
    soccerBalls.push(<span key={i} role="img" aria-label="soccer-ball">&#9917;</span>); // Soccer ball
  }

  if (halfBalls === 1) {
    soccerBalls.push(<span key="half" role="img" aria-label="half-soccer-ball">&#9921;</span>); // Half soccer ball
  }

  for (let i = 0; i < emptyBalls; i++) {
    soccerBalls.push(<span key={`empty${i}`} role="img" aria-label="empty-soccer-ball">&#9898;</span>); // Empty soccer ball
  }

  return soccerBalls;
};

export default SoccerBalls;
