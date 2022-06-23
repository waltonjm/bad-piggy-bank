import React from "react";
import { useUser } from "./UserProvider";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const DepositForm = () => {
  const { me, setBalance } = useUser();
  const name = "deposit";
  const [inputError, setInputError] = React.useState("");
  const [formTouched, setFormTouched] = React.useState(false);
  const [depositAmount, setDepositAmount] = React.useState("");
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
      setInputError(`${name} can't be 0`); // Can't deposit 0 dollars - Convert react state string to number
      isValid = false;
    }
    return isValid;
  };

  const resetForm = () => {
    setInputError("");
    setFormTouched(false);
    setDepositAmount("");
  };

  const handleSubmit = async (event) => {
    // Should update account after deposit and show success message
    event.preventDefault();
    // if deposit is valid - submit
    if (isFormValid(depositAmount)) {
      const balance = me.balance + Number(depositAmount);
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
  const handleDepositAmount = (e) => {
    if (!formTouched) setFormTouched(true);
    const depositValue = e.currentTarget.value;
    setDepositAmount(depositValue);
    isFormValid(depositValue);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label htmlFor={name} className="form-label">
        Deposit Money
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
        value={depositAmount}
        onChange={handleDepositAmount}
      />
      {inputError && <div className="invalid-feedback">{inputError}</div>}
      <br />
      {/* Must disable button if no value */}
      <button disabled={inputError || loading} type="submit" className="btn btn-light">
        {loading ? "depositing..." : `Submit ${name}`}
      </button>
    </form>
  );
};
