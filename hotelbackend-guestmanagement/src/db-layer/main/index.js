const guestFunctions = require("./guest");

module.exports = {
  // main Database
  createGuest: guestFunctions.createGuest,
  getIdListOfGuestByField: guestFunctions.getIdListOfGuestByField,
  getGuestById: guestFunctions.getGuestById,
  getGuestAggById: guestFunctions.getGuestAggById,
  getGuestListByQuery: guestFunctions.getGuestListByQuery,
  getGuestStatsByQuery: guestFunctions.getGuestStatsByQuery,
  getGuestByQuery: guestFunctions.getGuestByQuery,
  updateGuestById: guestFunctions.updateGuestById,
  updateGuestByIdList: guestFunctions.updateGuestByIdList,
  updateGuestByQuery: guestFunctions.updateGuestByQuery,
  deleteGuestById: guestFunctions.deleteGuestById,
  deleteGuestByQuery: guestFunctions.deleteGuestByQuery,
  dbScriptCreateGuest: guestFunctions.dbScriptCreateGuest,
  dbScriptGetGuest: guestFunctions.dbScriptGetGuest,
  dbScriptUpdateGuest: guestFunctions.dbScriptUpdateGuest,
  dbScriptDeleteGuest: guestFunctions.dbScriptDeleteGuest,
  dbScriptListGuests: guestFunctions.dbScriptListGuests,
};
