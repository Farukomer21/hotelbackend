const FeedbackManager = require("./FeedbackManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { FeedbackDeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteFeedback } = require("dbLayer");

class DeleteFeedbackManager extends FeedbackManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteFeedback",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "feedback";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.feedbackId = this.feedbackId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.feedbackId = request.params?.feedbackId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.feedbackId = request.mcpParams.feedbackId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.feedbackId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getFeedbackByQuery } = require("dbLayer");
    this.feedback = await getFeedbackByQuery(this.whereClause);
    if (!this.feedback) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.feedback;
  }

  async checkInstance() {
    if (!this.feedback) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_feedbackId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_feedbackId() {
    if (this.feedbackId == null) {
      throw new BadRequestError("errMsg_feedbackIdisRequired");
    }

    if (Array.isArray(this.feedbackId)) {
      throw new BadRequestError("errMsg_feedbackIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_feedbackId(this.feedbackId)) {
      throw new BadRequestError("errMsg_feedbackIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.feedbackId) this.checkParameter_feedbackId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.feedback?._owner === this.session.userId;
  }

  async doBusiness() {
    const feedback = await dbScriptDeleteFeedback(this);
    return feedback;
  }

  async addToOutput() {}

  async raiseEvent() {
    FeedbackDeletedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteFeedbackManager;
