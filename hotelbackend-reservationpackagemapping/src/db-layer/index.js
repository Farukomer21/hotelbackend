const mainFunctions = require("./main");

module.exports = {
  // main Database
  createReservationPackage: mainFunctions.createReservationPackage,
  getIdListOfReservationPackageByField:
    mainFunctions.getIdListOfReservationPackageByField,
  getReservationPackageById: mainFunctions.getReservationPackageById,
  getReservationPackageAggById: mainFunctions.getReservationPackageAggById,
  getReservationPackageListByQuery:
    mainFunctions.getReservationPackageListByQuery,
  getReservationPackageStatsByQuery:
    mainFunctions.getReservationPackageStatsByQuery,
  getReservationPackageByQuery: mainFunctions.getReservationPackageByQuery,
  updateReservationPackageById: mainFunctions.updateReservationPackageById,
  updateReservationPackageByIdList:
    mainFunctions.updateReservationPackageByIdList,
  updateReservationPackageByQuery:
    mainFunctions.updateReservationPackageByQuery,
  deleteReservationPackageById: mainFunctions.deleteReservationPackageById,
  deleteReservationPackageByQuery:
    mainFunctions.deleteReservationPackageByQuery,
  dbScriptCreateReservationpackage:
    mainFunctions.dbScriptCreateReservationpackage,
  dbScriptUpdateReservationpackage:
    mainFunctions.dbScriptUpdateReservationpackage,
  dbScriptDeleteReservationpackage:
    mainFunctions.dbScriptDeleteReservationpackage,
  dbScriptGetReservationpackage: mainFunctions.dbScriptGetReservationpackage,
  dbScriptListReservationpackages:
    mainFunctions.dbScriptListReservationpackages,
};
