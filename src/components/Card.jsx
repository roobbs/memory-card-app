export default function Card({ image, name }) {
  return (
    <div className="card">
      <img src={image} alt="CardImage" className="cardImage" />
      <div>{name}</div>
    </div>
  );
}
