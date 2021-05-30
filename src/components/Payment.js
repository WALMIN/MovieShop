import './Payment.css';
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { actions } from '../features/cart';

function Payment() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [streetOptional, setStreetOptional] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpire, setCardExpire] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const total = useSelector(state => state.cart.total);
  const [shipping, setShipping] = useState(0);

  const deliveryList = [
    ["Postnord", "postnord.webp", "Leverans inom 3-4 vardagar", 29],
    ["DHL", "dhl.png", "Leverans inom 3-4 vardagar", 29],
    ["Instabox", "instabox.png", "Leverans inom 1-2 dagar", 39],
    ["Budbee", "budbee.png", "Hemleverans inom 1-2 vardagar", 49]
  ];

  // Go to cart if no price/cart empty
  if(total === 0) {
    return <Redirect to='/cart' />

  }

  function purchase() {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    let cardAmericanExpressRegex = /^3[47][0-9]{13}$/;
    let cardVisaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let cardMasterCard = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;

    if(emailRegex.test(email) &&
        phoneRegex.test(phone.replace(" ", "")) &&

        shipping !== 0 &&

        (cardAmericanExpressRegex.test(cardNumber) ||
        cardVisaRegex.test(cardNumber) ||
        cardMasterCard.test(cardNumber)) &&
        setCardExpire.length > 0 &&
        (cardCvc >= 100 && cardCvc <= 9999)){
      alert(
        firstName + " " + lastName + "\n" +
        email + "\n" +
        phone + "\n\n" +
        country + "\n" +
        street + "\n" +
        streetOptional + "\n" +
        postalCode + "\n" +
        city + "\n\n" +
        cardNumber + "\n" +
        cardExpire + "\n" +
        cardCvc
      );

    } else {


    }

  }

  return (
    <div className="Payment">
      <p className="Title">Billing details</p>
      <input type="text" placeholder="First name" autocomplete="given-name" value={firstName} onChange={i => { setFirstName(i.target.value) }} required />
      <input type="text" placeholder="Last name" autocomplete="family-name" value={lastName} onChange={i => { setLastName(i.target.value) }} required />
      <input type="text" placeholder="Email" autocomplete="email" value={email} onChange={i => { setEmail(i.target.value) }} required />
      <input type="text" placeholder="Phone" autocomplete="tel" value={phone} onChange={i => { setPhone(i.target.value) }} required />
      <input type="text" placeholder="Country" autocomplete="country-name" value={country} onChange={i => { setCountry(i.target.value) }} required />
      <input type="text" placeholder="Street name and house number" autocomplete="street-address" value={street} onChange={i => { setStreet(i.target.value) }} required />
      <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" value={streetOptional} onChange={i => { setStreetOptional(i.target.value) }} />
      <input type="text" placeholder="Postal code" value={postalCode} onChange={i => { setPostalCode(i.target.value) }} required />
      <input type="text" placeholder="City" value={city} onChange={i => { setCity(i.target.value) }} required />

      <p className="Title">Delivery</p>
      {
        deliveryList.map(delivery =>
          <div className="DeliveryOption">
            <div className="DeliveryTitle">
              <input type="radio" name="delivery" value={delivery[0]} onClick={ () => setShipping(delivery[3]) } />
              <div for={delivery[0]}>
                <img src={(process.env.PUBLIC_URL + "/images/delivery/" + delivery[1])} />
                <p>+{delivery[3]} kr</p>
              </div>
            </div>
            <p>{delivery[2]}</p>
          </div>

        )
      }

      <p className="Title">Payment</p>
      <input type="text" placeholder="Card number" autocomplete="cc-number" value={cardNumber} onChange={i => { setCardNumber(i.target.value) }} required />
      <input type="month" autocomplete="cc-exp" onChange={i => { setCardExpire(i.target.value) }} required />
      <input type="number" placeholder="CVC/CVV" min="0" max="9999" maxlength="4" autocomplete="cc-csc" value={cardCvc} onChange={i => { setCardCvc(i.target.value) }} required />

      <p className="Title">To pay</p>
      <p className="ToPay">{(total + shipping).toFixed(2)} kr</p>
      <button className="PurchaseButton" onClick={purchase}>Complete the purchase</button>

    </div>
  );
}

export default Payment;
