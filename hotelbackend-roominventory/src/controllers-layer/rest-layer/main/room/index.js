const express = require("express");

// Room Db Object Rest Api Router
const roomRouter = express.Router();

// add Room controllers

// createRoom controller
roomRouter.post("/v1/rooms", require("./create-room-api"));
// updateRoom controller
roomRouter.patch("/v1/rooms/:roomId", require("./update-room-api"));
// deleteRoom controller
roomRouter.delete("/v1/rooms/:roomId", require("./delete-room-api"));
// getRoom controller
roomRouter.get("/v1/rooms/:roomId", require("./get-room-api"));
// listRooms controller
roomRouter.get("/v1/rooms", require("./list-rooms-api"));

module.exports = roomRouter;
