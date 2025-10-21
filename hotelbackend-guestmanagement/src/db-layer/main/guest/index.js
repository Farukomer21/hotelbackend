const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createGuest: utils.createGuest,
  getIdListOfGuestByField: utils.getIdListOfGuestByField,
  getGuestById: utils.getGuestById,
  getGuestAggById: utils.getGuestAggById,
  getGuestListByQuery: utils.getGuestListByQuery,
  getGuestStatsByQuery: utils.getGuestStatsByQuery,
  getGuestByQuery: utils.getGuestByQuery,
  updateGuestById: utils.updateGuestById,
  updateGuestByIdList: utils.updateGuestByIdList,
  updateGuestByQuery: utils.updateGuestByQuery,
  deleteGuestById: utils.deleteGuestById,
  deleteGuestByQuery: utils.deleteGuestByQuery,
  dbScriptCreateGuest: dbApiScripts.dbScriptCreateGuest,
  dbScriptGetGuest: dbApiScripts.dbScriptGetGuest,
  dbScriptUpdateGuest: dbApiScripts.dbScriptUpdateGuest,
  dbScriptDeleteGuest: dbApiScripts.dbScriptDeleteGuest,
  dbScriptListGuests: dbApiScripts.dbScriptListGuests,
};
