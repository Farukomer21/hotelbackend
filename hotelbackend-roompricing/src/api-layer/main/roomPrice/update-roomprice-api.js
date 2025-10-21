const RoomPriceManager = require("./RoomPriceManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoompriceUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateRoomprice } = require("dbLayer");

class UpdateRoomPriceManager extends RoomPriceManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateRoomPrice",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "roomPrice";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.roomPriceId = this.roomPriceId;
    jsonObj.price = this.price;
    jsonObj.validFrom = this.validFrom;
    jsonObj.validTo = this.validTo;
    jsonObj.reason = this.reason;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.roomPriceId = request.params?.roomPriceId;
    this.price = request.body?.price;
    this.validFrom = request.body?.validFrom;
    this.validTo = request.body?.validTo;
    this.reason = request.body?.reason;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.roomPriceId = request.mcpParams.roomPriceId;
    this.price = request.mcpParams.price;
    this.validFrom = request.mcpParams.validFrom;
    this.validTo = request.mcpParams.validTo;
    this.reason = request.mcpParams.reason;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.roomPriceId }, { isActive: true }] };

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
      price: this.price,
      validFrom: this.validFrom,
      validTo: this.validTo,
      reason: this.reason,
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
    const { getRoomPriceByQuery } = require("dbLayer");
    this.roomPrice = await getRoomPriceByQuery(this.whereClause);
    if (!this.roomPrice) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.roomPrice;
  }

  async checkInstance() {
    if (!this.roomPrice) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_roomPriceId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomPriceId() {
    if (this.roomPriceId == null) {
      throw new BadRequestError("errMsg_roomPriceIdisRequired");
    }

    if (Array.isArray(this.roomPriceId)) {
      throw new BadRequestError("errMsg_roomPriceIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_roomPriceId(this.roomPriceId)) {
      throw new BadRequestError("errMsg_roomPriceIdTypeIsNotValid");
    }
  }

  checkParameterType_price(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_price() {
    if (this.price == null) return;

    if (Array.isArray(this.price)) {
      throw new BadRequestError("errMsg_priceMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_price(this.price)) {
      throw new BadRequestError("errMsg_priceTypeIsNotValid");
    }
  }

  checkParameterType_validFrom(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_validFrom() {
    if (this.validFrom == null) return;

    if (Array.isArray(this.validFrom)) {
      throw new BadRequestError("errMsg_validFromMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_validFrom(this.validFrom)) {
      throw new BadRequestError("errMsg_validFromTypeIsNotValid");
    }
  }

  checkParameterType_validTo(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_validTo() {
    if (this.validTo == null) return;

    if (Array.isArray(this.validTo)) {
      throw new BadRequestError("errMsg_validToMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_validTo(this.validTo)) {
      throw new BadRequestError("errMsg_validToTypeIsNotValid");
    }
  }

  checkParameter_reason() {
    if (this.reason == null) return;

    if (Array.isArray(this.reason)) {
      throw new BadRequestError("errMsg_reasonMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.roomPriceId) this.checkParameter_roomPriceId();

    if (this.price) this.checkParameter_price();

    if (this.validFrom) this.checkParameter_validFrom();

    if (this.validTo) this.checkParameter_validTo();

    if (this.reason) this.checkParameter_reason();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.roomPrice?._owner === this.session.userId;
  }

  async doBusiness() {
    const roomprice = await dbScriptUpdateRoomprice(this);
    return roomprice;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoompriceUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateRoomPriceManager;
