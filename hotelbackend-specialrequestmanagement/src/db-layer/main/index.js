const specialRequestFunctions = require("./specialRequest");

module.exports = {
  // main Database
  createSpecialRequest: specialRequestFunctions.createSpecialRequest,
  getIdListOfSpecialRequestByField:
    specialRequestFunctions.getIdListOfSpecialRequestByField,
  getSpecialRequestById: specialRequestFunctions.getSpecialRequestById,
  getSpecialRequestAggById: specialRequestFunctions.getSpecialRequestAggById,
  getSpecialRequestListByQuery:
    specialRequestFunctions.getSpecialRequestListByQuery,
  getSpecialRequestStatsByQuery:
    specialRequestFunctions.getSpecialRequestStatsByQuery,
  getSpecialRequestByQuery: specialRequestFunctions.getSpecialRequestByQuery,
  updateSpecialRequestById: specialRequestFunctions.updateSpecialRequestById,
  updateSpecialRequestByIdList:
    specialRequestFunctions.updateSpecialRequestByIdList,
  updateSpecialRequestByQuery:
    specialRequestFunctions.updateSpecialRequestByQuery,
  deleteSpecialRequestById: specialRequestFunctions.deleteSpecialRequestById,
  deleteSpecialRequestByQuery:
    specialRequestFunctions.deleteSpecialRequestByQuery,
  dbScriptCreateSpecialrequest:
    specialRequestFunctions.dbScriptCreateSpecialrequest,
  dbScriptGetSpecialrequest: specialRequestFunctions.dbScriptGetSpecialrequest,
  dbScriptUpdateSpecialrequest:
    specialRequestFunctions.dbScriptUpdateSpecialrequest,
  dbScriptDeleteSpecialrequest:
    specialRequestFunctions.dbScriptDeleteSpecialrequest,
  dbScriptListSpecialrequests:
    specialRequestFunctions.dbScriptListSpecialrequests,
};
