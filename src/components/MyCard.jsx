import React from "react";
import { useUser } from "./UserProvider";
import { Card } from "react-bootstrap";

export const MyCard = () => {
  const { me } = useUser();
  const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(me.balance);
  return (
    <Card style={{ minWidth: "18rem", width: "18rem" }}>
      <Card.Body>
        <Card.Title>Name: {me.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-dark">
          Email: {me.email}
        </Card.Subtitle>
        <Card.Text>Balance: {balance}</Card.Text>
      </Card.Body>
    </Card>
  );
};
