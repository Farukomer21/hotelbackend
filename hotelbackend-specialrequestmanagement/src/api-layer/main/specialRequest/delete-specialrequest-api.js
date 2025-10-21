const SpecialRequestManager = require("./SpecialRequestManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  SpecialrequestDeletedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteSpecialrequest } = require("dbLayer");

class DeleteSpecialRequestManager extends SpecialRequestManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteSpecialRequest",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "specialRequest";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.specialRequestId = this.specialRequestId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.specialRequestId = request.params?.specialRequestId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.specialRequestId = request.mcpParams.specialRequestId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.specialRequestId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getSpecialRequestByQuery } = require("dbLayer");
    this.specialRequest = await getSpecialRequestByQuery(this.whereClause);
    if (!this.specialRequest) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.specialRequest;
  }

  async checkInstance() {
    if (!this.specialRequest) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_specialRequestId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_specialRequestId() {
    if (this.specialRequestId == null) {
      throw new BadRequestError("errMsg_specialRequestIdisRequired");
    }

    if (Array.isArray(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_specialRequestId(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.specialRequestId) this.checkParameter_specialRequestId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.specialRequest?._owner === this.session.userId;
  }

  async doBusiness() {
    const specialrequest = await dbScriptDeleteSpecialrequest(this);
    return specialrequest;
  }

  async addToOutput() {}

  async raiseEvent() {
    SpecialrequestDeletedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteSpecialRequestManager;
