import React, { useContext } from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";
import { BookingContext } from "./BookingContext";

const Confirmation = () => {
  const { reservations } = useContext(BookingContext);
  console.log(reservations);
  return (
    <div>
      <Wrapper>
        {Object.keys(reservations).length > 0 ?
          <BookingDiv>
            <Title>Your flight is confirmed!</Title>
            <Details>
              <b>Reservation #:</b>
              <Res>{reservations._id}</Res>
            </Details>
            <Details>
              <b>Flight #:</b>{reservations.flight}
            </Details>
            <Details>
              <b>Seat #:</b> {reservations.seat}
            </Details>
            <Details>
              <b>Name:</b> {reservations.firstName} {reservations.secondName}
            </Details>
            <Details>
              <b>Email:</b> {reservations.email}
            </Details>
          </BookingDiv>

          : <div>No reservations
          </div>}
      </Wrapper>
      <Img>
        <StyledImg src={tombstone} alt="image" />
      </Img>
    </div>
  );
};

const Wrapper = styled.div`
width: 100vw;
`;

const BookingDiv = styled.div`
display: flex;
flex-direction: column;
padding: 25px;
margin-top: 50px;
margin: auto;
width: 40%;
padding: 10px;
`;

const StyledImg = styled.img`
width: 200px;
`;

const Img = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`;

const Title = styled.p`
font-family: var(--font-body);
font-size: 24px;
border-bottom: 3px solid var(--color-alabama-crimson);
padding: 12px;
font-weight: bolder;
`;

const Details = styled.p`
font-family: var(--font-body);
font-size: 18px;
padding: 12px;
`;

const Res = styled.div`
margin-top: 10px;
font-size: 16px;
 `;
export default Confirmation;
