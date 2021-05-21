import "./Cart.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Cart() {
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");

  // Set state from local storage
  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);

  }, [])

  const updateItem = (id, add) => {
    let newCart = [...cart];

    // See if item exist
    let existingItem = newCart.find(item => item.id == id);
    if (!existingItem) return

    // Check if user wants to add or remove
    if(add){
      existingItem.quantity += 1;

    } else {
      existingItem.quantity -= 1;

    }

    // Delete if no items left
    if (existingItem.quantity <= 0) {
       newCart =  newCart.filter(item => item.id != id);

    }

    // Save state & local storage
    setCart(newCart);
    let cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);

  }

  const removeItem = (id) => {
    let newCart = [...cart];

    // Remove item from list
    newCart = newCart.filter(item => item.id != id);

    // Save state & local storage
    setCart(newCart);
    let cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);

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
          <h2>Total:<br/>{0} kr</h2>
          <button onClick={() => localStorage.removeItem("cart")}>Checkout</button>
        </footer>
        :
        <div></div>
      }
    </div>
  );
}

export default Cart;
