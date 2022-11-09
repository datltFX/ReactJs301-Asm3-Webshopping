import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataCartProduct, stateFormatPrice } from "../../redux/selector";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const formatPrice = useSelector(stateFormatPrice);
  const dataCheckout = useSelector(dataCartProduct);
  console.log(dataCheckout);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalCheckout = dataCheckout.reduce((total, pro) => {
      return total + pro.item.price * pro.quantityCart;
    }, 0);
    setTotal(totalCheckout);
  }, [dataCheckout]);

  const chechoutSubmitHandler = (e) => {
    e.preventDefault();
    alert("hoan tat don hang");
    navigate("/");
  };
  return (
    <div>
      <div className="bannerCheckout">
        <div className="bannerCheckout_bigCheckout">
          <h2>CHECKOUT</h2>
        </div>
        <div className="bannerCheckout_smallCheckout">
          <span>HOME /</span>
          <span> CART /</span>
          <span> CHECKOUT</span>
        </div>
      </div>
      {/* ---------------------------------------------Billing details----------------------------- */}
      <div className="checkout_bill">
        <div className="checkout_bill1">
          <form onSubmit={chechoutSubmitHandler}>
            <h2 className="checkout_bill1_h2">BILLING DETAILS</h2>
            <label className="checkout_bill_label">FULL NAME:</label>
            <input
              type="text"
              className="checkout_bill_input"
              placeholder="Enter Your Full Name Here!"
            />
            <label className="checkout_bill_label">EMAIL:</label>
            <input
              type="text"
              className="checkout_bill_input"
              placeholder="Enter Your Email Here!"
            />
            <label className="checkout_bill_label">PHONE NUMBER:</label>
            <input
              type="text"
              className="checkout_bill_input"
              placeholder="Enter Your Phone Number Here!"
            />
            <label className="checkout_bill_label">ADDRESS:</label>
            <input
              type="text"
              className="checkout_bill_input"
              placeholder="Enter Your Address Here!"
            />
            <button className="checkout_bill_button">Place Order</button>
          </form>
        </div>
        {/* --------------------------------your order---------------------------- */}
        <div className="checkout_order">
          <h5 className="checkout_order_h5">YOUR ORDER</h5>
          {dataCheckout.map((out, index) => (
            <div className="checkout_order_div1" key={index}>
              <div className="checkout_order_div2">{out.item.name}</div>
              <div className="checkout_order_div3">{`${formatPrice(
                out.item.price
              )} VND x ${out.quantityCart} `}</div>
            </div>
          ))}
          <div className="checkout_order_total">
            <div className="checkout_order_total1">TOTAL</div>
            <div className="checkout_order_total2">
              {formatPrice(total)} VND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
