import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BookingContext } from '../BookingContext';
import { useHistory } from 'react-router-dom';
const Form = () => {
    const { bookingDetails, setBookingDetails, reservations, setReservations } = useContext(BookingContext)
    const [readyToSubmit, isReadyToSubmit] = useState(true);
    let redirect = useHistory()
    const addNewReservation = async () => {
        try {
            const reservation = await fetch("/add-reservations", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingDetails),
            });

            const res = await reservation.json();
            setReservations(res.data)

        } catch (err) {
            return err;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        await addNewReservation()
        redirect.push("/confirmed")
    }


    return (
        <Wrapper>
            <TheForm onSubmit={handleSubmit}>
                <Input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="First Name"
                    onChange={(e) => {
                        setBookingDetails({
                            ...bookingDetails,
                            firstName: e.target.value,
                        });
                    }}
                />
                <Input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    onChange={(e) => {
                        setBookingDetails({
                            ...bookingDetails,
                            lastName: e.target.value,
                        });
                    }}
                />
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setBookingDetails({
                            ...bookingDetails,
                            email: e.target.value,
                        });
                    }}
                />
                {readyToSubmit ? (
                    <Button type="submit">Confirm</Button>
                ) : (
                    <Button type="submit" disabled>
                        Confirm
                    </Button>
                )}
            </TheForm>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  font-size: 16px;
  margin-top: 150px;
`;

const TheForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 25px;
  border: 3px solid var(--color-alabama-crimson);
`;

const Input = styled.input`
  margin-top: 2px;
  margin-bottom: 2px;
`;

const Button = styled.button`
  margin-top: 2px;
  margin-bottom: 2px;
  color: #fff;
  font-family: var(--font-heading);
  font-size: 30px;
  text-align: center;
  background-color: var(--color-alabama-crimson);
  border: none;
  cursor: pointer;
  padding: 5px 0px;
  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }
`;

export default Form;