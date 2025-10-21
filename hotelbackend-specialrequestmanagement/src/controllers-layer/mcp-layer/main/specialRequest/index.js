module.exports = (headers) => {
  // SpecialRequest Db Object Rest Api Router
  const specialRequestMcpRouter = [];

  // createSpecialRequest controller
  specialRequestMcpRouter.push(require("./create-specialrequest-api")(headers));
  // getSpecialRequest controller
  specialRequestMcpRouter.push(require("./get-specialrequest-api")(headers));
  // updateSpecialRequest controller
  specialRequestMcpRouter.push(require("./update-specialrequest-api")(headers));
  // deleteSpecialRequest controller
  specialRequestMcpRouter.push(require("./delete-specialrequest-api")(headers));
  // listSpecialRequests controller
  specialRequestMcpRouter.push(require("./list-specialrequests-api")(headers));

  return specialRequestMcpRouter;
};
