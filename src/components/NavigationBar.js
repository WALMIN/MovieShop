import './NavigationBar.css';
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="NavigationBar">
      <Link className="NaviationButton" to="/"><img src={(process.env.PUBLIC_URL + "/images/home.svg")} />Home</Link>
      <Link className="NaviationButton" to="/favourites"><img src={(process.env.PUBLIC_URL + "/images/favourites.svg")} />Favourites</Link>
      <Link className="NaviationButton" to="/cart"><img src={(process.env.PUBLIC_URL + "/images/cart.svg")} />Cart</Link>
      <Link className="NavigationButton" to="/movieinformation">Info</Link>
    </div>
  );
}

export default NavigationBar;
