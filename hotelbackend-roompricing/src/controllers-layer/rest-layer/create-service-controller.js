const RoomPricingServiceRestController = require("./RoomPricingServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new RoomPricingServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
