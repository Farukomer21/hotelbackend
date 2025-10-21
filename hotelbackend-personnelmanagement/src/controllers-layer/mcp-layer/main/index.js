module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    personnelMcpRouter: require("./personnel")(headers),
  };
};
