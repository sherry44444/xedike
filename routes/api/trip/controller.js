const { Trip } = require("../../../models/Trip");
const mongoose = require("mongoose");

module.exports.createTrip = (req, res, next) => {
  const driverId = req.user.id;
  // duoc lay tu token sau khi authorize
  const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;

  const newTrip = new Trip({
    driverId,
    locationFrom,
    locationTo,
    startTime,
    availableSeats,
    fee
  });
  newTrip
    .save()
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};

module.exports.getTrips = (req, res, next) => {
  Trip.find()
    .then(trips => res.status(200).json(trips))
    .catch(err => res.json(err));
};

module.exports.getTripById = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .populate("driverId", "email phone")
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};

module.exports.updateTripById = (req, res, next) => {
  const { id } = req.params;
  const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;

  Trip.findById(id)
    .then(trip => {
      (trip.locationFrom = locationFrom),
        (trip.locationTo = locationTo),
        (trip.startTime = startTime),
        (trip.availableSeats = availableSeats),
        (trip.fee = fee);
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};

module.exports.deleteTrip = (req, res, next) => {
  const { tripId } = req.params;
  Trip.deleteOne({ _id: tripId })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err));
};

module.exports.bookTrip = (req, res, next) => {
  // const passengerId = req.user.id; day moi lay passenger Id dung nha ve coi lai cai token de lay passengerId
  const { passengerId } = req.body;
  const { numberOfBookingSeats } = req.body;
  const { tripId } = req.params;
  console.log(params);
  Trip.findById(tripId)
    .then(trip => {
      if (trip.availableSeats < numberOfBookingSeats)
        return Promise({ status: 400, message: "not enough seats" });
      const passenger = {
        passengerId,
        numberOfBookingSeats
      };
      trip.passengers.push(passenger);
      trip.availableSeats = trip.availableSeats - numberOfBookingSeats;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json(err.message);
    });
};

module.exports.finishTrip = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Trip.findById(id)
    .then(trip => {
      trip.isFinished = true;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};
