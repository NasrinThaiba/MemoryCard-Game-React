
import Card from './Card.jsx';

export default function CardGrid({ cards, onCardClick }) {
  return (
    <div className="grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
}
