module.exports = {
  FeedbackManagementServiceManager: require("./service-manager/FeedbackManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Feedback Db Object
  CreateFeedbackManager: require("./main/feedback/create-feedback-api"),
  GetFeedbackManager: require("./main/feedback/get-feedback-api"),
  UpdateFeedbackManager: require("./main/feedback/update-feedback-api"),
  DeleteFeedbackManager: require("./main/feedback/delete-feedback-api"),
  ListFeedbacksManager: require("./main/feedback/list-feedbacks-api"),
  integrationRouter: require("./integrations/testRouter"),
};
