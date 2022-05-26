import React, { useState } from "react";

export const BookingContext = React.createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    flightNum: null,
    seat: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  const [reservations, setReservations] = useState({})
  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingDetails,
        reservations,
        setReservations
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
