module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Personnel Db Object
  CreatePersonnelManager: require("./personnel/create-personnel-api"),
  GetPersonnelManager: require("./personnel/get-personnel-api"),
  UpdatePersonnelManager: require("./personnel/update-personnel-api"),
  DeletePersonnelManager: require("./personnel/delete-personnel-api"),
  ListPersonnelManager: require("./personnel/list-personnel-api"),
};
