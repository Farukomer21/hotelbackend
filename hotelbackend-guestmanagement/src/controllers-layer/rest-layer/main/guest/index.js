const express = require("express");

// Guest Db Object Rest Api Router
const guestRouter = express.Router();

// add Guest controllers

// createGuest controller
guestRouter.post("/v1/guests", require("./create-guest-api"));
// getGuest controller
guestRouter.get("/v1/guests/:guestId", require("./get-guest-api"));
// updateGuest controller
guestRouter.patch("/v1/guests/:guestId", require("./update-guest-api"));
// deleteGuest controller
guestRouter.delete("/v1/guests/:guestId", require("./delete-guest-api"));
// listGuests controller
guestRouter.get("/v1/guests", require("./list-guests-api"));

module.exports = guestRouter;
