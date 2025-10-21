module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Guest Db Object
  CreateGuestManager: require("./guest/create-guest-api"),
  GetGuestManager: require("./guest/get-guest-api"),
  UpdateGuestManager: require("./guest/update-guest-api"),
  DeleteGuestManager: require("./guest/delete-guest-api"),
  ListGuestsManager: require("./guest/list-guests-api"),
};
