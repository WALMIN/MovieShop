import "./Confirmation.css";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Confirmation() {
  const payment = useSelector(state => state.cart.payment);

  function generateID(length) {
    var id = "";
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789";

    for (var i = 0; i < length; i++) {
      id += charset.charAt(Math.floor(Math.random() * charset.length));

    }
    return id;

  }

  return (
    <div className="Confirmation">
      { (payment == null) ?
      <main>
        <img className="ConfirmationIcon" src={(process.env.PUBLIC_URL + "/images/confirmed.svg")} alt="confirmed"/>
        <h1 className="ConfirmationTitle">Order confirmed</h1>
        <p className="ConfirmationID">Order #{generateID(10)}</p>
        <p className="ConfirmationText">We will be sending you an email confirmation to <b>{payment[0]}</b> shortly.</p>

        <hr />

        <div>
          <p className="ConfirmationInfoTitle">Address</p>
          <p className="ConfirmationInfoText">{payment[1][0]}<br/>{payment[1][1]}<br/>{payment[1][2]}{payment[1][2] === "" ? <b></b> : <br></br>}{payment[1][3]}<br/>{payment[1][4]}<br/>{payment[1][5]}</p>
        </div>

        <div>
          <p className="ConfirmationInfoTitle">Shipping method</p>
          <p className="ConfirmationInfoText">{payment[2]}</p>
        </div>

        <div>
          <p className="ConfirmationInfoTitle">Payment method</p>
          <p className="ConfirmationInfoText">{payment[3]}</p>
        </div>

        <br />

        <div>
          <p className="ConfirmationInfoTitle">Subtotal</p>
          <p className="ConfirmationInfoText">{payment[4].toFixed(2)} kr</p>
        </div>

        <div>
          <p className="ConfirmationInfoTitle">Shipping</p>
          <p className="ConfirmationInfoText">{payment[5].toFixed(2)} kr</p>
        </div>

        <div>
          <p className="ConfirmationInfoTitle">Total</p>
          <p className="ConfirmationInfoText">{(payment[4] + payment[5]).toFixed(2)} kr</p>
        </div>
      </main>
      :
      <Redirect to='/cart' />
      }
    </div>
  );
};

export default Confirmation;
