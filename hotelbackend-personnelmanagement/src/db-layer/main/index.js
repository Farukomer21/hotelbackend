const personnelFunctions = require("./personnel");

module.exports = {
  // main Database
  createPersonnel: personnelFunctions.createPersonnel,
  getIdListOfPersonnelByField: personnelFunctions.getIdListOfPersonnelByField,
  getPersonnelById: personnelFunctions.getPersonnelById,
  getPersonnelAggById: personnelFunctions.getPersonnelAggById,
  getPersonnelListByQuery: personnelFunctions.getPersonnelListByQuery,
  getPersonnelStatsByQuery: personnelFunctions.getPersonnelStatsByQuery,
  getPersonnelByQuery: personnelFunctions.getPersonnelByQuery,
  updatePersonnelById: personnelFunctions.updatePersonnelById,
  updatePersonnelByIdList: personnelFunctions.updatePersonnelByIdList,
  updatePersonnelByQuery: personnelFunctions.updatePersonnelByQuery,
  deletePersonnelById: personnelFunctions.deletePersonnelById,
  deletePersonnelByQuery: personnelFunctions.deletePersonnelByQuery,
  dbScriptCreatePersonnel: personnelFunctions.dbScriptCreatePersonnel,
  dbScriptGetPersonnel: personnelFunctions.dbScriptGetPersonnel,
  dbScriptUpdatePersonnel: personnelFunctions.dbScriptUpdatePersonnel,
  dbScriptDeletePersonnel: personnelFunctions.dbScriptDeletePersonnel,
  dbScriptListPersonnel: personnelFunctions.dbScriptListPersonnel,
};
