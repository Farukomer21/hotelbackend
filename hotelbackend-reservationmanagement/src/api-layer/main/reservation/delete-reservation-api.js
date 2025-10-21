const ReservationManager = require("./ReservationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { ReservationDeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteReservation } = require("dbLayer");

class DeleteReservationManager extends ReservationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteReservation",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "reservation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reservationId = this.reservationId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.reservationId = request.params?.reservationId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reservationId = request.mcpParams.reservationId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.reservationId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getReservationByQuery } = require("dbLayer");
    this.reservation = await getReservationByQuery(this.whereClause);
    if (!this.reservation) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.reservation;
  }

  async checkInstance() {
    if (!this.reservation) {
      throw new NotFoundError("errMsg_RecordNotFound");
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

  checkParameters() {
    if (this.reservationId) this.checkParameter_reservationId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.reservation?._owner === this.session.userId;
  }

  async doBusiness() {
    const reservation = await dbScriptDeleteReservation(this);
    return reservation;
  }

  async addToOutput() {}

  async raiseEvent() {
    ReservationDeletedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteReservationManager;
