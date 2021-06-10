import "./Cart.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/cart';
import defaultImg from '../img/movielogo.jpg';

function Cart() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Set state from local storage
  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    localCart = JSON.parse(localCart);

    if (localCart) {
      setCart(localCart);

      setSubtotal(0);
      localCart.map(product => {
        return setSubtotal(t => (t + (product.quantity * product.price)));

      });

    }

  }, []);

  const updateItem = (id, add) => {
    let newCart = [...cart];

    // See if item exist
    let existingItem = newCart.find(item => item.id === id);
    if (!existingItem) return

    // Check if user wants to add or remove
    if(add){
      existingItem.quantity += 1;

    } else {
      existingItem.quantity -= 1;

    }

    // Delete if no items left
    if (existingItem.quantity <= 0) {
       newCart = newCart.filter(item => item.id !== id);

    }

    // Save state & local storage
    setCart(newCart);
    let cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);

    // Update total price
    setSubtotal(0);
    newCart.map(product => {
      return setSubtotal(t => (t + (product.quantity * product.price)));

    });

  }

  const removeItem = (id) => {
    let newCart = [...cart];

    // Remove item from list
    newCart = newCart.filter(item => item.id !== id);

    // Save state & local storage
    setCart(newCart);
    let cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);

    // Update total price
    setSubtotal(0);
    newCart.map(product => {
      return setSubtotal(t => (t + (product.quantity * product.price)));

    });

  }

  const dispatch = useDispatch();
  const updateSubtotal = (subtotal) => {
    dispatch(actions.updateSubtotal(subtotal));

  }

  return (
    <div className="Cart">
      <header className="Cart-header">
        <h1>Cart</h1>
        <div>
          <h2 className="Price">${subtotal.toFixed(2)}</h2>
          <Link className="CheckoutButton" to="/payment" onClick={ () => updateSubtotal(subtotal)}>Checkout</Link>
        </div>
      </header>
      <main>
        { (cart.length > 0) ?
          cart.map(product =>
            <div key={product.id} className="MovieItem">
              <div className="MovieItemInfo">
                <div>
                  <Link to={`/MovieInfo/${product.id}`}>
                  { product.img !== "https://image.tmdb.org/t/p/w500null" ?
                    <div>
                      <img src={product.img} alt={product.title} />
                    </div>
                    :
                    <div>
                      <img src={defaultImg} alt={product.title} />
                    </div>
                  }</Link>
                  <div className="MovieItemInnerInfo">
                    <Link to={`/MovieInfo/${product.id}`} className="MovieTitle">{product.title}</Link>
                    <div className="Quantity">
                      <img className="QuantityAddButton" src={(process.env.PUBLIC_URL + "/images/remove.svg")} onClick={ () => updateItem(product.id, false) } alt="Remove"/>
                      <p className="Quantity">{product.quantity}</p>
                      <img className="QuantityRemoveButton" src={(process.env.PUBLIC_URL + "/images/add.svg")} onClick={ () => updateItem(product.id, true) } alt="Add"/>
                      <img className="RemoveButton" src={(process.env.PUBLIC_URL + "/images/delete.svg")} onClick={ () => removeItem(product.id) } alt="Delete"/>
                    </div>
                  </div>
                </div>
                <p className="MoviePrice">${product.price.toFixed(2)}</p>
                </div>
            </div>
          )
          :
          <div className="Cart-empty">
            <img className="CartImage" src={(process.env.PUBLIC_URL + "/images/cart-empty.svg")} alt="Cart"/>
            <p className="CartTitle">Oops! Your cart is empty!</p>
            <p className="CartText">Looks like you haven't added<br/>anything to your cart yet</p>
            <Link className="CartButton" to="/">Continue shopping</Link>
          </div>
        }
      </main>
    </div>
  );
}

export default Cart;
