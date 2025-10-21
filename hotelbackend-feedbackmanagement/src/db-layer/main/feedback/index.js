const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createFeedback: utils.createFeedback,
  getIdListOfFeedbackByField: utils.getIdListOfFeedbackByField,
  getFeedbackById: utils.getFeedbackById,
  getFeedbackAggById: utils.getFeedbackAggById,
  getFeedbackListByQuery: utils.getFeedbackListByQuery,
  getFeedbackStatsByQuery: utils.getFeedbackStatsByQuery,
  getFeedbackByQuery: utils.getFeedbackByQuery,
  updateFeedbackById: utils.updateFeedbackById,
  updateFeedbackByIdList: utils.updateFeedbackByIdList,
  updateFeedbackByQuery: utils.updateFeedbackByQuery,
  deleteFeedbackById: utils.deleteFeedbackById,
  deleteFeedbackByQuery: utils.deleteFeedbackByQuery,
  dbScriptCreateFeedback: dbApiScripts.dbScriptCreateFeedback,
  dbScriptGetFeedback: dbApiScripts.dbScriptGetFeedback,
  dbScriptUpdateFeedback: dbApiScripts.dbScriptUpdateFeedback,
  dbScriptDeleteFeedback: dbApiScripts.dbScriptDeleteFeedback,
  dbScriptListFeedbacks: dbApiScripts.dbScriptListFeedbacks,
};
