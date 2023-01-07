import React from "react";

const Sidebar = ({
  renderCar,
  filterModels,
  filterYears,
  changeYearFilter,
  parameters,
}) => {
  return (
    <div className="sidebar--container">
      <form className="form--container" onSubmit={renderCar}>
        <label for="cars">Make:</label>
        <select
          onChange={(event) => filterModels(event)}
          name="cars"
          id="cars"
          form="carform"
        >
          <option value="none" selected disabled hidden>
            Select Make
          </option>
          {/* map through all cars and show the list */}
          {parameters.make.map((el) => {
            return <option value={el.toLowerCase()}>{el}</option>;
          })}
        </select>
        <br></br>

        <label for="model">Model:</label>
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

        <label for="year">Year:</label>
        <select
          onChange={(event) => changeYearFilter(event)}
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
  );
};

export default Sidebar;
