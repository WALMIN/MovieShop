import "./Cart.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/cartList';

function Cart() {
  // localStorage.removeItem("cart")

  let [cart, setCart] = useState([])
  let localCart = localStorage.getItem("cart");

  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart)

  }, [])

  const updateItem = (itemID, add) => {
    let cartCopy = [...cart]
    let existentItem = cartCopy.find(item => item.id == itemID);

    if (!existentItem) return

    if(add){
      existentItem.quantity += 1;

    } else {
      existentItem.quantity -= 1;

    }

    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter(item => item.id != itemID)

    }

    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);

  }

  const removeItem = (itemID) => {
    let cartCopy = [...cart]
    cartCopy = cartCopy.filter(item => item.id != itemID);

    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem('cart', cartString)

  }

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
        { (cart.length > 0) ?
          cart.map(product =>
            <div key={product.id} className="MovieItem">
              <div className="MovieItemInfo">
                <div>
                  <img src={product.img} />
                  <div className="MovieItemInnerInfo">
                    <p className="MovieTitle">{product.title}</p>
                    <div className="Quantity">
                      <img className="QuantityAddButton" src={(process.env.PUBLIC_URL + "/images/remove.svg")} onClick={ () => updateItem(product.id, false) }/>
                      <p className="Quantity">{product.quantity}</p>
                      <img className="QuantityRemoveButton" src={(process.env.PUBLIC_URL + "/images/add.svg")} onClick={ () => updateItem(product.id, true) }/>
                      <img className="RemoveButton" src={(process.env.PUBLIC_URL + "/images/delete.svg")} onClick={ () => removeItem(product.id) }/>
                    </div>
                  </div>
                </div>
                <p className="MoviePrice">{product.price} kr</p>
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
      { (cart.length > 0) ?
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
