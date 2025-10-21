const mainFunctions = require("./main");

module.exports = {
  // main Database
  createPackage_: mainFunctions.createPackage_,
  getIdListOfPackage_ByField: mainFunctions.getIdListOfPackage_ByField,
  getPackage_ById: mainFunctions.getPackage_ById,
  getPackage_AggById: mainFunctions.getPackage_AggById,
  getPackage_ListByQuery: mainFunctions.getPackage_ListByQuery,
  getPackage_StatsByQuery: mainFunctions.getPackage_StatsByQuery,
  getPackage_ByQuery: mainFunctions.getPackage_ByQuery,
  updatePackage_ById: mainFunctions.updatePackage_ById,
  updatePackage_ByIdList: mainFunctions.updatePackage_ByIdList,
  updatePackage_ByQuery: mainFunctions.updatePackage_ByQuery,
  deletePackage_ById: mainFunctions.deletePackage_ById,
  deletePackage_ByQuery: mainFunctions.deletePackage_ByQuery,
  dbScriptCreatePackage_: mainFunctions.dbScriptCreatePackage_,
  dbScriptUpdatePackage_: mainFunctions.dbScriptUpdatePackage_,
  dbScriptDeletePackage_: mainFunctions.dbScriptDeletePackage_,
  dbScriptGetPackage_: mainFunctions.dbScriptGetPackage_,
  dbScriptListPackages: mainFunctions.dbScriptListPackages,
};
