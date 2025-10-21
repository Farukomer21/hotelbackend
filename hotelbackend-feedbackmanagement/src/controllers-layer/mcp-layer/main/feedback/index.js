module.exports = (headers) => {
  // Feedback Db Object Rest Api Router
  const feedbackMcpRouter = [];

  // createFeedback controller
  feedbackMcpRouter.push(require("./create-feedback-api")(headers));
  // getFeedback controller
  feedbackMcpRouter.push(require("./get-feedback-api")(headers));
  // updateFeedback controller
  feedbackMcpRouter.push(require("./update-feedback-api")(headers));
  // deleteFeedback controller
  feedbackMcpRouter.push(require("./delete-feedback-api")(headers));
  // listFeedbacks controller
  feedbackMcpRouter.push(require("./list-feedbacks-api")(headers));

  return feedbackMcpRouter;
};
