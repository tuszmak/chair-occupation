import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Seat } from "./components/Seat";

function App() {
  const [selectedSeats, setSelectedSeatCount] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [seats, setSeats] = useState([]);
  const [startBooking, setStartBooking] = useState(new Date("1970 "))
  const handleFetch = async () => {
    let response = await fetch("http://localhost:3000");
    const responseSeats = await response.json();
    console.log(responseSeats);
    setSeats(responseSeats);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const handleSelect = (e) => {
    if (selectedSeats.includes(e.toString())) {
      let newSeats = [...selectedSeats];
      newSeats.splice(newSeats.indexOf(e.toString()));
      setSelectedSeatCount(newSeats);
    } else setSelectedSeatCount([...selectedSeats, e]);
  };
  const handleSubmit = async () => {
    const selectSeats = JSON.stringify(selectedSeats);
    let response = await fetch("http://localhost:3000", {
      body: selectSeats,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 202) {
      setIsPaying(true);
      setStartBooking(Date.now())
    }
  };
  const handleEmail = async (e) => {
    const seatsWithEmail = {
      seats: selectedSeats,
      email: e.target[0].value,
    };
    const paymentDate = Date.now();
    const diffBetweenDatesInMinutes = (paymentDate - startBooking)/(1000*60)
    console.log(diffBetweenDatesInMinutes);
    e.preventDefault()
    if(diffBetweenDatesInMinutes>2){
      alert("You took too long :C")
    }
    await fetch("http://localhost:3000/email", {
      body: JSON.stringify(seatsWithEmail),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

  };
  return isPaying ? (
    <div>
      <form action="" onSubmit={(e) => handleEmail(e)}>
        <label htmlFor="email">Enter your email!</label>
        <input type="email" name="email" id="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : (
    <div className="app">
      <p>Number of seats selected: {selectedSeats.length}</p>
      <div>
        {seats.map((seat, i) => {
          switch (seat.status_id) {
            case 1:
              return (
                <Seat
                  handleSelect={handleSelect}
                  seatNumber={seat.seat_number}
                  className="freeSeat"
                  key={seat.seat_number}
                />
              );
            case 2:
              return (
                <Seat
                  handleSelect={handleSelect}
                  seatNumber={seat.seat_number}
                  className="selectedSeat"
                  key={seat.seat_number}
                />
              );
            case 3:
              return (
                <Seat
                  handleSelect={handleSelect}
                  seatNumber={seat.seat_number}
                  className="bookedSeat"
                  key={seat.seat_number}
                />
              );
          }
        })}
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
