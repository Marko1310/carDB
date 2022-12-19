import { useState, useEffect } from "react";

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
        const allMakes = [...new Set(data.results.flatMap((obj) => obj.Make))];
        // const allModels = [
        //   ...new Set(data.results.flatMap((obj) => obj.Model)),
        // ];
        // const allYears = [...new Set(data.results.flatMap((obj) => obj.Year))];
        setParameters((prevParameters) => {
          return { ...prevParameters, make: allMakes };
        });

        // Napomena: mogu se napuniti i arrayevi od modela i godina ali onda na pocetku stranice ima neogranicen izbor modela, zato su arrayaevi prazni
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

  return (
    <div className="main__container">
      <div className="sidebar--container">
        <form onSubmit={renderCar}>
          <label for="cars">Choose a car:</label>
          <select
            onChange={(event) => filterModels(event)}
            name="cars"
            id="cars"
            form="carform"
          >
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            {/* map through all cars and show the list */}
            {parameters.make.map((el) => {
              return <option value={el.toLowerCase()}>{el}</option>;
            })}
          </select>
          <br></br>

          <label for="model">Choose a model:</label>
          <select
            onChange={(event) => filterYears(event)}
            name="model"
            id="model"
            form="modelform"
          >
            <option value="none" selected disabled hidden>
              Select model{" "}
            </option>
            {/* map through all makes and show the list of models*/}
            {parameters.model.map((el) => {
              return <option value={el.toLowerCase()}>{el}</option>;
            })}
          </select>
          <br></br>

          <label for="year">Choose a year:</label>
          <select
            onChange={(event) =>
              setParameters((prevParameters) => {
                return {
                  ...prevParameters,
                  yearFilter: event.target.value,
                };
              })
            }
            name="year"
            id="year"
            form="yearform"
          >
            <option value="none" selected disabled hidden>
              Select year{" "}
            </option>
            {/* map through all models and show the list of years*/}
            {parameters.year.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
          <br></br>

          <input type="submit" name="SUBMITBUTTON" value="Submit" />
        </form>
      </div>
      {render && (
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
      )}
    </div>
  );
}

export default App;
