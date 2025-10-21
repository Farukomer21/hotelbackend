const { CreateFeedbackManager } = require("apiLayer");

const FeedbackManagementRestController = require("../../FeedbackManagementServiceRestController");

class CreateFeedbackRestController extends FeedbackManagementRestController {
  constructor(req, res) {
    super("createFeedback", "createfeedback", req, res);
    this.dataName = "feedback";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateFeedbackManager(this._req, "rest");
  }
}

const createFeedback = async (req, res, next) => {
  const controller = new CreateFeedbackRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createFeedback;
