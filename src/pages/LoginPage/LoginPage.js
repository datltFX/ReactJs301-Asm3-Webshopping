import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTolocalStorage, saveToLocalStorage } from "../../data/localstorage";
import { ON_LOGIN } from "../../redux/action";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //luu tru thong tin khai bao
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  //lay data tu localStorage

  const userArr =
    getTolocalStorage("users") === null ? [] : getTolocalStorage("users");

  //xac thuc thong tin
  const validateForm = () => {
    //kiem tra thong tin dien vao
    if (isEmail === "" || isPassword === "") {
      alert("vui long nhap day du thong tin");
      return false;
    }
    //kiem tra password
    if (isPassword.length < 8) {
      alert("password bat buoc phai 8 ki tu tro len");
      return false;
    }
    return true;
  };

  //xu ly lay cac gia tri nhap input
  const inputChangeHandler = (e) => {
    if (e.target.id === "email") {
      setIsEmail(e.target.value);
    } else if (e.target.id === "password") {
      setIsPassword(e.target.value);
    }
  };
  //submit
  const submitHandler = (e) => {
    // console.log(e);
    e.preventDefault();
    if (validateForm()) {
      //tìm kiếm thông tin đăng nhập CurrentUser trong UserAray
      const currentUser = userArr.find(
        (user) => user.email === isEmail && user.password === isPassword
      );

      if (currentUser) {
        alert("Login Success!");
        //console.log(currentUser);
        //luu LocalStorage
        saveToLocalStorage("currentUserActive", currentUser);
        //truyen action
        dispatch(ON_LOGIN({ isEmail, isPassword }));
        navigate("/");
      } else {
        alert("User doesn't exist or wrong information ");
        setIsPassword("");
      }
    }
    //truyen action
    dispatch();
  };

  return (
    <div className="wapperLogin">
      <form onSubmit={submitHandler}>
        <div className="formLogin">
          <h4>Sign In</h4>
          <div>
            <input
              id="email"
              type="text"
              value={isEmail}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
            <input
              style={{ borderTop: "none" }}
              id="password"
              type="text"
              value={isPassword}
              onChange={inputChangeHandler}
              placeholder="Password"
            />
          </div>
          <button type="submit">SIGN IN</button>
          <div className="formLoginClick">
            <span>Create an acount? </span>
            <Link className="formLoginLink" to={"/register"}>
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
