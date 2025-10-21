module.exports = {
  RoomPricingServiceManager: require("./service-manager/RoomPricingServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // RoomPrice Db Object
  CreateRoomPriceManager: require("./main/roomPrice/create-roomprice-api"),
  GetRoomPriceManager: require("./main/roomPrice/get-roomprice-api"),
  UpdateRoomPriceManager: require("./main/roomPrice/update-roomprice-api"),
  DeleteRoomPriceManager: require("./main/roomPrice/delete-roomprice-api"),
  ListRoomPricesManager: require("./main/roomPrice/list-roomprices-api"),
  integrationRouter: require("./integrations/testRouter"),
};
