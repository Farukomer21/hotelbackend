const Package_Manager = require("./Package_Manager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { Package_DeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeletePackage_ } = require("dbLayer");

class DeletePackageManager extends Package_Manager {
  constructor(request, controllerType) {
    super(request, {
      name: "deletePackage",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "package_";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.package_Id = this.package_Id;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.package_Id = request.params?.package_Id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.package_Id = request.mcpParams.package_Id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.package_Id }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getPackage_ByQuery } = require("dbLayer");
    this.package_ = await getPackage_ByQuery(this.whereClause);
    if (!this.package_) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.package_;
  }

  async checkInstance() {
    if (!this.package_) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_package_Id(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_package_Id() {
    if (this.package_Id == null) {
      throw new BadRequestError("errMsg_package_IdisRequired");
    }

    if (Array.isArray(this.package_Id)) {
      throw new BadRequestError("errMsg_package_IdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_package_Id(this.package_Id)) {
      throw new BadRequestError("errMsg_package_IdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.package_Id) this.checkParameter_package_Id();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.package_?._owner === this.session.userId;
  }

  async doBusiness() {
    const package_ = await dbScriptDeletePackage_(this);
    return package_;
  }

  async addToOutput() {}

  async raiseEvent() {
    Package_DeletedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = DeletePackageManager;
