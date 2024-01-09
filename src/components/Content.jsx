import Card from "./Card";
import allCards from "../info";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function Content() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [win, setWin] = useState(null);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    //borrar
    getCards();
  }, []); // Initial setup

  const handleCardClick = (id) => {
    setClickedCards((prevClickedCards) => [...prevClickedCards, id]);
    if (clickedCards.includes(id)) {
      setWin(false);
      return;
    }
    if (score === allCards.length - 1) {
      setWin(true);
      setBestScore(0);
      confetti();
      return;
    }
    setScore((prevScore) => prevScore + 1);
    getCards();
  };

  function getCards() {
    const shuffledCards = shuffleArray(allCards);
    const newSelectedCards = shuffledCards.slice(0, 4);
    setSelectedCards(newSelectedCards);
  }

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  function resetGame() {
    if (win === true) setBestScore(0);
    setScore(0);
    setWin(null);
    setClickedCards([]);
    getCards();
  }
  function startGame() {
    setWin();
  }
  return (
    <main className="content">
      <div className="info">
        <div className="infoText">
          {score === 0
            ? "Let's test your memory! Don't click twice on the same card"
            : "Try not to click the same card!"}
        </div>
        <div className="scores">
          <div className="score">
            Score: <div className="num">{score}/10</div>
          </div>
          <div className="score best">
            Best Score: <div className="num">{bestScore}</div>
          </div>{" "}
        </div>
      </div>

      <div className="cards">
        {selectedCards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            name={card.name}
            handleChange={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <button onClick={getCards} className="buttonChange">
        Mix Cards Again
      </button>
      {win !== null && (
        <section className="win">
          <div className="winSquare">
            <div>
              {win === false
                ? "You clicked twice on the same card :("
                : "Excelent! You have a nice memory ;)"}
            </div>
            <button onClick={resetGame} className="buttonWin">
              Play Again
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
