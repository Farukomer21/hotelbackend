module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    feedbackMcpRouter: require("./feedback")(headers),
  };
};
