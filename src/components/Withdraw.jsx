import React from "react";
import { WithdrawalForm } from "./WithdrawalForm";
import { MyCard } from "./MyCard";

export const Withdraw = () => {
  return (
    <div className="d-flex justify-content-between rounded-top gap-4">
      
      <MyCard />
      <div className="bg-purple p-4 rounded-flex justify-content-between rounded-top gap-4">
      <div className="p-6 rounded">
        <div className='bg-purple p-4'>
          <h3> Take Your Money Out at Any Time</h3>
          <p>
            After you have saved enough money to buy or pay for something you
            need or want, you can take your money out! We have goal forms for
            you to use at home so you can identify items you need or want, the
            amount, and the date you would like to purchase it.{" "}
          </p>
        </div>
        <WithdrawalForm />
      </div>
    </div>
    </div>
  );
};


