import Card from "./card";
import allCards from "../info";
import { useState, useEffect } from "react";

export default function Content() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    getCards();
  }, []); // Initial setup

  const handleCardClick = (id) => {
    setClickedCards((prevClickedCards) => [...prevClickedCards, id]);
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
      return;
    }
    if (score === allCards.length - 1) {
      console.log("you Won!");
      getCards();
      setScore(0);
      setClickedCards([]);
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

  return (
    <main className="content">
      <div className="scoreDiv">
        <div className="score">
          Score: <div className="num">{score}</div>
        </div>
        <div className="score best">
          Best Score: <div className="num">{bestScore}</div>
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
        Change Cards
      </button>
    </main>
  );
}
