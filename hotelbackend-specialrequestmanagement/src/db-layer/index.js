const mainFunctions = require("./main");

module.exports = {
  // main Database
  createSpecialRequest: mainFunctions.createSpecialRequest,
  getIdListOfSpecialRequestByField:
    mainFunctions.getIdListOfSpecialRequestByField,
  getSpecialRequestById: mainFunctions.getSpecialRequestById,
  getSpecialRequestAggById: mainFunctions.getSpecialRequestAggById,
  getSpecialRequestListByQuery: mainFunctions.getSpecialRequestListByQuery,
  getSpecialRequestStatsByQuery: mainFunctions.getSpecialRequestStatsByQuery,
  getSpecialRequestByQuery: mainFunctions.getSpecialRequestByQuery,
  updateSpecialRequestById: mainFunctions.updateSpecialRequestById,
  updateSpecialRequestByIdList: mainFunctions.updateSpecialRequestByIdList,
  updateSpecialRequestByQuery: mainFunctions.updateSpecialRequestByQuery,
  deleteSpecialRequestById: mainFunctions.deleteSpecialRequestById,
  deleteSpecialRequestByQuery: mainFunctions.deleteSpecialRequestByQuery,
  dbScriptCreateSpecialrequest: mainFunctions.dbScriptCreateSpecialrequest,
  dbScriptGetSpecialrequest: mainFunctions.dbScriptGetSpecialrequest,
  dbScriptUpdateSpecialrequest: mainFunctions.dbScriptUpdateSpecialrequest,
  dbScriptDeleteSpecialrequest: mainFunctions.dbScriptDeleteSpecialrequest,
  dbScriptListSpecialrequests: mainFunctions.dbScriptListSpecialrequests,
};
