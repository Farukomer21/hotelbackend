const reservationPackageFunctions = require("./reservationPackage");

module.exports = {
  // main Database
  createReservationPackage:
    reservationPackageFunctions.createReservationPackage,
  getIdListOfReservationPackageByField:
    reservationPackageFunctions.getIdListOfReservationPackageByField,
  getReservationPackageById:
    reservationPackageFunctions.getReservationPackageById,
  getReservationPackageAggById:
    reservationPackageFunctions.getReservationPackageAggById,
  getReservationPackageListByQuery:
    reservationPackageFunctions.getReservationPackageListByQuery,
  getReservationPackageStatsByQuery:
    reservationPackageFunctions.getReservationPackageStatsByQuery,
  getReservationPackageByQuery:
    reservationPackageFunctions.getReservationPackageByQuery,
  updateReservationPackageById:
    reservationPackageFunctions.updateReservationPackageById,
  updateReservationPackageByIdList:
    reservationPackageFunctions.updateReservationPackageByIdList,
  updateReservationPackageByQuery:
    reservationPackageFunctions.updateReservationPackageByQuery,
  deleteReservationPackageById:
    reservationPackageFunctions.deleteReservationPackageById,
  deleteReservationPackageByQuery:
    reservationPackageFunctions.deleteReservationPackageByQuery,
  dbScriptCreateReservationpackage:
    reservationPackageFunctions.dbScriptCreateReservationpackage,
  dbScriptUpdateReservationpackage:
    reservationPackageFunctions.dbScriptUpdateReservationpackage,
  dbScriptDeleteReservationpackage:
    reservationPackageFunctions.dbScriptDeleteReservationpackage,
  dbScriptGetReservationpackage:
    reservationPackageFunctions.dbScriptGetReservationpackage,
  dbScriptListReservationpackages:
    reservationPackageFunctions.dbScriptListReservationpackages,
};
