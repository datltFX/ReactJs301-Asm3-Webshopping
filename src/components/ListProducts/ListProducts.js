import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_POPUP } from "../../redux/action";
import { stateData, stateFormatPrice, statePopup } from "../../redux/selector";
import Popup from "../Popup/Popup";
import "./ListProducts.css";

const ListProducts = () => {
  const [idImage, setidImage] = useState("");

  //ham truyen action
  const dispatch = useDispatch();

  //lay data
  const data = useSelector(stateData);
  // console.log(data);

  //lay formatPrice
  const formatPrice = useSelector(stateFormatPrice);
  //lay showPopup
  const showPopup = useSelector(statePopup);

  //xu ly su kien click anh
  const clickHandler = (e) => {
    //console.log(e._id.$oid);
    //truyen action
    dispatch(SHOW_POPUP());
    setidImage(e._id.$oid);
  };
  //loc mang lay data Poup
  const dataPopup = data.filter((item) => item._id.$oid === idImage);

  //render
  return (
    <div className="wapperList">
      <div className="row itemList1">
        <p>Made in hard way</p>
        <h3>Top Trending products</h3>
      </div>
      <div className="row itemList2">
        {data.map((item) => (
          <div key={item._id.$oid} className="col-md-4">
            <img
              id={item._id.$oid}
              onClick={() => clickHandler(item)}
              src={item.img1}
              alt=""
            />
            <p>{item.name}</p>
            <b>{formatPrice(item.price)} VND</b>
          </div>
        ))}
      </div>
      {showPopup && <Popup dataList={dataPopup[0]} />}
    </div>
  );
};

export default ListProducts;
