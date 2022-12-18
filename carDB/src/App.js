import { useEffect, useState } from "react";

function App() {
  // state for cars database
  const [cars, setCars] = useState([]);

  // fetch all the cars
  const getAllCars = function () {
    fetch("https://parseapi.back4app.com/classes/Car_Model_List?limit=10000", {
      headers: {
        "X-Parse-Application-Id": "hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z", // This is the fake app's application id
        "X-Parse-Master-Key": "SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW", // This is the fake app's readonly master key
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newArr = data.results.flat(2);
        return setCars(newArr);
      });
  };

  // import cars state
  useEffect(() => getAllCars(), []);
  console.log(cars);

  return <div></div>;
}

export default App;
