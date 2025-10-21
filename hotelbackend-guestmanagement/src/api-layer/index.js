module.exports = {
  GuestManagementServiceManager: require("./service-manager/GuestManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Guest Db Object
  CreateGuestManager: require("./main/guest/create-guest-api"),
  GetGuestManager: require("./main/guest/get-guest-api"),
  UpdateGuestManager: require("./main/guest/update-guest-api"),
  DeleteGuestManager: require("./main/guest/delete-guest-api"),
  ListGuestsManager: require("./main/guest/list-guests-api"),
  integrationRouter: require("./integrations/testRouter"),
};
