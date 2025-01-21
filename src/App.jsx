import React, { useState } from "react";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [clickCounts, setClickCounts] = useState({
    "Advocate Sharma": 0,
    "Advocate Singh": 0,
    "Advocate Patel": 0,
    "Advocate Kumar": 0,
    "Advocate Gupta": 0,
    "Advocate Jain": 0,
  });
  const [selectedAdvocate, setSelectedAdvocate] = useState("");


  const advocates = {
    "Advocate Sharma": {
      specialties: ["Divorce Lawyer", "Criminal Lawyer"],
      cost: 150,
    },
    "Advocate Singh": {
      specialties: ["Property Dispute Lawyer", "Family Lawyer"],
      cost: 200,
    },
    "Advocate Patel": {
      specialties: ["Corporate Lawyer", "Criminal Lawyer"],
      cost: 250,
    },
    "Advocate Kumar": {
      specialties: ["Civil Lawyer", "Family Lawyer"],
      cost: 180,
    },
    "Advocate Gupta": {
      specialties: ["Labor Lawyer", "Criminal Lawyer"],
      cost: 220,
    },
    "Advocate Jain": {
      specialties: ["Immigration Lawyer", "Divorce Lawyer"],
      cost: 190,
    },
  };

  const handleBookAppointment = (advocateName, time) => {
    const currentCount = clickCounts[advocateName];
    if (currentCount < 8 && !isTimeBooked(advocateName, time)) {
      setClickCounts({ ...clickCounts, [advocateName]: currentCount + 1 });
      setAppointments([
        ...appointments,
        { advocateName, time, cost: advocates[advocateName].cost },
      ]);
      alert("Booking Done!");
    } else if (currentCount >= 8) {
      alert("Not Possible. Appointment slots for this advocate are full.");
    } else {
      alert("This time slot is already booked.");
    }
  };

  const isTimeBooked = (advocateName, time) => {
    return appointments.some(
      (appointment) =>
        appointment.advocateName === advocateName && appointment.time === time
    );
  };

  const handleAdvocateChange = (event) => {
    setSelectedAdvocate(event.target.value);
  };

  const getTimeOptions = () => {
    const timeSlots = [];
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} AM`;
        timeSlots.push(time);
      }
    }
    return timeSlots;
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Lawyer Appointment Management Application</h1>
      </div>

      <div className="card-container">
        {Object.entries(clickCounts).map(([advocateName, count]) => (
          <div
            className={`card ${count === 8 ? "full" : ""}`}
            key={advocateName}
          >
            <h3>{advocateName}</h3>
            <p>Appointments Left: {8 - count}</p>
            <p>Cost per Appointment: ₹{advocates[advocateName].cost}</p>
            <p>Specialties: {advocates[advocateName].specialties.join(", ")}</p>
            <select id={`${advocateName}-select`} disabled={count >= 8}>
              <option value="" disabled={count >= 8}>
                Select Time
              </option>
              {getTimeOptions().map((time) => (
                <option
                  key={time}
                  value={time}
                  disabled={isTimeBooked(advocateName, time)}
                >
                  {time}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                handleBookAppointment(
                  advocateName,
                  document.getElementById(`${advocateName}-select`).value
                )
              }
              disabled={count >= 8}
            >
              {count >= 8 ? "Booked Out" : "Book Appointment"}
            </button>
          </div>
        ))}
      </div>


      <h2>Booked Appointments:</h2>
      <div>
        <label htmlFor="advocateSelect">Select Advocate:</label>
        <select
          id="advocateSelect"
          value={selectedAdvocate}
          onChange={handleAdvocateChange}
        >
          <option value="">All Advocates</option>
          <option value="Advocate Sharma">Advocate Sharma</option>
          <option value="Advocate Singh">Advocate Singh</option>
          <option value="Advocate Patel">Advocate Patel</option>
          <option value="Advocate Kumar">Advocate Kumar</option>
          <option value="Advocate Gupta">Advocate Gupta</option>
          <option value="Advocate Jain">Advocate Jain</option>
        </select>
      </div>

      <ul>
        {appointments
          .filter(
            (appointment) =>
              selectedAdvocate === "" ||
              appointment.advocateName === selectedAdvocate
          )
          .map((appointment, index) => (
            <li key={index}>
              {appointment.advocateName} at {appointment.time} - Cost: ₹{appointment.cost}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
