const PersonnelManager = require("./PersonnelManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PersonnelRetrivedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptGetPersonnel } = require("dbLayer");

class GetPersonnelManager extends PersonnelManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getPersonnel",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
    });

    this.dataName = "personnel";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.personnelId = this.personnelId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.personnelId = request.params?.personnelId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.personnelId = request.mcpParams.personnelId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.personnelId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async checkInstance() {
    if (!this.personnel) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_personnelId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_personnelId() {
    if (this.personnelId == null) {
      throw new BadRequestError("errMsg_personnelIdisRequired");
    }

    if (Array.isArray(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_personnelId(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.personnelId) this.checkParameter_personnelId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.personnel?._owner === this.session.userId;
  }

  async doBusiness() {
    const personnel = await dbScriptGetPersonnel(this);
    return personnel;
  }

  async addToOutput() {}

  async raiseEvent() {
    PersonnelRetrivedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = GetPersonnelManager;
