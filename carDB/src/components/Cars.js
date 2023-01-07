import React from "react";
import CarPhoto from "../images/Car_Card.jpg";

const CarDB = ({ filter, render }) => {
  return (
    <div className="carDB--container">
      {render && (
        <div className="carDB">
          {filter.map((card) => {
            return (
              <ul className="carDB--list--container">
                <div>
                  <img
                    className="carDB--list--image"
                    src={CarPhoto}
                    alt="Italian Trulli"
                  ></img>
                </div>
                <div className="carDB--list--card">
                  <li className="carDB--list--card--title">
                    {card.Make} {card.Model}
                  </li>
                  <li>Car: {card.Make}</li>
                  <li>Model: {card.Model}</li>
                  <li>Year: {card.Year}</li>
                  <li>Category: {card.Category}</li>
                </div>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarDB;
