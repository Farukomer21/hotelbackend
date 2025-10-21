const express = require("express");

// RoomPrice Db Object Rest Api Router
const roomPriceRouter = express.Router();

// add RoomPrice controllers

// createRoomPrice controller
roomPriceRouter.post("/v1/roomprices", require("./create-roomprice-api"));
// getRoomPrice controller
roomPriceRouter.get(
  "/v1/roomprices/:roomPriceId",
  require("./get-roomprice-api"),
);
// updateRoomPrice controller
roomPriceRouter.patch(
  "/v1/roomprices/:roomPriceId",
  require("./update-roomprice-api"),
);
// deleteRoomPrice controller
roomPriceRouter.delete(
  "/v1/roomprices/:roomPriceId",
  require("./delete-roomprice-api"),
);
// listRoomPrices controller
roomPriceRouter.get("/v1/roomprices", require("./list-roomprices-api"));

module.exports = roomPriceRouter;
