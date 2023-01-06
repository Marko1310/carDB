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
  });

  // state for holding filter parameters
  const [filterParameters, setFilterParameters] = useState({
    makeFilter: "",
    modelFilter: "",
    yearFilter: "",
  });

  const [render, setRender] = useState(false);

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

  // Filter the models that equal to selected make
  const filterModels = function (e) {
    setRender(false);
    const filteredCarsByMake = cars.filter(
      (el) => el.Make.toLowerCase() === e.target.value
    );
    const filteredModels = [
      ...new Set(filteredCarsByMake.map((obj) => obj.Model)),
    ];
    setParameters((prevParameters) => {
      return {
        ...prevParameters,
        model: filteredModels,
      };
    });

    setFilterParameters((prevParameters) => {
      return {
        ...prevParameters,
        makeFilter: e.target.value,
      };
    });
  };

  // Filter years that equal to selected make and model
  const filterYears = function (e) {
    setRender(false);
    const filteredCarsByYear = cars.filter(
      (el) => el.Model.toLowerCase() === e.target.value
    );
    const filteredyears = [
      ...new Set(filteredCarsByYear.map((obj) => obj.Year)),
    ];
    setParameters((prevParameters) => {
      return {
        ...prevParameters,
        year: filteredyears,
      };
    });
    setFilterParameters((prevParameters) => {
      return {
        ...prevParameters,
        modelFilter: e.target.value,
      };
    });
  };

  // Update the filtered year
  const changeYearFilter = function (event) {
    setFilterParameters((prevParameters) => {
      return {
        ...prevParameters,
        yearFilter: event.target.value,
      };
    });
  };

  const renderCar = function (e) {
    e.preventDefault();
    setRender(true);
  };

  const filter = cars.filter(
    (el) =>
      el.Make.toLowerCase() === filterParameters.makeFilter &&
      (filterParameters.modelFilter !== ""
        ? el.Model.toLowerCase() === filterParameters.modelFilter
        : true) &&
      (filterParameters.yearFilter !== ""
        ? el.Year === +filterParameters.yearFilter
        : true)
  );

  console.log(filterParameters);

  return (
    <div className="main__container">
      <Sidebar
        renderCar={renderCar}
        filterModels={filterModels}
        filterYears={filterYears}
        changeYearFilter={changeYearFilter}
        parameters={parameters}
      />
      <Cars filter={filter} render={render} />
    </div>
  );
}

export default App;
