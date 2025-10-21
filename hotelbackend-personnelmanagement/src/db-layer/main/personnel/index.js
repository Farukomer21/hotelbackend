const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createPersonnel: utils.createPersonnel,
  getIdListOfPersonnelByField: utils.getIdListOfPersonnelByField,
  getPersonnelById: utils.getPersonnelById,
  getPersonnelAggById: utils.getPersonnelAggById,
  getPersonnelListByQuery: utils.getPersonnelListByQuery,
  getPersonnelStatsByQuery: utils.getPersonnelStatsByQuery,
  getPersonnelByQuery: utils.getPersonnelByQuery,
  updatePersonnelById: utils.updatePersonnelById,
  updatePersonnelByIdList: utils.updatePersonnelByIdList,
  updatePersonnelByQuery: utils.updatePersonnelByQuery,
  deletePersonnelById: utils.deletePersonnelById,
  deletePersonnelByQuery: utils.deletePersonnelByQuery,
  dbScriptCreatePersonnel: dbApiScripts.dbScriptCreatePersonnel,
  dbScriptGetPersonnel: dbApiScripts.dbScriptGetPersonnel,
  dbScriptUpdatePersonnel: dbApiScripts.dbScriptUpdatePersonnel,
  dbScriptDeletePersonnel: dbApiScripts.dbScriptDeletePersonnel,
  dbScriptListPersonnel: dbApiScripts.dbScriptListPersonnel,
};
