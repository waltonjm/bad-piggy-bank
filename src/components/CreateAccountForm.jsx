import React from "react";
import { Card } from "./Card";
import { useUser } from "./UserProvider";
import { signup } from "../firebase";
import { useNavigate } from "react-router-dom";

export const CreateAccountForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [inputError, setInputError] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    try {
      const user = await signup(email, password, name);
      if (user.error) {
        setInputError(user.error);
      } else {
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (e) => setEmail(e.currentTarget.value);
  const handleName = (e) => setName(e.currentTarget.value);
  const handlePassword = (e) => setPassword(e.currentTarget.value);

  return (
    <div className="bg-purple p-4 roundedd-flex justify-content-between rounded-top gap-4">
      <Card
        bgcolor="primary"
        header="Create Account"
        status={inputError}
        body={
          <form onSubmit={handleSubmit}>
            Name
            <br />
            <input
              required
              type="input"
              autoComplete="name"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={handleName}
            />
            <br />
            Email address
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        }
      />
    </div>
  );
};
