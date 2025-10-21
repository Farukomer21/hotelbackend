module.exports = (headers) => {
  // Personnel Db Object Rest Api Router
  const personnelMcpRouter = [];

  // createPersonnel controller
  personnelMcpRouter.push(require("./create-personnel-api")(headers));
  // getPersonnel controller
  personnelMcpRouter.push(require("./get-personnel-api")(headers));
  // updatePersonnel controller
  personnelMcpRouter.push(require("./update-personnel-api")(headers));
  // deletePersonnel controller
  personnelMcpRouter.push(require("./delete-personnel-api")(headers));
  // listPersonnel controller
  personnelMcpRouter.push(require("./list-personnel-api")(headers));

  return personnelMcpRouter;
};
