module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Feedback Db Object
  CreateFeedbackManager: require("./feedback/create-feedback-api"),
  GetFeedbackManager: require("./feedback/get-feedback-api"),
  UpdateFeedbackManager: require("./feedback/update-feedback-api"),
  DeleteFeedbackManager: require("./feedback/delete-feedback-api"),
  ListFeedbacksManager: require("./feedback/list-feedbacks-api"),
};
