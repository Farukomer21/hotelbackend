const mainFunctions = require("./main");

module.exports = {
  // main Database
  createGuest: mainFunctions.createGuest,
  getIdListOfGuestByField: mainFunctions.getIdListOfGuestByField,
  getGuestById: mainFunctions.getGuestById,
  getGuestAggById: mainFunctions.getGuestAggById,
  getGuestListByQuery: mainFunctions.getGuestListByQuery,
  getGuestStatsByQuery: mainFunctions.getGuestStatsByQuery,
  getGuestByQuery: mainFunctions.getGuestByQuery,
  updateGuestById: mainFunctions.updateGuestById,
  updateGuestByIdList: mainFunctions.updateGuestByIdList,
  updateGuestByQuery: mainFunctions.updateGuestByQuery,
  deleteGuestById: mainFunctions.deleteGuestById,
  deleteGuestByQuery: mainFunctions.deleteGuestByQuery,
  dbScriptCreateGuest: mainFunctions.dbScriptCreateGuest,
  dbScriptGetGuest: mainFunctions.dbScriptGetGuest,
  dbScriptUpdateGuest: mainFunctions.dbScriptUpdateGuest,
  dbScriptDeleteGuest: mainFunctions.dbScriptDeleteGuest,
  dbScriptListGuests: mainFunctions.dbScriptListGuests,
};
