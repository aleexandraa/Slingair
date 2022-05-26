const assert = require("assert");
const { MongoClient } = require("mongodb");
const { flights, reservations } = require("./data");

require("dotenv").config();

const { MONGO_URI } =
  process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const batchImportFlights = async () => {
  try {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("Flights");

    await db.collection("SA231").insertMany(flights.SA231);
    await db.collection("Reservations").insertMany(reservations);

    console.log("success");
  } catch (err) {
    console.log(err.message);
  }
};
batchImportFlights();