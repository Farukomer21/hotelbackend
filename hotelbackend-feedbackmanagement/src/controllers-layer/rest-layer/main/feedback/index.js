const express = require("express");

// Feedback Db Object Rest Api Router
const feedbackRouter = express.Router();

// add Feedback controllers

// createFeedback controller
feedbackRouter.post("/v1/feedbacks", require("./create-feedback-api"));
// getFeedback controller
feedbackRouter.get("/v1/feedbacks/:feedbackId", require("./get-feedback-api"));
// updateFeedback controller
feedbackRouter.patch(
  "/v1/feedbacks/:feedbackId",
  require("./update-feedback-api"),
);
// deleteFeedback controller
feedbackRouter.delete(
  "/v1/feedbacks/:feedbackId",
  require("./delete-feedback-api"),
);
// listFeedbacks controller
feedbackRouter.get("/v1/feedbacks", require("./list-feedbacks-api"));

module.exports = feedbackRouter;
