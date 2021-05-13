import './NavigationBar.css';
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="NavigationBar">
      <Link className="NaviationButton" to="/"><img src={(process.env.PUBLIC_URL + "/images/home.svg")} />Home</Link>
      <Link className="NaviationButton" to="/saved"><img src={(process.env.PUBLIC_URL + "/images/saved.svg")} />Saved</Link>
      <Link className="NaviationButton" to="/cart"><img src={(process.env.PUBLIC_URL + "/images/cart.svg")} />Cart</Link>
    </div>
  );
}

export default NavigationBar;
