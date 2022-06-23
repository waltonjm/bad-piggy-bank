import React from "react";
import { useUser } from "./UserProvider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const WithdrawalForm = () => {
  const { me, setBalance } = useUser();
  const name = "withdrawal";
  const [inputError, setInputError] = React.useState("");
  const [formTouched, setFormTouched] = React.useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // analysis independent of each other. handle validation can only return true or false
  const isFormValid = (value) => {
    // starts without error
    let isValid = true;
    if (!value) {
      setInputError(`${name} is required`); // Is required
      isValid = false;
    } else if (Number.isNaN(Number(value))) {
      setInputError(`${name} must be a number`); // Must be a number - Convert react state string to a number and validate it's a number
      isValid = false;
    } else if (Number(value) < 0) {
      setInputError(`${name} must be a positive number`); // Can't be negative number - Convert react state string to number
      isValid = false;
    } else if (Number(value) === 0) {
      setInputError(`${name} can't be 0`); // Can't withdrawal 0 dollars - Convert react state string to number
      isValid = false;
    } else if (Number(value) > me.balance) {
      setInputError(`Insufficient funds`); // Can't withdrawal more money than balance - Conver react state from string to number
      isValid = false;
    }

    return isValid;
  };

  const resetForm = () => {
    setInputError("");
    setFormTouched(false);
    setWithdrawalAmount("");
  };

  const handleSubmit = async (event) => {
    // Should update account after withdrawal and show success message
    event.preventDefault();
    // if withdrawal is valid - submit
    if (isFormValid(withdrawalAmount)) {
      const balance = me.balance - Number(withdrawalAmount);
      try {
        setLoading(true);
        if (!me || !me.id) throw new Error("No user ID");
        await setDoc(doc(db, "user", me.id), {
          balance,
          name: me.name,
          email: me.email,
        });
        setBalance(balance);
        resetForm();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // handles onchange
  const handleWithdrawalAmount = (e) => {
    if (!formTouched) setFormTouched(true);
    const withdrawalValue = e.currentTarget.value;
    setWithdrawalAmount(withdrawalValue);
    isFormValid(withdrawalValue);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label htmlFor={name} className="form-label">
        Withdrawal Money
      </label>
      <input
        required
        // type="number" // need to validate the requirements are met first
        // min={0} // must be type number to work.
        type="input"
        className={`form-control ${
          !formTouched ? "" : inputError ? "is-invalid" : "is-valid"
        }`}
        name={name}
        placeholder={`Enter ${name} amount`}
        value={withdrawalAmount}
        onChange={handleWithdrawalAmount}
      />
      {inputError && <div className="invalid-feedback">{inputError}</div>}
      <br />
      {/* Must disable button if no value */}
      <button
        disabled={inputError || loading}
        type="submit"
        className="btn btn-light"
      >
        {loading ? "withdrawing..." : `Submit ${name}`}
      </button>
    </form>
  );
};
