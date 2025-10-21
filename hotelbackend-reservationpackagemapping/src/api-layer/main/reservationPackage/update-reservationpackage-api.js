const ReservationPackageManager = require("./ReservationPackageManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  ReservationpackageUpdatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateReservationpackage } = require("dbLayer");

class UpdateReservationPackageManager extends ReservationPackageManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateReservationPackage",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "reservationPackage";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reservationPackageId = this.reservationPackageId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.reservationPackageId = request.params?.reservationPackageId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reservationPackageId = request.mcpParams.reservationPackageId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.reservationPackageId }, { isActive: true }] };

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

    const dataClause = {};

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
    const { getReservationPackageByQuery } = require("dbLayer");
    this.reservationPackage = await getReservationPackageByQuery(
      this.whereClause,
    );
    if (!this.reservationPackage) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.reservationPackage;
  }

  async checkInstance() {
    if (!this.reservationPackage) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_reservationPackageId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_reservationPackageId() {
    if (this.reservationPackageId == null) {
      throw new BadRequestError("errMsg_reservationPackageIdisRequired");
    }

    if (Array.isArray(this.reservationPackageId)) {
      throw new BadRequestError("errMsg_reservationPackageIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (
      !this.checkParameterType_reservationPackageId(this.reservationPackageId)
    ) {
      throw new BadRequestError("errMsg_reservationPackageIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.reservationPackageId) this.checkParameter_reservationPackageId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.reservationPackage?._owner === this.session.userId;
  }

  async doBusiness() {
    const reservationpackage = await dbScriptUpdateReservationpackage(this);
    return reservationpackage;
  }

  async addToOutput() {}

  async raiseEvent() {
    ReservationpackageUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateReservationPackageManager;
