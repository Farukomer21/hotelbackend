module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    reservationPackageMcpRouter: require("./reservationPackage")(headers),
  };
};
