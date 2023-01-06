import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Cars from "./components/Cars";

function App() {
  // state for all cars
  const [cars, setCars] = useState([]);

  // import cars state
  useEffect(() => getAllCars(), []);

  // state for parameters
  const [parameters, setParameters] = useState({
    make: [],
    model: [],
    year: [],
    makeFilter: "",
    modelFilter: "",
    yearFilter: "",
  });

  const filter = cars.filter(
    (el) =>
      el.Make.toLowerCase() === parameters.makeFilter &&
      (parameters.modelFilter !== ""
        ? el.Model.toLowerCase() === parameters.modelFilter
        : true) &&
      (parameters.yearFilter !== "" ? el.Year === +parameters.yearFilter : true)
  );

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
        setCars(data.results);

        // extract each propertie from array of objects -> create new set to eliminate duplicates -> return back to an array of filtered properties
        const allMakes = [...new Set(data.results.map((obj) => obj.Make))];

        setParameters((prevParameters) => {
          return { ...prevParameters, make: allMakes };
        });
      });
  };

  const filterModels = function (e) {
    setRender(false);
    const filteredCarsByMake = cars.filter(
      (el) => el.Make.toLowerCase() === e.target.value
    );
    const filteredModels = [
      ...new Set(filteredCarsByMake.flatMap((obj) => obj.Model)),
    ];
    setParameters((prevParameters) => {
      return {
        ...prevParameters,
        model: filteredModels,
        makeFilter: e.target.value,
      };
    });
  };

  const filterYears = function (e) {
    setRender(false);
    const filteredCarsByYear = cars.filter(
      (el) => el.Model.toLowerCase() === e.target.value
    );
    const filteredyears = [
      ...new Set(filteredCarsByYear.flatMap((obj) => obj.Year)),
    ];
    setParameters((prevParameters) => {
      return {
        ...prevParameters,
        year: filteredyears,
        modelFilter: e.target.value,
      };
    });
  };

  const [render, setRender] = useState(false);

  const renderCar = function (e) {
    e.preventDefault();
    setRender(true);
  };

  const changeParameters = function (event) {
    setParameters((prevParameters) => {
      return {
        ...prevParameters,
        yearFilter: event.target.value,
      };
    });
  };

  return (
    <div className="main__container">
      <Sidebar
        renderCar={renderCar}
        filterModels={filterModels}
        filterYears={filterYears}
        changeParameters={changeParameters}
        parameters={parameters}
      />
      <Cars filter={filter} render={render} />
    </div>
  );
}

export default App;
