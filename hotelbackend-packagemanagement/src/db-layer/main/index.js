const package_Functions = require("./package_");

module.exports = {
  // main Database
  createPackage_: package_Functions.createPackage_,
  getIdListOfPackage_ByField: package_Functions.getIdListOfPackage_ByField,
  getPackage_ById: package_Functions.getPackage_ById,
  getPackage_AggById: package_Functions.getPackage_AggById,
  getPackage_ListByQuery: package_Functions.getPackage_ListByQuery,
  getPackage_StatsByQuery: package_Functions.getPackage_StatsByQuery,
  getPackage_ByQuery: package_Functions.getPackage_ByQuery,
  updatePackage_ById: package_Functions.updatePackage_ById,
  updatePackage_ByIdList: package_Functions.updatePackage_ByIdList,
  updatePackage_ByQuery: package_Functions.updatePackage_ByQuery,
  deletePackage_ById: package_Functions.deletePackage_ById,
  deletePackage_ByQuery: package_Functions.deletePackage_ByQuery,
  dbScriptCreatePackage_: package_Functions.dbScriptCreatePackage_,
  dbScriptUpdatePackage_: package_Functions.dbScriptUpdatePackage_,
  dbScriptDeletePackage_: package_Functions.dbScriptDeletePackage_,
  dbScriptGetPackage_: package_Functions.dbScriptGetPackage_,
  dbScriptListPackages: package_Functions.dbScriptListPackages,
};
