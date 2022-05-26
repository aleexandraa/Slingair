
import React from "react";
import Plane from "./Plane";
import Form from "./Form";
import FlightSelect from "./FlightSelect";
import styled from "styled-components";
const SeatSelect = ({ }) => {
  return (
    <>
      <FlightSelect />
      <h2>Select your seat and Provide your information!</h2>
      <Wrapper>
        <Plane />
        <Form />
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
export default SeatSelect;
