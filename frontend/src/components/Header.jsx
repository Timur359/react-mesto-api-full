import React from 'react';
import { Route } from 'react-router';
import { Link, Switch } from 'react-router-dom';

function Header({ onLogout, userData }) {
 return (
  <div className="header">
   <div className="header__logo"></div>
   <Switch>
    <Route exact path="/sign-in">
     <Link to="/sign-up" className="header__btn">
      Регистрация
     </Link>
    </Route>
    <Route exact path="/Mesto_React">
     <p className="header__text">{userData}</p>
     <button onClick={onLogout} className="header__btn">
      Выйти
     </button>
    </Route>
    <Route exact path="/sign-up">
     <Link to="/sign-in" className="header__btn">
      Войти
     </Link>
    </Route>
   </Switch>
  </div>
 );
}

export default Header;
