import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Seat } from "./components/Seat";

function App() {
  const [selectedSeats, setSelectedSeatCount] = useState([]);
  const handleSelect = (e) => {
    if (selectedSeats.includes(e.toString())) {
      let newSeats = [...selectedSeats];
      newSeats.splice(newSeats.indexOf(e.toString()));
      setSelectedSeatCount(newSeats);
    } else setSelectedSeatCount([...selectedSeats, e]);
  };
  const handleSubmit = () => {
    // console.log(selectedSeats);
  };
  return (
    <div className="app">
      <p>Number of seats selected: {selectedSeats.length}</p>
      <div>
        <Seat handleSelect={handleSelect} seatNumber={1} />
        <Seat handleSelect={handleSelect} seatNumber={2} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
