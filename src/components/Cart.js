import "./Cart.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/cartList';

function Cart() {
  const cartList = useSelector(state => state.cartList.items);
  const total = useSelector(state => state.cartList.total);

  const dispatch = useDispatch();
  const deleteFromCart = (id) => {
    dispatch(actions.deleteItem(id));

  }

  return (
    <div className="Cart">
      <header className="Cart-header">
        <h1>Cart</h1>
      </header>
      <main>
        { (cartList.length > 0) ?
          cartList.map(product =>
            <div key={product[0]} className="MovieItem">
              <img className="RemoveButton" src={(process.env.PUBLIC_URL + "/images/remove.svg")} onClick={ () => deleteFromCart([product[0], product[3]]) }/>
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
        <h2>Total:<br/>{total} kr</h2>
        <button>Check out</button>
      </footer>
    </div>
  );
}

export default Cart;
