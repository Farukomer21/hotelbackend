module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    guestMcpRouter: require("./guest")(headers),
  };
};
