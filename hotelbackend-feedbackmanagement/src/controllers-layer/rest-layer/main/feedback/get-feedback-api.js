const { GetFeedbackManager } = require("apiLayer");

const FeedbackManagementRestController = require("../../FeedbackManagementServiceRestController");

class GetFeedbackRestController extends FeedbackManagementRestController {
  constructor(req, res) {
    super("getFeedback", "getfeedback", req, res);
    this.dataName = "feedback";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetFeedbackManager(this._req, "rest");
  }
}

const getFeedback = async (req, res, next) => {
  const controller = new GetFeedbackRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getFeedback;
