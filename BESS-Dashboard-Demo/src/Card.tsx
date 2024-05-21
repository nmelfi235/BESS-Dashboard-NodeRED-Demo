interface cardProp {
  Name: string;
  Icon: string;
  Data: string;
}

function Card(props: cardProp) {
  return (
    <div className="card" style={{ width: "auto", border: "2px solid black" }}>
      <div className="card-body">
        <h3 className="card-title">{props.Name}</h3>
        <img className="card-img-top" src={props.Icon} alt="icon" />
        <p className="card-text">{props.Data}</p>
      </div>
    </div>
  );
}

export default Card;
