module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    package_McpRouter: require("./package_")(headers),
  };
};
