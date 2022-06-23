import React from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const UsersTable = () => {
  const [users, setUsers] = React.useState([]);
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const users = [];
        const querySnapshot = await getDocs(collection(db, "user"));
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {(users && (
          <>
            {users.map(({ id, name, balance, email }, i) => (
              <tr key={`${i}-${email}`}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{balanceFormatter.format(balance)}</td>
              </tr>
            ))}
          </>
        )) || (
          <tr>
            <td className="text-center p-4" colSpan={4}>
              No users
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
