import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  stateData,
  stateFormatPrice,
  stateCategoryShopPage,
} from "../../redux/selector";
import "./ShowProductShop.css";

const ShowProductShop = () => {
  //lay data
  const data = useSelector(stateData);
  //console.log(data);
  //lay category
  const category = useSelector(stateCategoryShopPage);
  //console.log(category);
  //lay formatPrice
  const formatPrice = useSelector(stateFormatPrice);

  return (
    <div>
      <div className="inputShowShop">
        <input type="text" placeholder="Enter search here!" />
        <div className="">
          <select>
            <option>Default Sorting</option>
            <option>Sort By Name</option>
          </select>
        </div>
      </div>
      {data
        .filter((item) =>
          category === "All" ? item : item.category === category
        )
        .map((item, index) => (
          <div key={index} className="itemShowShop">
            <Link to={`/detail/${item._id.$oid}`}>
              <img src={item.img1} id={item._id.$oid} alt="" />
            </Link>
            <h3>{item.name}</h3>
            <p>{formatPrice(item.price)} VND</p>
          </div>
        ))}
    </div>
  );
};

export default ShowProductShop;
