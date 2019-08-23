const express = require("express");

const router = express.Router();
const tripController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");

// const authenticate = (req, res, next) => {
//   const { jsonwebtoken } = req.headers;
//   jwt.veryfy(jsonwebtoken, "DIKEXE", (err, decoded) => {
//     if (err) return res.status(401).json({ message: "token invalid" });
//     if (decoded) return next();
//   });
// const {authenticate, authorize} = require()
// const{uploadImage} = require()

router.post(
  "/",
  authenticate,
  authorize(["driver"]),
  tripController.createTrip
);
router.get("/", tripController.getTrips);
router.get("/:tripId", tripController.getTripById);
router.delete(
  "/:tripId",
  authenticate,
  authorize(["driver", "admin"]),
  tripController.deleteTrip
);
router.put(
  "/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.updateTripById
);
router.put(
  "/book-trip/:tripId",
  authenticate,
  authorize(["passenger"]),
  tripController.bookTrip
);
router.put(
  "/finish-trip/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.finishTrip
);

module.exports = router;
