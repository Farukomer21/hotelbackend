const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createReservationPackage: utils.createReservationPackage,
  getIdListOfReservationPackageByField:
    utils.getIdListOfReservationPackageByField,
  getReservationPackageById: utils.getReservationPackageById,
  getReservationPackageAggById: utils.getReservationPackageAggById,
  getReservationPackageListByQuery: utils.getReservationPackageListByQuery,
  getReservationPackageStatsByQuery: utils.getReservationPackageStatsByQuery,
  getReservationPackageByQuery: utils.getReservationPackageByQuery,
  updateReservationPackageById: utils.updateReservationPackageById,
  updateReservationPackageByIdList: utils.updateReservationPackageByIdList,
  updateReservationPackageByQuery: utils.updateReservationPackageByQuery,
  deleteReservationPackageById: utils.deleteReservationPackageById,
  deleteReservationPackageByQuery: utils.deleteReservationPackageByQuery,
  dbScriptCreateReservationpackage:
    dbApiScripts.dbScriptCreateReservationpackage,
  dbScriptUpdateReservationpackage:
    dbApiScripts.dbScriptUpdateReservationpackage,
  dbScriptDeleteReservationpackage:
    dbApiScripts.dbScriptDeleteReservationpackage,
  dbScriptGetReservationpackage: dbApiScripts.dbScriptGetReservationpackage,
  dbScriptListReservationpackages: dbApiScripts.dbScriptListReservationpackages,
};
