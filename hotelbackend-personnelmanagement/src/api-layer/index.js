module.exports = {
  PersonnelManagementServiceManager: require("./service-manager/PersonnelManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Personnel Db Object
  CreatePersonnelManager: require("./main/personnel/create-personnel-api"),
  GetPersonnelManager: require("./main/personnel/get-personnel-api"),
  UpdatePersonnelManager: require("./main/personnel/update-personnel-api"),
  DeletePersonnelManager: require("./main/personnel/delete-personnel-api"),
  ListPersonnelManager: require("./main/personnel/list-personnel-api"),
  integrationRouter: require("./integrations/testRouter"),
};
