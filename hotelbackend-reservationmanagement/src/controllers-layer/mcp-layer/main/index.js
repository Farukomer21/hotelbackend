module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    reservationMcpRouter: require("./reservation")(headers),
  };
};
