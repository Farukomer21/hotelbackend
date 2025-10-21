module.exports = (headers) => {
  // Room Db Object Rest Api Router
  const roomMcpRouter = [];

  // createRoom controller
  roomMcpRouter.push(require("./create-room-api")(headers));
  // updateRoom controller
  roomMcpRouter.push(require("./update-room-api")(headers));
  // deleteRoom controller
  roomMcpRouter.push(require("./delete-room-api")(headers));
  // getRoom controller
  roomMcpRouter.push(require("./get-room-api")(headers));
  // listRooms controller
  roomMcpRouter.push(require("./list-rooms-api")(headers));

  return roomMcpRouter;
};
