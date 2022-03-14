import React from 'react';

function Login({ title, textButton, setAuthInfo }) {
 const [user, setUser] = React.useState({
  email: '',
  password: '',
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setUser({
   ...user,
   [name]: value,
  });
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!user.email || !user.password) {
   return;
  }
  setAuthInfo(user);
 };

 return (
  <form className="register" onSubmit={handleSubmit}>
   <h1 className="register__title">{title}</h1>
   <input
    type="email"
    placeholder="Email"
    className="register__input"
    onChange={handleChange}
    value={user.email || ''}
    name="email"
    required
   />
   <input
    type="password"
    placeholder="Пароль"
    className="register__input"
    onChange={handleChange}
    value={user.password || ''}
    name="password"
    required
   />
   <button type="submit" className="register__submit">
    {textButton}
   </button>
  </form>
 );
}

export default Login;
