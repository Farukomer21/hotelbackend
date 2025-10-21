const ReservationPackageManager = require("./ReservationPackageManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  ReservationpackageCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateReservationpackage } = require("dbLayer");

class CreateReservationPackageManager extends ReservationPackageManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createReservationPackage",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "reservationPackage";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reservationPackageId = this.reservationPackageId;
    jsonObj.reservationId = this.reservationId;
    jsonObj.packageId = this.packageId;
    jsonObj.assignedAt = this.assignedAt;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.reservationPackageId = request.body?.reservationPackageId;
    this.reservationId = request.body?.reservationId;
    this.packageId = request.body?.packageId;
    this.assignedAt = request.body?.assignedAt;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reservationPackageId = request.mcpParams.reservationPackageId;
    this.reservationId = request.mcpParams.reservationId;
    this.packageId = request.mcpParams.packageId;
    this.assignedAt = request.mcpParams.assignedAt;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.reservationPackageId = this.id;
    if (!this.reservationPackageId) this.reservationPackageId = newUUID(false);

    const dataClause = {
      id: this.reservationPackageId,
      reservationId: this.reservationId,
      packageId: this.packageId,
      assignedAt: this.assignedAt,
      isActive: true,
    };

    dataClause.assignedAt = new Date();
    this.assignedAt = dataClause.assignedAt;

    return dataClause;
  }

  checkParameterType_reservationPackageId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_reservationPackageId() {
    if (this.reservationPackageId == null) return;

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

  checkParameterType_packageId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_packageId() {
    if (this.packageId == null) {
      throw new BadRequestError("errMsg_packageIdisRequired");
    }

    if (Array.isArray(this.packageId)) {
      throw new BadRequestError("errMsg_packageIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_packageId(this.packageId)) {
      throw new BadRequestError("errMsg_packageIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.reservationPackageId) this.checkParameter_reservationPackageId();

    if (this.reservationId) this.checkParameter_reservationId();

    if (this.packageId) this.checkParameter_packageId();
  }

  async doBusiness() {
    const reservationpackage = await dbScriptCreateReservationpackage(this);
    return reservationpackage;
  }

  async addToOutput() {}

  async raiseEvent() {
    ReservationpackageCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateReservationPackageManager;
