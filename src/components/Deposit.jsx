import React from "react";
import { DepositForm } from "./DepositForm";
import { WithdrawalForm } from "./WithdrawalForm";
import { MyCard } from "./MyCard";

import { Card } from "react-bootstrap";
export const Deposit = () => {
  const [isDeposit, setIsDeposit] = React.useState(true);

  const handleModeSelect = (e) => {
    setIsDeposit(e.target.value === "deposit");
  };

  return (
    <div className="bg-purple p-4 rounded-flex justify-content-between rounded-top gap-4 d-flex">
      <div>
        <Card style={{ minWidth: "18rem", width: "18rem" }}>
          <Card.Body>
            <Card.Title>Deposit Money</Card.Title>
            <Card.Subtitle className="mb-2 text-dark">
              Save money for college!
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <MyCard />
      </div>
      <div className="flex-grow-1">
        <h5>Deposit or Withdraw</h5>
        <label className="form-label" htmlFor="actionType">
          Click in the box below to select deposit or withdraw
        </label>
        <select
          name="actionType"
          className="form-control mb-4"
          onChange={handleModeSelect}
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        {isDeposit ? <DepositForm /> : <WithdrawalForm />}
      </div>
    </div>
  );
};
