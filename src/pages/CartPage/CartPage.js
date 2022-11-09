import {
  faArrowLeftLong,
  faArrowRightLong,
  faCaretLeft,
  faCaretRight,
  faGift,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../data/localstorage";
import { REMOVE_CART, UPDATE_CART } from "../../redux/action";
import { dataCartProduct, stateFormatPrice } from "../../redux/selector";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();
  //lay data
  const dataCart = useSelector(dataCartProduct);
  //luu dataCart LocalStorage
  saveToLocalStorage("dataCart", dataCart);
  // console.log(ddataCart);
  const formatPrice = useSelector(stateFormatPrice);
  const [productCart, setProductCart] = useState(dataCart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setProductCart(dataCart);
    //tinh total
    const totalCart = productCart.reduce((total, val) => {
      return total + val.item.price * val.quantityCart;
    }, 0);
    setTotal(totalCart);
  }, []);
  console.log(productCart);

  //update tang giam
  const minusHandler = (i) => {
    // console.log(e);
    if (productCart[i].quantityCart > 1) {
      dispatch(UPDATE_CART({ index: i, quantityUpdate: -1 }));
    }
  };
  const plusHandler = (i) => {
    dispatch(UPDATE_CART({ index: i, quantityUpdate: 1 }));
  };

  //xoa product
  const removeHandler = (i) => {
    // e.preventDefault();
    console.log(i);
    // truyen action xoa store
    dispatch(REMOVE_CART(i));
  };

  return (
    <div className="containerCartPage">
      <div className="banerCartPage">
        <div className="banerCartPage_bigCart">
          <h2>CART</h2>
        </div>
        <div className="banerCartPage_smallCart">
          <span>CART</span>
        </div>
      </div>
      {/* -----------------------------Shopping Cart--------------------------------- */}
      <h4 className="cartPage_h4">SHOPPING CART</h4>
      <div className="cartPage_table1">
        <div className="cartPage_table2">
          <div>
            <table className="cartPage_table">
              <thead className="cartPage_table_thead">
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {productCart
                  ? productCart.map((e, index) => (
                      <tr key={index} className="cartPage_table_tbody_tr">
                        <td>
                          <img
                            src={e.item.img1}
                            className="cartPage_table_tbody_img"
                            alt=""
                          />
                        </td>
                        <td>
                          <h6 className="cartPage_table_tbody_h6">
                            {e.item.name}
                          </h6>
                        </td>
                        <td>{formatPrice(e.item.price)} VND</td>
                        <td>
                          <button
                            className="cartPage_table_tbody_button"
                            onClick={() => {
                              minusHandler(index);
                            }}
                          >
                            <FontAwesomeIcon icon={faCaretLeft} />
                          </button>
                          {e.quantityCart}{" "}
                          <button
                            className="cartPage_table_tbody_button"
                            onClick={() => {
                              plusHandler(index);
                            }}
                          >
                            <FontAwesomeIcon icon={faCaretRight} />
                          </button>
                        </td>
                        <td>
                          {formatPrice(e.item.price * e.quantityCart)} VND
                        </td>
                        <td onClick={() => removeHandler(index)}>
                          <FontAwesomeIcon
                            className="faTrashCan_Cart"
                            icon={faTrashCan}
                          />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          {/* -------------------- */}
          <div className="btnContinue_div">
            <div style={{ width: "50%" }}>
              <button className="btnContinue" onClick={() => navigate("/shop")}>
                <FontAwesomeIcon icon={faArrowLeftLong} /> Continue Shopping
              </button>
            </div>
            <div className="btnProceed_div">
              <button
                className="btnProceed"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            </div>
          </div>
        </div>
        {/* -----------------cartTotal-------------------------*/}
        <div className="cartTotal_container">
          <h5 className="cartTotal_h5 ">CART TOTAL</h5>
          <div className="cartTotal_div1">
            <div className="cartTotal_div2">SUBTOTAL</div>
            <div className="cartTotal_div3">{formatPrice(total)} VND</div>
          </div>
          <div className="cartTotal_div4">
            <div className="cartTotal_div5">TOTAL</div>
            <div className="cartTotal_div6">{formatPrice(total)} VND</div>
          </div>
          <input
            className="inputCoupon"
            type="text"
            placeholder="Enter your coupon"
          />
          <button className="btnCoupon">
            <FontAwesomeIcon icon={faGift} /> Apply coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
