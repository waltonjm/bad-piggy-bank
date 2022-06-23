import React from "react";
import landmarkImage from "../assets/landmark-solid.png";
import kidsImage from "../assets/kids-going-to-bank-shutterstock.png";
import { Card } from "react-bootstrap";

export const Home = () => {
  return (
    // Bootstrap card
    <div className="d-flex justify-content-between rounded-top gap-4">
      <Card style={{ minWidth: "18rem", width: "18rem" }}>
        <Card.Img className="p-3" variant="top" src={landmarkImage} />
        <Card.Body>
          <Card.Title>WELCOME TO PIGGY BANK</Card.Title>
          <Card.Subtitle className="mb-2 text-dark">
            The on-line financial management playground just for kids.
          </Card.Subtitle>
          <Card.Text>
                    
          Create an account to use the banking features.
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="bg-purple p-4 rounded">
        <div>
          <h1> Piggy Bank </h1>
          <p>
            Piggy Bank is an organization dedicated to providing children of all
            ages the tools necessary to prepare them for financial independence.
            Piggy Bank --just like a real piggy bank is built with no security
            and is designed to be a finanical playground.
          </p>
          <h3> Who We Are</h3>
          <p>
            We are not a financial institution. Piggy Bank is a free web-based
            playground where children can learn how to manage their money under
            their parents oversight.
          </p>

          <h5>Parents</h5>
          <p>
            Will be able to:
            <li>
              view status of assigned chores on a daily, weekly or monthly basis
            </li>
            <li>
              send play money directly to the child's account to "pay" for
              chores completed
            </li>
          </p>
          <img
            style={{ float: "right", marginRight: "5px", width: "50%" }}
            src={kidsImage}
            className="card-img-right"
            alt="kids walking to bank to deposit money"
          />
          <h5>Children</h5>
          <p>
            Will learn how to:
            <li>create an on-line account</li>
            <li>deposit money</li>
            <li>withdraw money</li>
            <li>check their balance</li>
            <li>login and logout of their account</li>
          </p>
        </div>
      </div>
    </div>
  );
};
