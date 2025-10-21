module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    paymentMcpRouter: require("./payment")(headers),
  };
};
