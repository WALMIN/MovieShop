import './Payment.css';
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { actions } from '../features/cart';

function Payment() {
  // Billing details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [streetOptional, setStreetOptional] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpire, setCardExpire] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [swishNumber, setSwishNumber] = useState("");

  const [paypalEmail, setPaypalEmail] = useState("");

  const total = useSelector(state => state.cart.total);
  const [shipping, setShipping] = useState(0);

  const shippingList = [
    ["Postnord", "postnord.webp", "Delivery within 3-4 weekdays", 29],
    ["DHL", "dhl.png", "Delivery within 3-4 weekdays", 29],
    ["Instabox", "instabox.png", "Delivery within 1-2 days", 39],
    ["Budbee", "budbee.png", "Home delivery within 1-2 weekdays", 49]
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


    if(emailRegex.test(email) && phoneRegex.test(phone.replace(" ", "")) && shipping !== 0){
      // Card
      if(paymentMethod == 0) {
        if(cardAmericanExpressRegex.test(cardNumber) ||
        cardVisaRegex.test(cardNumber) ||
        cardMasterCard.test(cardNumber) &&
        setCardExpire.length > 0 &&
        (cardCvc >= 100 && cardCvc <= 9999)){

        alert("(" + paymentMethod + ")\n" +
          firstName + " " + lastName + "\n" + email + "\n" + phone + "\n\n" +
          country + "\n" + street + "\n" + streetOptional + "\n" + postalCode + "\n" + city + "\n\n" +
          cardNumber + "\n" + cardExpire + "\n" + cardCvc);

        }

      // PayPal
      } else if(paymentMethod == 1) {
        if(emailRegex.test(paypalEmail)){
          alert("(" + paymentMethod + ")\n" +
            firstName + " " + lastName + "\n" + email + "\n" + phone + "\n\n" +
            country + "\n" + street + "\n" + streetOptional + "\n" + postalCode + "\n" + city + "\n\n" +
            paypalEmail);

        }

      // Swish
      } else if(paymentMethod == 2) {
        if(phoneRegex.test(swishNumber)){
          alert("(" + paymentMethod + ")\n" +
            firstName + " " + lastName + "\n" + email + "\n" + phone + "\n\n" +
            country + "\n" + street + "\n" + streetOptional + "\n" + postalCode + "\n" + city + "\n\n" +
            swishNumber);

        }

      }

    }

  }

  return (
    <div className="Payment">
      <p className="Title">Billing details</p>
      <div className="BillingDetails">
        <input type="text" placeholder="First name" autocomplete="given-name" value={firstName} onChange={i => { setFirstName(i.target.value) }} required />
        <input type="text" placeholder="Last name" autocomplete="family-name" value={lastName} onChange={i => { setLastName(i.target.value) }} required />
        <input type="text" placeholder="Email" autocomplete="email" value={email} onChange={i => { setEmail(i.target.value) }} required />
        <input type="text" placeholder="Phone" autocomplete="tel" value={phone} onChange={i => { setPhone(i.target.value) }} required />
        <input type="text" placeholder="Country" autocomplete="country-name" value={country} onChange={i => { setCountry(i.target.value) }} required />
        <input type="text" placeholder="Street name and house number" autocomplete="street-address" value={street} onChange={i => { setStreet(i.target.value) }} required />
        <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" value={streetOptional} onChange={i => { setStreetOptional(i.target.value) }} />
        <input type="text" placeholder="Postal code" value={postalCode} onChange={i => { setPostalCode(i.target.value) }} required />
        <input type="text" placeholder="City" value={city} onChange={i => { setCity(i.target.value) }} required />
      </div>

      <p className="Title">Shipping</p>
      {
        shippingList.map(shipping =>
          <div className="ShippingOption">
            <div className="ShippingTitle">
              <input type="radio" name="shipping" value={shipping[0]} onClick={ () => setShipping(shipping[3]) } />
              <div for={shipping[0]}>
                <img src={(process.env.PUBLIC_URL + "/images/shipping/" + shipping[1])} />
                <p>+{shipping[3]} kr</p>
              </div>
            </div>
            <p>{shipping[2]}</p>
          </div>

        )
      }

      <p className="Title">Payment</p>
      <div className="PaymentMethod">
        <div className="PaymentMethodTitle">
          <div>
            <input type="radio" name="payment" value={paymentMethod} onClick={ () => setPaymentMethod(0) } />
          </div>
          <div>
            <img src={(process.env.PUBLIC_URL + "/images/payment/visa.jpg")} />
            <img src={(process.env.PUBLIC_URL + "/images/payment/mastercard.png")} />
            <img src={(process.env.PUBLIC_URL + "/images/payment/american-express.jpg")} />
          </div>
        </div>
        { paymentMethod === 0 ?
          <div className="PaymentMethodFields">
            <input type="text" placeholder="Card number" autocomplete="cc-number" value={cardNumber} onChange={i => { setCardNumber(i.target.value) }} style={{"margin-bottom": "1vmin"}} required />
            <input type="month" autocomplete="cc-exp" onChange={i => { setCardExpire(i.target.value) }} style={{"margin-bottom": "1vmin"}} required />
            <input type="number" placeholder="CVC/CVV" min="0" max="9999" maxlength="4" autocomplete="cc-csc" value={cardCvc} onChange={i => { setCardCvc(i.target.value) }} required />
          </div>
          : null
        }
      </div>

      <div className="PaymentMethod">
        <div className="PaymentMethodTitle">
          <div>
            <input type="radio" name="payment" value={paymentMethod} onClick={ () => setPaymentMethod(1) } />
          </div>
          <div>
            <img src={(process.env.PUBLIC_URL + "/images/payment/paypal.png")} />
          </div>
        </div>
        { paymentMethod === 1 ?
          <div className="PaymentMethodFields">
            <input type="text" placeholder="PayPal email" autocomplete="email" value={paypalEmail} onChange={i => { setPaypalEmail(i.target.value) }} required />
          </div>
          : null
        }
      </div>

      <div className="PaymentMethod">
        <div className="PaymentMethodTitle">
          <div>
            <input type="radio" name="payment" value={paymentMethod} onClick={ () => setPaymentMethod(2) } />
          </div>
          <div>
            <img src={(process.env.PUBLIC_URL + "/images/payment/swish.svg")} />
          </div>
        </div>
        { paymentMethod === 2 ?
          <div className="PaymentMethodFields">
            <input type="text" placeholder="Swish number" autocomplete="tel" value={swishNumber} onChange={i => { setSwishNumber(i.target.value) }} required />
          </div>
          : null
        }
      </div>

      <p className="Title">To pay</p>
      <p className="ToPay">{(total + shipping).toFixed(2)} kr</p>
      <button className="PurchaseButton" onClick={purchase}>Complete the purchase</button>

    </div>
  );
}

export default Payment;
