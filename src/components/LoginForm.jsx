import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";
import { useUser } from "./UserProvider";
import { login } from "../firebase";

export const LoginForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [inputError, setInputError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // to validate the fields. simulate submitting form and set time to illustrate a typical action and return false or true
  function validate(field, label) {
    if (!field) {
      setInputError("Error: " + label);
      setTimeout(() => setInputError(""), 3000);
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    try {
      const user = await login(email, password);
      if (user.error) {
        setInputError(user.error);
      } else {
        setUser(user);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handles onchange
  const handleEmail = (e) => setEmail(e.currentTarget.value);
  const handlePassword = (e) => setPassword(e.currentTarget.value);

  return (
    <div className="bg-purple p-4 roundedd-flex justify-content-between rounded-top gap-4">
      <Card
        bgcolor="primary"
        header="Login"
        status={inputError}
        body={
          <form onSubmit={handleSubmit}>
            Email
            <br />
            <input
              required
              autoComplete="email"
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmail}
            />
            <br />
            Password
            <br />
            <input
              required
              autoComplete="new-password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePassword}
            />
            <br />
            <button disabled={loading} type="submit" className="btn btn-light">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        }
      />
    </div>
  );
};
