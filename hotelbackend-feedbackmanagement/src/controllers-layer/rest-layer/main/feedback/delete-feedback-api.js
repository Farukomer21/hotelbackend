const { DeleteFeedbackManager } = require("apiLayer");

const FeedbackManagementRestController = require("../../FeedbackManagementServiceRestController");

class DeleteFeedbackRestController extends FeedbackManagementRestController {
  constructor(req, res) {
    super("deleteFeedback", "deletefeedback", req, res);
    this.dataName = "feedback";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteFeedbackManager(this._req, "rest");
  }
}

const deleteFeedback = async (req, res, next) => {
  const controller = new DeleteFeedbackRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteFeedback;
