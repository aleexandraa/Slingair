import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { BookingContext } from "../BookingContext";

const FlightSelect = () => {
  const [flights, setFlights] = useState({});
  const { setBookingDetails, bookingDetails } = useContext(BookingContext);

  useEffect(() => {
    fetch("/flights")
      .then((res) => res.json())
      .then((json) => {
        setFlights(json.data);
      });
  }, []);
    console.log(bookingDetails)
  return (
    <Wrapper>
      <Title>Flight Number</Title>
      <Select
        defaultValue={"default"}
        name="Select Flight"
        onChange={(e) =>
          setBookingDetails({ ...bookingDetails, flightNum: e.target.value })
        }
      >
        <option value="default" disabled>
          {" "}
          Select a flight
        </option>
        {Object.keys(flights).length > 0 &&
          flights.map((flight) => (
            <option key={flight._id} value={flight._id}>
              {flight._id}
            </option>
          ))}
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: red;
  font-family: var(--font-heading);
  color: white;
  font-size: 32px;
  padding-left: 20px;
  align-content: center;
  display: flex;
  padding-bottom: 10px;
`;

const Title = styled.div`
  margin-top: 10px;
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
  text-align: center;
  margin-left: 20px;
  margin-top: 15px;
`;

export default FlightSelect;