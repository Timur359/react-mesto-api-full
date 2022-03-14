import React from "react";
import { Link } from "react-router-dom";

export default function Register({ title, textButton, setRegisterInfo }) {
  const [registerUser, setRegisterUser] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { ...data } = registerUser;
    setRegisterInfo(data);
  };

  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <h1 className="register__title">{title}</h1>
        <input
          type="email"
          placeholder="Email"
          className="register__input"
          value={registerUser.email || ""}
          onChange={handleChange}
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="register__input"
          value={registerUser.password || ""}
          onChange={handleChange}
          name="password"
          required
        />
        <button type="submit" className="register__submit">
          {textButton}
        </button>
        <p className="register__link">
          Уже зарегестрированы ?{" "}
          <Link
            to="/sign-in"
            style={{ textDecoration: "underline" }}
            className="register__link"
          >
            <span className="register__link">Войти</span>
          </Link>
        </p>
      </form>
    </>
  );
}
