import React from "react";
import { useSelector } from "react-redux";
import { stateData, stateFormatPrice } from "../../redux/selector";
import "./RelatedProduct.css";
const RelatedProduct = ({ products }) => {
  const data = useSelector(stateData);
  const formatPrice = useSelector(stateFormatPrice);
  // console.log(products);
  // loc san pham lien quan
  const relateProduct = data.filter((item) => {
    return item.category === products.category && item.name !== products.name;
  });
  return (
    <div>
      {relateProduct.length !== 0 && (
        <div className="related">
          <p className="related_p">RELATED PRODUCTS</p>
          <div className="containerRelated">
            {relateProduct.map((item) => (
              <div className="productRelated" key={item._id.$oid}>
                <img src={item.img1} alt="" />
                <h5 className="productRelated_name">{item.name}</h5>
                <p className="productRelated_price">
                  {formatPrice(item.price)} VND
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
