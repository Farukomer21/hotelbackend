module.exports = {
  SpecialRequestManagementServiceManager: require("./service-manager/SpecialRequestManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // SpecialRequest Db Object
  CreateSpecialRequestManager: require("./main/specialRequest/create-specialrequest-api"),
  GetSpecialRequestManager: require("./main/specialRequest/get-specialrequest-api"),
  UpdateSpecialRequestManager: require("./main/specialRequest/update-specialrequest-api"),
  DeleteSpecialRequestManager: require("./main/specialRequest/delete-specialrequest-api"),
  ListSpecialRequestsManager: require("./main/specialRequest/list-specialrequests-api"),
  integrationRouter: require("./integrations/testRouter"),
};
