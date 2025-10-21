module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // SpecialRequest Db Object
  CreateSpecialRequestManager: require("./specialRequest/create-specialrequest-api"),
  GetSpecialRequestManager: require("./specialRequest/get-specialrequest-api"),
  UpdateSpecialRequestManager: require("./specialRequest/update-specialrequest-api"),
  DeleteSpecialRequestManager: require("./specialRequest/delete-specialrequest-api"),
  ListSpecialRequestsManager: require("./specialRequest/list-specialrequests-api"),
};
