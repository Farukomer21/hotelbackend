const FeedbackManager = require("./FeedbackManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { FeedbackUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateFeedback } = require("dbLayer");

class UpdateFeedbackManager extends FeedbackManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateFeedback",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "feedback";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.feedbackId = this.feedbackId;
    jsonObj.rating = this.rating;
    jsonObj.comment = this.comment;
    jsonObj.response = this.response;
    jsonObj.category = this.category;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.feedbackId = request.params?.feedbackId;
    this.rating = request.body?.rating;
    this.comment = request.body?.comment;
    this.response = request.body?.response;
    this.category = request.body?.category;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.feedbackId = request.mcpParams.feedbackId;
    this.rating = request.mcpParams.rating;
    this.comment = request.mcpParams.comment;
    this.response = request.mcpParams.response;
    this.category = request.mcpParams.category;
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

  // data clause methods

  async buildDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      rating: this.rating,
      comment: this.comment,
      response: this.response,
      category: this.category,
    };

    let isEmpty = true;
    for (const key of Object.keys(dataClause)) {
      if (dataClause[key] !== undefined) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      throw new BadRequestError("errMsg_UpdateDataClauseCanNotBeEmpty");
    }

    return dataClause;
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

  checkParameterType_rating(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_rating() {
    if (this.rating == null) return;

    if (Array.isArray(this.rating)) {
      throw new BadRequestError("errMsg_ratingMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_rating(this.rating)) {
      throw new BadRequestError("errMsg_ratingTypeIsNotValid");
    }
  }

  checkParameter_comment() {
    if (this.comment == null) return;

    if (Array.isArray(this.comment)) {
      throw new BadRequestError("errMsg_commentMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameter_response() {
    if (this.response == null) return;

    if (Array.isArray(this.response)) {
      throw new BadRequestError("errMsg_responseMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameter_category() {
    if (this.category == null) return;

    if (Array.isArray(this.category)) {
      throw new BadRequestError("errMsg_categoryMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.feedbackId) this.checkParameter_feedbackId();

    if (this.rating) this.checkParameter_rating();

    if (this.comment) this.checkParameter_comment();

    if (this.response) this.checkParameter_response();

    if (this.category) this.checkParameter_category();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.feedback?._owner === this.session.userId;
  }

  async doBusiness() {
    const feedback = await dbScriptUpdateFeedback(this);
    return feedback;
  }

  async addToOutput() {}

  async raiseEvent() {
    FeedbackUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateFeedbackManager;
