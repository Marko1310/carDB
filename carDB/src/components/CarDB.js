import { useEffect, useState } from "react";

const CarDB = ({ carModel }) => {
  // state for cars database
  const [cars, setCars] = useState([]);

  // state for parameters
  const [parameters, setParameters] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
  });

  const model = carModel;

  useEffect(
    () =>
      setParameters((prevParameters) => {
        return { ...prevParameters, model: { model } };
      }),
    [carModel]
  );
  console.log(parameters.model);

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
        return setCars(data.results.flat(2));
      });
  };

  // import cars state
  useEffect(() => getAllCars(), []);
  //   console.log(cars);

  //   function selectModel(carModel) {
  //     console.log(e.target.value);
  //   }

  return <div className="carDB--container"></div>;
};

export default CarDB;
