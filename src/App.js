import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();

  async function handleSubmit() {
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setPassword("");
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      {data && data.length ? (
        <div className="welcome">{`${data[0].name}, добро пожаловать!`}</div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <h3 className="form__title">Login</h3>
          <div className="form__email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {data && !data.length && (
            <div className="form__warning">Неверный логин или пароль</div>
          )}
          <button type="submit" className="form__btn">
            Sing in
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
