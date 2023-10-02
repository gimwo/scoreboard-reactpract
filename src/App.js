import { useState } from "react";

export default function App() {
  return <Scoreboard />;
}

function Scoreboard() {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [settings, setSettings] = useState(12);

  let isWinnerP1 = settings === p1Score;
  let isWinnerP2 = settings === p2Score;

  function handleP1Score() {
    setP1Score((score) => score + 1);
  }

  function handleP2Score() {
    setP2Score((score) => score + 1);
  }

  function handleSettings(e) {
    setSettings(Number(e.target.value));
    isWinnerP1 = settings <= p1Score;
    isWinnerP2 = settings <= p2Score;
  }

  function handleReset() {
    setP1Score(0);
    setP2Score(0);
    setSettings(12);
  }

  return (
    <div className="App">
      <Header
        settings={settings}
        onSettings={handleSettings}
        isWinnerP1={isWinnerP1}
        isWinnerP2={isWinnerP2}
      />
      <div className="scoreboard-container">
        <Home
          p1Score={p1Score}
          isWinnerP1={isWinnerP1}
          isWinnerP2={isWinnerP2}
          onAddScore={handleP1Score}
        />
        <Away
          p2Score={p2Score}
          isWinnerP1={isWinnerP1}
          isWinnerP2={isWinnerP2}
          onAddScore={handleP2Score}
        />
        {isWinnerP1 || isWinnerP2 ? <Reset onReset={handleReset} /> : null}
      </div>
    </div>
  );
}

function Header({ settings, onSettings, isWinnerP1, isWinnerP2 }) {
  return (
    <div className="header">
      <h1 className="heading">Scoreboard</h1>
      <div className="score-settings">
        <label>First to score: </label>
        <input
          className="score-set"
          value={settings}
          type="text"
          disabled={isWinnerP1 || isWinnerP2}
          onChange={onSettings}
        />
      </div>
    </div>
  );
}

function Home({ p1Score, onAddScore, isWinnerP1, isWinnerP2 }) {
  return (
    <div
      className={`score-container score-container--home ${
        isWinnerP2 ? "score-container--lose" : ""
      } ${isWinnerP1 ? "score-container--winner" : ""}`}
    >
      <h2 className="score score--home">{p1Score}</h2>
      <h3 className="player-name">Home</h3>
      <AddScore disabled={isWinnerP1 || isWinnerP2} onAddScore={onAddScore} />
    </div>
  );
}

function Away({ p2Score, onAddScore, isWinnerP1, isWinnerP2 }) {
  return (
    <div
      className={`score-container score-container--opponent ${
        isWinnerP1 ? "score-container--lose" : ""
      } ${isWinnerP2 ? "score-container--winner" : ""}`}
    >
      <h2 className="score">{p2Score}</h2>
      <h3 className="player-name">Away</h3>
      <AddScore disabled={isWinnerP1 || isWinnerP2} onAddScore={onAddScore} />
    </div>
  );
}

function AddScore({ onAddScore, disabled }) {
  return (
    <button className="addBtn" disabled={disabled} onClick={() => onAddScore()}>
      Add point
    </button>
  );
}

function Reset({ onReset }) {
  return (
    <div onClick={onReset} className="resetBtn">
      <h2 className="reset">Again?</h2>
    </div>
  );
}
