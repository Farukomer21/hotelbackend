const { UpdateFeedbackManager } = require("apiLayer");

const FeedbackManagementRestController = require("../../FeedbackManagementServiceRestController");

class UpdateFeedbackRestController extends FeedbackManagementRestController {
  constructor(req, res) {
    super("updateFeedback", "updatefeedback", req, res);
    this.dataName = "feedback";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateFeedbackManager(this._req, "rest");
  }
}

const updateFeedback = async (req, res, next) => {
  const controller = new UpdateFeedbackRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateFeedback;
