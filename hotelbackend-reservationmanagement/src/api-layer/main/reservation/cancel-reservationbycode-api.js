const ReservationManager = require("./ReservationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  ReservationbycodeCanceledPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCancelReservationbycode } = require("dbLayer");

class CancelReservationByCodeManager extends ReservationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "cancelReservationByCode",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "reservation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reservationId = this.reservationId;
    jsonObj.guestId = this.guestId;
    jsonObj.roomId = this.roomId;
    jsonObj.packageIds = this.packageIds;
    jsonObj.checkInDate = this.checkInDate;
    jsonObj.checkOutDate = this.checkOutDate;
    jsonObj.status = this.status;
    jsonObj.specialRequestIds = this.specialRequestIds;
    jsonObj.paymentStatus = this.paymentStatus;
    jsonObj.totalAmount = this.totalAmount;
    jsonObj.notes = this.notes;
    jsonObj.numGuests = this.numGuests;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.reservationId = request.params?.reservationId;
    this.guestId = request.body?.guestId;
    this.roomId = request.body?.roomId;
    this.packageIds = request.body?.packageIds;
    this.checkInDate = request.body?.checkInDate;
    this.checkOutDate = request.body?.checkOutDate;
    this.status = request.body?.status;
    this.specialRequestIds = request.body?.specialRequestIds;
    this.paymentStatus = request.body?.paymentStatus;
    this.totalAmount = request.body?.totalAmount;
    this.notes = request.body?.notes;
    this.numGuests = request.body?.numGuests;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reservationId = request.mcpParams.reservationId;
    this.guestId = request.mcpParams.guestId;
    this.roomId = request.mcpParams.roomId;
    this.packageIds = request.mcpParams.packageIds;
    this.checkInDate = request.mcpParams.checkInDate;
    this.checkOutDate = request.mcpParams.checkOutDate;
    this.status = request.mcpParams.status;
    this.specialRequestIds = request.mcpParams.specialRequestIds;
    this.paymentStatus = request.mcpParams.paymentStatus;
    this.totalAmount = request.mcpParams.totalAmount;
    this.notes = request.mcpParams.notes;
    this.numGuests = request.mcpParams.numGuests;
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

  // data clause methods

  async buildDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      guestId: this.guestId,
      roomId: this.roomId,
      packageIds: this.packageIds
        ? this.packageIds
        : this.packageIds_remove
          ? sequelize.fn(
              "array_remove",
              sequelize.col("packageIds"),
              this.packageIds_remove,
            )
          : this.packageIds_append
            ? sequelize.fn(
                "array_append",
                sequelize.col("packageIds"),
                this.packageIds_append,
              )
            : undefined,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      status: this.status,
      specialRequestIds: this.specialRequestIds
        ? this.specialRequestIds
        : this.specialRequestIds_remove
          ? sequelize.fn(
              "array_remove",
              sequelize.col("specialRequestIds"),
              this.specialRequestIds_remove,
            )
          : this.specialRequestIds_append
            ? sequelize.fn(
                "array_append",
                sequelize.col("specialRequestIds"),
                this.specialRequestIds_append,
              )
            : undefined,
      paymentStatus: this.paymentStatus,
      totalAmount: this.totalAmount,
      notes: this.notes,
      numGuests: this.numGuests,
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

  checkParameterType_guestId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_guestId() {
    if (this.guestId == null) return;

    if (Array.isArray(this.guestId)) {
      throw new BadRequestError("errMsg_guestIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_guestId(this.guestId)) {
      throw new BadRequestError("errMsg_guestIdTypeIsNotValid");
    }
  }

  checkParameterType_roomId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomId() {
    if (this.roomId == null) return;

    if (Array.isArray(this.roomId)) {
      throw new BadRequestError("errMsg_roomIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_roomId(this.roomId)) {
      throw new BadRequestError("errMsg_roomIdTypeIsNotValid");
    }
  }

  checkParameterType_packageIds(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_packageIds() {
    if (this.packageIds == null) return;

    if (!Array.isArray(this.packageIds)) {
      throw new BadRequestError("errMsg_packageIdsMustBeAnArray");
    }

    // Parameter Type: ID

    this.packageIds.forEach((item) => {
      if (!this.checkParameterType_packageIds(item)) {
        throw new BadRequestError("errMsg_packageIdsArrayHasAnInvalidItem");
      }
    });
  }

  checkParameterType_checkInDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_checkInDate() {
    if (this.checkInDate == null) return;

    if (Array.isArray(this.checkInDate)) {
      throw new BadRequestError("errMsg_checkInDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_checkInDate(this.checkInDate)) {
      throw new BadRequestError("errMsg_checkInDateTypeIsNotValid");
    }
  }

  checkParameterType_checkOutDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_checkOutDate() {
    if (this.checkOutDate == null) return;

    if (Array.isArray(this.checkOutDate)) {
      throw new BadRequestError("errMsg_checkOutDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_checkOutDate(this.checkOutDate)) {
      throw new BadRequestError("errMsg_checkOutDateTypeIsNotValid");
    }
  }

  checkParameterType_status(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["booked", "canceled", "completed"];
    if (typeof paramValue !== "string") {
      if (isInt(paramValue)) {
        paramValue = Number(paramValue);
        if (paramValue >= 0 && paramValue <= enumOptions.length - 1) {
          paramValue = enumOptions[paramValue];
          return paramValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!enumOptions.includes(paramValue.toLowerCase())) {
      return false;
    }

    return true;
  }

  checkParameter_status() {
    if (this.status == null) return;

    if (Array.isArray(this.status)) {
      throw new BadRequestError("errMsg_statusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_status(this.status);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_statusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.status = enumResult;
    }
  }

  checkParameterType_specialRequestIds(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_specialRequestIds() {
    if (this.specialRequestIds == null) return;

    if (!Array.isArray(this.specialRequestIds)) {
      throw new BadRequestError("errMsg_specialRequestIdsMustBeAnArray");
    }

    // Parameter Type: ID

    this.specialRequestIds.forEach((item) => {
      if (!this.checkParameterType_specialRequestIds(item)) {
        throw new BadRequestError(
          "errMsg_specialRequestIdsArrayHasAnInvalidItem",
        );
      }
    });
  }

  checkParameterType_paymentStatus(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["unpaid", "partial", "paid"];
    if (typeof paramValue !== "string") {
      if (isInt(paramValue)) {
        paramValue = Number(paramValue);
        if (paramValue >= 0 && paramValue <= enumOptions.length - 1) {
          paramValue = enumOptions[paramValue];
          return paramValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!enumOptions.includes(paramValue.toLowerCase())) {
      return false;
    }

    return true;
  }

  checkParameter_paymentStatus() {
    if (this.paymentStatus == null) return;

    if (Array.isArray(this.paymentStatus)) {
      throw new BadRequestError("errMsg_paymentStatusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_paymentStatus(
      this.paymentStatus,
    );
    if (enumResult === false) {
      throw new BadRequestError("errMsg_paymentStatusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.paymentStatus = enumResult;
    }
  }

  checkParameterType_totalAmount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_totalAmount() {
    if (this.totalAmount == null) return;

    if (Array.isArray(this.totalAmount)) {
      throw new BadRequestError("errMsg_totalAmountMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_totalAmount(this.totalAmount)) {
      throw new BadRequestError("errMsg_totalAmountTypeIsNotValid");
    }
  }

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameterType_numGuests(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_numGuests() {
    if (this.numGuests == null) return;

    if (Array.isArray(this.numGuests)) {
      throw new BadRequestError("errMsg_numGuestsMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_numGuests(this.numGuests)) {
      throw new BadRequestError("errMsg_numGuestsTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.reservationId) this.checkParameter_reservationId();

    if (this.guestId) this.checkParameter_guestId();

    if (this.roomId) this.checkParameter_roomId();

    if (this.packageIds) this.checkParameter_packageIds();

    if (this.checkInDate) this.checkParameter_checkInDate();

    if (this.checkOutDate) this.checkParameter_checkOutDate();

    if (this.status) this.checkParameter_status();

    if (this.specialRequestIds) this.checkParameter_specialRequestIds();

    if (this.paymentStatus) this.checkParameter_paymentStatus();

    if (this.totalAmount) this.checkParameter_totalAmount();

    if (this.notes) this.checkParameter_notes();

    if (this.numGuests) this.checkParameter_numGuests();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.reservation?._owner === this.session.userId;
  }

  async doBusiness() {
    const reservationbycode = await dbScriptCancelReservationbycode(this);
    return reservationbycode;
  }

  async addToOutput() {}

  async raiseEvent() {
    ReservationbycodeCanceledPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CancelReservationByCodeManager;
