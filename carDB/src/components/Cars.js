import React from "react";

const CarDB = ({ filter, render }) => {
  return (
    render && (
      <div className="carDB--container">
        {filter.map((card) => {
          return (
            <div className="carDB--card">
              <ul className="carDB--list">
                <li>Car: {card.Make}</li>
                <li>Model: {card.Model}</li>
                <li>Year: {card.Year}</li>
                <li>Category: {card.Category}</li>
              </ul>
            </div>
          );
        })}
      </div>
    )
  );
};

export default CarDB;
