export default function Card({ card, onClick }) {
  return (
    <button className="card" onClick={onClick} aria-label={card.name}>
      <img src={card.image} alt={card.name} />
      <span className="name">{card.name}</span>
    </button>
  );
}
