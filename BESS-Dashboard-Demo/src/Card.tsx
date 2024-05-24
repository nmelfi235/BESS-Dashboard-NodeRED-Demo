import { cardProp } from "./types";

function Card(props: cardProp) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{props.Name}</h3>
        <img className="card-img-top" src={props.Icon} alt="icon" />
        <p className="card-text">{props.children}</p>
      </div>
    </div>
  );
}

export default Card;
