import Card from "./card";
import info from "../info";
import { useState, useEffect } from "react";

export default function Content() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // Función para obtener un número aleatorio entre 0 y la longitud del array info
    const getRandomIndex = () => Math.floor(Math.random() * info.length);

    // Función para obtener 4 cartas aleatorias
    const getRandomCards = () => {
      const randomCards = [];
      while (randomCards.length < 4) {
        const index = getRandomIndex();
        if (!randomCards.includes(index)) {
          randomCards.push(index);
        }
      }
      return randomCards.map((index) => info[index]);
    };

    // Inicializar el estado de las cartas al cargar el componente
    setCards(getRandomCards());
  }, []);

  const handleCardClick = (clickedCard) => {
    // Verificar si la carta ya fue seleccionada anteriormente
    if (selectedCards.includes(clickedCard.id)) {
      alert("Ya has seleccionado esta carta. Intenta de nuevo.");
    } else {
      // Actualizar el estado de las cartas seleccionadas
      setSelectedCards([...selectedCards, clickedCard.id]);

      // Obtener 4 nuevas cartas aleatorias
      setCards(getRandomCards());
    }
  };

  return (
    <main className="content">
      <div className="cards">
        {cards.map((character) => (
          <Card
            key={character.id}
            image={character.image}
            name={character.name}
            onClick={() => handleCardClick(character)}
          />
        ))}
      </div>
    </main>
  );
}
