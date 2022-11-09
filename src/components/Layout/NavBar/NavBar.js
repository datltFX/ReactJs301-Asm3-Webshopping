import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTolocalStorage,
  removeTolocalStorage,
} from "../../../data/localstorage";
import { ON_LOGOUT } from "../../../redux/action";

const NavBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const dataUser = getTolocalStorage("currentUserActive");
    dataUser === null ? setName("") : setName(dataUser.name);
  }, []);

  const logoutHanler = () => {
    //truyen action
    dispatch(ON_LOGOUT({ email: "", password: "" }));
    setName("");
    removeTolocalStorage("currentUserActive");
  };
  return (
    <div className="navBar">
      <nav className="row">
        <div className="col-md-4">
          <Link className="homeLink" to="/">
            Home
          </Link>
          <Link className="pagesLink" to="/shop">
            Shop
          </Link>
        </div>
        <div className=" col-md-4 boutique">Boutique</div>
        <div className="col-md-4">
          <Link className="pagesLink" to="/cart">
            <FontAwesomeIcon icon={faCartArrowDown} /> Cart
          </Link>
          {name === "" ? (
            <Link className="pagesLink" to="/login">
              <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          ) : (
            <Link className="pagesLink" to="">
              <FontAwesomeIcon icon={faUser} />
              <span onClick={logoutHanler}>{" " + name + " (Logout)"}</span>
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
