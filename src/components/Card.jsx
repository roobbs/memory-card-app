export default function Card({ image, name, handleChange }) {
  return (
    <div className="card" onClick={handleChange}>
      <img src={image} alt="CardImage" className="cardImage" />
      <div>{name}</div>
    </div>
  );
}
