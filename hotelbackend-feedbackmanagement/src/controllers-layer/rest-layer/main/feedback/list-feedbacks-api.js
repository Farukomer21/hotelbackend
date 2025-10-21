const { ListFeedbacksManager } = require("apiLayer");

const FeedbackManagementRestController = require("../../FeedbackManagementServiceRestController");

class ListFeedbacksRestController extends FeedbackManagementRestController {
  constructor(req, res) {
    super("listFeedbacks", "listfeedbacks", req, res);
    this.dataName = "feedbacks";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListFeedbacksManager(this._req, "rest");
  }
}

const listFeedbacks = async (req, res, next) => {
  const controller = new ListFeedbacksRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listFeedbacks;
