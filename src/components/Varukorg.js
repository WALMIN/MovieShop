import "./Varukorg.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/cartList';

function Varukorg() {
  const cartList = useSelector(state => state.cartList.items);

  const dispatch = useDispatch();
  const deleteFromCart = (id) => {
    dispatch(actions.deleteItem(id));

  }

  return (
    <div className="Varukorg">
      <header className="Varukorg-header">
        <h1>Varukorg</h1>
      </header>
      <main>
        { (cartList.length > 0) ?
          cartList.map(product =>
            <div key={product[0]} className="MovieItem">
              <img className="RemoveButton" src={(process.env.PUBLIC_URL + "/images/remove.svg")} onClick={ () => deleteFromCart(product[0]) }/>
              <div className="MovieItemInfo">
                <div>
                  <img src={product[2]} />
                  <p className="MovieTitle">{product[1]}</p>
                </div>
                <p className="MoviePrice">{product[3]} kr</p>
                </div>
            </div>
          )
          :
          <p>Your cart is empty.</p>
        }
      </main>
      <footer>
        <h2>Summa:<br/>{0} kr</h2>
        <button>Fortsätt</button>
      </footer>
    </div>
  );
}

export default Varukorg;
