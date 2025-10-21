module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    roomPriceMcpRouter: require("./roomPrice")(headers),
  };
};
