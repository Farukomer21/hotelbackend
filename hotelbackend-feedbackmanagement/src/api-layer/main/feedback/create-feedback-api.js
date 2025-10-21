const FeedbackManager = require("./FeedbackManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { FeedbackCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateFeedback } = require("dbLayer");

class CreateFeedbackManager extends FeedbackManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createFeedback",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "feedback";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.feedbackId = this.feedbackId;
    jsonObj.reservationId = this.reservationId;
    jsonObj.rating = this.rating;
    jsonObj.comment = this.comment;
    jsonObj.submittedAt = this.submittedAt;
    jsonObj.response = this.response;
    jsonObj.category = this.category;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.feedbackId = request.body?.feedbackId;
    this.reservationId = request.body?.reservationId;
    this.rating = request.body?.rating;
    this.comment = request.body?.comment;
    this.submittedAt = request.body?.submittedAt;
    this.response = request.body?.response;
    this.category = request.body?.category;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.feedbackId = request.mcpParams.feedbackId;
    this.reservationId = request.mcpParams.reservationId;
    this.rating = request.mcpParams.rating;
    this.comment = request.mcpParams.comment;
    this.submittedAt = request.mcpParams.submittedAt;
    this.response = request.mcpParams.response;
    this.category = request.mcpParams.category;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.feedbackId = this.id;
    if (!this.feedbackId) this.feedbackId = newUUID(false);

    const dataClause = {
      id: this.feedbackId,
      reservationId: this.reservationId,
      rating: this.rating,
      comment: this.comment,
      submittedAt: this.submittedAt,
      response: this.response,
      category: this.category,
      isActive: true,
    };

    dataClause.submittedAt = this.submittedAt ?? new Date();
    this.submittedAt = dataClause.submittedAt;

    return dataClause;
  }

  checkParameterType_feedbackId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_feedbackId() {
    if (this.feedbackId == null) return;

    if (Array.isArray(this.feedbackId)) {
      throw new BadRequestError("errMsg_feedbackIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_feedbackId(this.feedbackId)) {
      throw new BadRequestError("errMsg_feedbackIdTypeIsNotValid");
    }
  }

  checkParameterType_reservationId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_reservationId() {
    if (this.reservationId == null) {
      throw new BadRequestError("errMsg_reservationIdisRequired");
    }

    if (Array.isArray(this.reservationId)) {
      throw new BadRequestError("errMsg_reservationIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_reservationId(this.reservationId)) {
      throw new BadRequestError("errMsg_reservationIdTypeIsNotValid");
    }
  }

  checkParameterType_rating(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_rating() {
    if (this.rating == null) {
      throw new BadRequestError("errMsg_ratingisRequired");
    }

    if (Array.isArray(this.rating)) {
      throw new BadRequestError("errMsg_ratingMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_rating(this.rating)) {
      throw new BadRequestError("errMsg_ratingTypeIsNotValid");
    }
  }

  checkParameter_comment() {
    if (this.comment == null) {
      throw new BadRequestError("errMsg_commentisRequired");
    }

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
    if (this.category == null) {
      throw new BadRequestError("errMsg_categoryisRequired");
    }

    if (Array.isArray(this.category)) {
      throw new BadRequestError("errMsg_categoryMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.feedbackId) this.checkParameter_feedbackId();

    if (this.reservationId) this.checkParameter_reservationId();

    if (this.rating) this.checkParameter_rating();

    if (this.comment) this.checkParameter_comment();

    if (this.response) this.checkParameter_response();

    if (this.category) this.checkParameter_category();
  }

  async doBusiness() {
    const feedback = await dbScriptCreateFeedback(this);
    return feedback;
  }

  async addToOutput() {}

  async raiseEvent() {
    FeedbackCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateFeedbackManager;
