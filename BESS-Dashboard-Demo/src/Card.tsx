interface cardProp {
  Name: string;
  Icon: string;
  children: React.ReactNode;
}

function Card(props: cardProp) {
  return (
    <div className="card" style={{ width: "auto", border: "2px solid black" }}>
      <div className="card-body">
        <h3 className="card-title">{props.Name}</h3>
        <img className="card-img-top" src={props.Icon} alt={props.Name} />
        <div className="card-text">{props.children}</div>
      </div>
    </div>
  );
}

export default Card;
