import React from "react";
import { UsersTable } from "./UsersTable";
import { MyCard } from "./MyCard";

export const AllData = () => (
  <>
    <h5>All Data</h5>
    <div className="bg-purple d-flex justify-content-between rounded-top gap-4">
      <MyCard />
      <div className="flex-grow-1">
        <UsersTable />
      </div>
    </div>
  </>
);

//   <div className="bg-purple p-4 rounded-flex justify-content-between rounded-top gap-4">