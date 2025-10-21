const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const FeedbackManagementServiceManager = require("../../service-manager/FeedbackManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Feedback */
class FeedbackManager extends FeedbackManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "feedback";
    this.modelName = "Feedback";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = FeedbackManager;
