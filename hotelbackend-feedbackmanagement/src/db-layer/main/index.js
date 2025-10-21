const feedbackFunctions = require("./feedback");

module.exports = {
  // main Database
  createFeedback: feedbackFunctions.createFeedback,
  getIdListOfFeedbackByField: feedbackFunctions.getIdListOfFeedbackByField,
  getFeedbackById: feedbackFunctions.getFeedbackById,
  getFeedbackAggById: feedbackFunctions.getFeedbackAggById,
  getFeedbackListByQuery: feedbackFunctions.getFeedbackListByQuery,
  getFeedbackStatsByQuery: feedbackFunctions.getFeedbackStatsByQuery,
  getFeedbackByQuery: feedbackFunctions.getFeedbackByQuery,
  updateFeedbackById: feedbackFunctions.updateFeedbackById,
  updateFeedbackByIdList: feedbackFunctions.updateFeedbackByIdList,
  updateFeedbackByQuery: feedbackFunctions.updateFeedbackByQuery,
  deleteFeedbackById: feedbackFunctions.deleteFeedbackById,
  deleteFeedbackByQuery: feedbackFunctions.deleteFeedbackByQuery,
  dbScriptCreateFeedback: feedbackFunctions.dbScriptCreateFeedback,
  dbScriptGetFeedback: feedbackFunctions.dbScriptGetFeedback,
  dbScriptUpdateFeedback: feedbackFunctions.dbScriptUpdateFeedback,
  dbScriptDeleteFeedback: feedbackFunctions.dbScriptDeleteFeedback,
  dbScriptListFeedbacks: feedbackFunctions.dbScriptListFeedbacks,
};
