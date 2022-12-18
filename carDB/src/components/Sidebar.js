const Sidebar = ({ setCarModel }) => {
  return (
    <div className="sidebar--container">
      <label for="cars">Choose a car:</label>
      <select
        onChange={(event) => setCarModel(event.target.value)}
        name="cars"
        id="cars"
        form="carform"
      >
        <option value="none" selected disabled hidden>
          Select an Option
        </option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <label for="year">Choose a year:</label>
      <select name="year" id="year" form="yearform">
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
      </select>
    </div>
  );
};

export default Sidebar;
