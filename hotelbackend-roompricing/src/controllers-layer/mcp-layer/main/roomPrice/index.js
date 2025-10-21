module.exports = (headers) => {
  // RoomPrice Db Object Rest Api Router
  const roomPriceMcpRouter = [];

  // createRoomPrice controller
  roomPriceMcpRouter.push(require("./create-roomprice-api")(headers));
  // getRoomPrice controller
  roomPriceMcpRouter.push(require("./get-roomprice-api")(headers));
  // updateRoomPrice controller
  roomPriceMcpRouter.push(require("./update-roomprice-api")(headers));
  // deleteRoomPrice controller
  roomPriceMcpRouter.push(require("./delete-roomprice-api")(headers));
  // listRoomPrices controller
  roomPriceMcpRouter.push(require("./list-roomprices-api")(headers));

  return roomPriceMcpRouter;
};
