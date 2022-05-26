"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
//const { flights, reservations } = require("./data");
const assert = require('assert');
const { MongoClient } = require("mongodb");
const {
  MONGO_URI
} = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFlights = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("Flights");
  const result = await db.collection('Flightnumber').find().toArray();

  if (result.length > 0) {
    return res.status(200).json({
      status: 200,
      data: result,
      message: `Successfully retrieved list of flights!`,
    });
  } else {
    return res.status(404).json({
      status: 404,
      message: `Unable to retrieve list of flights.`,
    });
  }
};

const getFlight = async (req, res) => {
  const flight = req.params.flight;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("Flights");
  const result = await db.collection(`${flight}`).find().toArray();

  if (result.length > 0) {
    return res.status(200).json({
      status: 200,
      data: result,
      message: `Your flight ${flight} !`,
    });
  } else {
    return res.status(404).json({
      status: 404,
      data: result,
      message: ` does not exist`,
    });
  }
};


const addReservations = async (req, res) => {
  const booking = req.body;
  const newReservation = {
    _id: uuidv4(),
    flight: booking.flightNum,
    seat: booking.seat,
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,

  };

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("Flights");

  const reservation = await db.collection('Reservations').insertOne(newReservation);
  const query = { id: booking.seat };
  const updatedValues = {
    $set: { isAvailable: false },
  };

  const availability = await db.collection('SA231').updateOne(query, updatedValues);

  if (availability) {
    res
      .status(200)
      .json({ status: 200, message: "Success", data: newReservation });
  } else {
    res.status(400).json({
      status: 400,
      err: "This seat is not available. Please selet another seat.",
    });
  }
};

const getReservations = async (req, res) => {
  try {
    const allReservations = await db.collection('Reservations')
      .find()
      .toArray();

    res
      .status(200)
      .json({ status: 200, message: "Success", data: allReservations });
  } catch (err) {
    res.status(400).json({ status: 400, err: "Something went wrong" });
  }
};

const getSingleReservation = async (req, res) => {
  const { id } = req.params.flight;
  try {
    const reservation = await db.collection('Reservetions')
      .findOne({ id });

    res
      .status(200)
      .json({ status: 200, message: "Success", id, data: reservation });
  } catch (err) {
    res.status(400).json({ status: 400, id, err: "Something went wrong" });
  }
};

const deleteReservation = async (req, res) => {
  const id = req.params.id;
  try {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("Flights");

    const reservation = await db.collection("Reservations")
      .findOne({ _id });

    const result = await db.collection('Reservations').deleteOne({ _id });


    if (result) {
      const query = { id: reservation.seat };

      const availability = await db.collection("SA231")
        .findOne(query);

      // availability.seat.forEach((seat) => {
      //   if (seat.id === reservation.seat) {
      //     seat.isAvailable = true;
      //   }
      // });
      const newValue = {
        $set: {
          isAvailable: true
        }
      };
      await db.collection("SA231")
        .updateOne(query, newValue);

      res
        .status(200)
        .json({ status: 200, message: "Success", id, data: result });
    } else {
      res
        .status(400)
        .json({ status: 400, id, err: "Unable to delete the reservation" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, id, err: "Something went wrong" });
  }
};

const updateReservation = async (req, res) => {
  const id = req.body._id;
  const seat = req.body.seat;
  const flightNum = req.body.flight;

  const db = client.db("Flights");
  const query = { _id };

  try {
    const updateReservation = {
      $set: {
        id: id,
        flightNum: flightNum,
        seat: seat,
      },
    };

    const oldReservation = await db.collection("Reservations")
      .findOne(query);

    await db.collection('SA231')
      .updateOne(query, updateReservation);

    if (updateReservation) {
      const query = { id: flight };

      const availability = await db.collection("SA231")
        .findOne(query);

      const newValue = {
        $set: {
          isAvailable: true
        }
      };

      await db.collection("SA231")
        .updateOne(query, newValue);

      res
        .status(200)
        .json({ status: 200, id, message: "Success", ...updateReservation.$set, });
    } else {
      res
        .status(400)
        .json({ status: 400, id, err: "Unable to update the reservation" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, id, err: "Something went wrong" });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
