import { Link } from 'react-router-dom';

function SectionCard({ title, description, to }) {
  return (
    <article className="section-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to} className="primary-btn">
        Open Section
      </Link>
    </article>
  );
}

export default SectionCard;
