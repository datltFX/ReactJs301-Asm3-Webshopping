import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTolocalStorage, saveToLocalStorage } from "../../data/localstorage";
import "./RegisterPage.css";

const RegisterPage = () => {
  let navigate = useNavigate();
  //luu tru thong tin khai bao
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isPhone, setIsPhone] = useState("");

  //lay data tu localStorage
  const userArr =
    getTolocalStorage("users") === null ? [] : getTolocalStorage("users");

  //xac thuc thong tin
  const validateForm = () => {
    //kiem tra trung email khong
    const checkEmail = () => {
      if (userArr.length === 0) {
        return false;
      } else {
        const duplicate = userArr.filter((arr) => arr.email === isEmail);
        if (duplicate.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    };
    //kiem tra thong tin dien vao
    if (
      isName === "" ||
      isEmail === "" ||
      isPassword === "" ||
      isPhone === ""
    ) {
      alert("vui long nhap day du thong tin");
      return false;
    }
    //kiem tra password
    if (isPassword.length < 8) {
      alert("password bat buoc phai 8 ki tu tro len");
      return false;
    }
    if (checkEmail()) {
      alert("trung email!!");
      return false;
    }
    return true;
  };

  //xu ly lay cac gia tri nhap input
  const inputChangeHandler = (e) => {
    if (e.target.id === "name") {
      setIsName(e.target.value);
    } else if (e.target.id === "email") {
      setIsEmail(e.target.value);
    } else if (e.target.id === "password") {
      setIsPassword(e.target.value);
    } else if (e.target.id === "phone") {
      setIsPhone(e.target.value);
    }
  };

  //submit
  const submitHandler = (e) => {
    //  console.log(e);
    e.preventDefault();
    if (validateForm()) {
      const dataUser = {
        name: isName,
        email: isEmail,
        password: isPassword,
        phone: isPhone,
      };
      console.log("dataUser:", dataUser);
      userArr.push(dataUser);
      saveToLocalStorage("users", userArr);
      setIsName("");
      setIsEmail("");
      setIsPassword("");
      setIsPhone("");
      navigate("/login");
    }
  };

  return (
    <div className="wapperRegister">
      <form onSubmit={submitHandler}>
        <div className="formRegister">
          <h4>Sign Up</h4>
          <div>
            <input
              id="name"
              type="text"
              value={isName}
              onChange={inputChangeHandler}
              placeholder="Full Name"
            />
            <input
              style={{ borderTop: "none" }}
              id="email"
              type="text"
              value={isEmail}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
            <input
              style={{ borderTop: "none" }}
              id="password"
              type="password"
              value={isPassword}
              onChange={inputChangeHandler}
              placeholder="Password"
            />
            <input
              style={{ borderTop: "none" }}
              id="phone"
              type="text"
              value={isPhone}
              onChange={inputChangeHandler}
              placeholder="Phone"
            />
          </div>
          <button type="submit">SIGN UP</button>
          <div className="formRegisterClick">
            <span>Login? </span>
            <Link className="formRegisterLink" to={"/login"}>
              Click
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
