const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createReservation: utils.createReservation,
  getIdListOfReservationByField: utils.getIdListOfReservationByField,
  getReservationById: utils.getReservationById,
  getReservationAggById: utils.getReservationAggById,
  getReservationListByQuery: utils.getReservationListByQuery,
  getReservationStatsByQuery: utils.getReservationStatsByQuery,
  getReservationByQuery: utils.getReservationByQuery,
  updateReservationById: utils.updateReservationById,
  updateReservationByIdList: utils.updateReservationByIdList,
  updateReservationByQuery: utils.updateReservationByQuery,
  deleteReservationById: utils.deleteReservationById,
  deleteReservationByQuery: utils.deleteReservationByQuery,
  getReservationByReservationCode: utils.getReservationByReservationCode,
  dbScriptCreateReservation: dbApiScripts.dbScriptCreateReservation,
  dbScriptGetReservation: dbApiScripts.dbScriptGetReservation,
  dbScriptGetReservationbycode: dbApiScripts.dbScriptGetReservationbycode,
  dbScriptUpdateReservation: dbApiScripts.dbScriptUpdateReservation,
  dbScriptCancelReservationbycode: dbApiScripts.dbScriptCancelReservationbycode,
  dbScriptDeleteReservation: dbApiScripts.dbScriptDeleteReservation,
  dbScriptListReservations: dbApiScripts.dbScriptListReservations,
};
