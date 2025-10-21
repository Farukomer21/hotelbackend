const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createSpecialRequest: utils.createSpecialRequest,
  getIdListOfSpecialRequestByField: utils.getIdListOfSpecialRequestByField,
  getSpecialRequestById: utils.getSpecialRequestById,
  getSpecialRequestAggById: utils.getSpecialRequestAggById,
  getSpecialRequestListByQuery: utils.getSpecialRequestListByQuery,
  getSpecialRequestStatsByQuery: utils.getSpecialRequestStatsByQuery,
  getSpecialRequestByQuery: utils.getSpecialRequestByQuery,
  updateSpecialRequestById: utils.updateSpecialRequestById,
  updateSpecialRequestByIdList: utils.updateSpecialRequestByIdList,
  updateSpecialRequestByQuery: utils.updateSpecialRequestByQuery,
  deleteSpecialRequestById: utils.deleteSpecialRequestById,
  deleteSpecialRequestByQuery: utils.deleteSpecialRequestByQuery,
  dbScriptCreateSpecialrequest: dbApiScripts.dbScriptCreateSpecialrequest,
  dbScriptGetSpecialrequest: dbApiScripts.dbScriptGetSpecialrequest,
  dbScriptUpdateSpecialrequest: dbApiScripts.dbScriptUpdateSpecialrequest,
  dbScriptDeleteSpecialrequest: dbApiScripts.dbScriptDeleteSpecialrequest,
  dbScriptListSpecialrequests: dbApiScripts.dbScriptListSpecialrequests,
};
