import "./Varukorg.css";
import { useState } from "react";

function Varukorg() {
  const [sum, setSum] = useState(0);

  const products = [
    ["Batman Begins", 99, "https://sfanytime-images-prod.secure.footprint.net/COVERM/ba242472-c422-41dd-a724-9f81010f54bf_COVERM_01.jpg?w=375&fm=pjpg&s=cd8710e230dbe303f7f9795a38beba57"],
    ["The Dark Knight", 109, "https://sfanytime-images-prod.secure.footprint.net/COVERM/COVERM_b9e21514-0507-4965-a0a4-7ebb3971dd90_01.jpg?w=375&fm=pjpg&s=14f65063145150c9ab0b824200da9075"],
    ["The Dark Knight Rises", 119, "https://static0.colliderimages.com/wordpress/wp-content/uploads/the-dark-knight-rises-imax-poster.jpeg"]
  ];

  const list = products.map(product =>
    <div key={product[0]} className="MovieItem">
      <div>
        <img src={product[2]} />
        <p className="MovieTitle">{product[0]}</p>
      </div>
      <p className="MoviePrice">{ () => setSum(sum + product[1]) } {product[1]} kr</p>
    </div>
  )

  return (
    <div className="Varukorg">
      <header className="Varukorg-header">
        <h1>Varukorg</h1>
      </header>
      <main>
        {list}
      </main>
      <footer>
        <h2>Summa:<br/>{sum} kr</h2>
        <button>Fortsätt</button>
      </footer>
    </div>
  );
}

export default Varukorg;
