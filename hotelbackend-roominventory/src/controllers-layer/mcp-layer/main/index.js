module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    roomMcpRouter: require("./room")(headers),
  };
};
