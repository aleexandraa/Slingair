import React, { useContext } from "react";
import styled from "styled-components";

import { BookingContext } from "./BookingContext";

const Reservation = () => {
    const { reservations } = useContext(BookingContext);

    return (
        <div>
            <Wrapper>
                {Object.keys(reservations).length > 0 ?
                    <BookingDiv>
                        <Title>Your reservation!</Title>
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
        </div>
    );
};

const Wrapper = styled.div`
display: block;
  overflow: auto;
  margin: auto auto 24px;
  margin-top: 10px;
  font-family: var(--font-body);
`;

const BookingDiv = styled.div`
border: solid;
  border-width: 3px;
  border-color: var(--color-alabama-crimson);
  border-radius: 10px;
  height: 250px;
  width: 450px;
  margin-bottom: 10px;
  font-size: 20px;
  padding-left: 50px;
  padding-top: 20px;
`;


const Title = styled.p`
font-family: var(--font-body);
font-size: 24px;
border-bottom: 3px solid var(--color-alabama-crimson);
padding: 12px;
font-weight: bolder;
`;

const Details = styled.p`
display: flex;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const Res = styled.div`
margin-top: 10px;
font-size: 16px;
 `;
export default Reservation;

