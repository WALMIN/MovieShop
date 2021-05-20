import "./Cart.css";
import { Link } from "react-router-dom";
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
          <div className="Cart-empty">
            <img className="CartImage" src={(process.env.PUBLIC_URL + "/images/cart-empty.svg")} />
            <p className="CartTitle">Oops! Your cart is empty!</p>
            <p className="CartText">Looks like you haven't added<br/>anything to your cart yet</p>
            <Link className="CartButton" to="/">Continue shopping</Link>
          </div>
        }
      </main>
      { (cartList.length > 0) ?
        <footer>
          <h2>Total:<br/>{total} kr</h2>
          <button>Checkout</button>
        </footer>
        :
        <div></div>
      }
    </div>
  );
}

export default Cart;
