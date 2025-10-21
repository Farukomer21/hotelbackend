const mainFunctions = require("./main");

module.exports = {
  // main Database
  createFeedback: mainFunctions.createFeedback,
  getIdListOfFeedbackByField: mainFunctions.getIdListOfFeedbackByField,
  getFeedbackById: mainFunctions.getFeedbackById,
  getFeedbackAggById: mainFunctions.getFeedbackAggById,
  getFeedbackListByQuery: mainFunctions.getFeedbackListByQuery,
  getFeedbackStatsByQuery: mainFunctions.getFeedbackStatsByQuery,
  getFeedbackByQuery: mainFunctions.getFeedbackByQuery,
  updateFeedbackById: mainFunctions.updateFeedbackById,
  updateFeedbackByIdList: mainFunctions.updateFeedbackByIdList,
  updateFeedbackByQuery: mainFunctions.updateFeedbackByQuery,
  deleteFeedbackById: mainFunctions.deleteFeedbackById,
  deleteFeedbackByQuery: mainFunctions.deleteFeedbackByQuery,
  dbScriptCreateFeedback: mainFunctions.dbScriptCreateFeedback,
  dbScriptGetFeedback: mainFunctions.dbScriptGetFeedback,
  dbScriptUpdateFeedback: mainFunctions.dbScriptUpdateFeedback,
  dbScriptDeleteFeedback: mainFunctions.dbScriptDeleteFeedback,
  dbScriptListFeedbacks: mainFunctions.dbScriptListFeedbacks,
};
