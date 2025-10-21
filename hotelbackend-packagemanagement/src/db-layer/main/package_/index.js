const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createPackage_: utils.createPackage_,
  getIdListOfPackage_ByField: utils.getIdListOfPackage_ByField,
  getPackage_ById: utils.getPackage_ById,
  getPackage_AggById: utils.getPackage_AggById,
  getPackage_ListByQuery: utils.getPackage_ListByQuery,
  getPackage_StatsByQuery: utils.getPackage_StatsByQuery,
  getPackage_ByQuery: utils.getPackage_ByQuery,
  updatePackage_ById: utils.updatePackage_ById,
  updatePackage_ByIdList: utils.updatePackage_ByIdList,
  updatePackage_ByQuery: utils.updatePackage_ByQuery,
  deletePackage_ById: utils.deletePackage_ById,
  deletePackage_ByQuery: utils.deletePackage_ByQuery,
  dbScriptCreatePackage_: dbApiScripts.dbScriptCreatePackage_,
  dbScriptUpdatePackage_: dbApiScripts.dbScriptUpdatePackage_,
  dbScriptDeletePackage_: dbApiScripts.dbScriptDeletePackage_,
  dbScriptGetPackage_: dbApiScripts.dbScriptGetPackage_,
  dbScriptListPackages: dbApiScripts.dbScriptListPackages,
};
