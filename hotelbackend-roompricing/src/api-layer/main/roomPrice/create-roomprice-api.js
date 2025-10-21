const RoomPriceManager = require("./RoomPriceManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoompriceCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateRoomprice } = require("dbLayer");

class CreateRoomPriceManager extends RoomPriceManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createRoomPrice",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "roomPrice";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.roomPriceId = this.roomPriceId;
    jsonObj.roomId = this.roomId;
    jsonObj.price = this.price;
    jsonObj.validFrom = this.validFrom;
    jsonObj.validTo = this.validTo;
    jsonObj.reason = this.reason;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.roomPriceId = request.body?.roomPriceId;
    this.roomId = request.body?.roomId;
    this.price = request.body?.price;
    this.validFrom = request.body?.validFrom;
    this.validTo = request.body?.validTo;
    this.reason = request.body?.reason;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.roomPriceId = request.mcpParams.roomPriceId;
    this.roomId = request.mcpParams.roomId;
    this.price = request.mcpParams.price;
    this.validFrom = request.mcpParams.validFrom;
    this.validTo = request.mcpParams.validTo;
    this.reason = request.mcpParams.reason;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.roomPriceId = this.id;
    if (!this.roomPriceId) this.roomPriceId = newUUID(false);

    const dataClause = {
      id: this.roomPriceId,
      roomId: this.roomId,
      price: this.price,
      validFrom: this.validFrom,
      validTo: this.validTo,
      reason: this.reason,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_roomPriceId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomPriceId() {
    if (this.roomPriceId == null) return;

    if (Array.isArray(this.roomPriceId)) {
      throw new BadRequestError("errMsg_roomPriceIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_roomPriceId(this.roomPriceId)) {
      throw new BadRequestError("errMsg_roomPriceIdTypeIsNotValid");
    }
  }

  checkParameterType_roomId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomId() {
    if (this.roomId == null) {
      throw new BadRequestError("errMsg_roomIdisRequired");
    }

    if (Array.isArray(this.roomId)) {
      throw new BadRequestError("errMsg_roomIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_roomId(this.roomId)) {
      throw new BadRequestError("errMsg_roomIdTypeIsNotValid");
    }
  }

  checkParameterType_price(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_price() {
    if (this.price == null) {
      throw new BadRequestError("errMsg_priceisRequired");
    }

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
    if (this.validFrom == null) {
      throw new BadRequestError("errMsg_validFromisRequired");
    }

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
    if (this.validTo == null) {
      throw new BadRequestError("errMsg_validToisRequired");
    }

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

    if (this.roomId) this.checkParameter_roomId();

    if (this.price) this.checkParameter_price();

    if (this.validFrom) this.checkParameter_validFrom();

    if (this.validTo) this.checkParameter_validTo();

    if (this.reason) this.checkParameter_reason();
  }

  async doBusiness() {
    const roomprice = await dbScriptCreateRoomprice(this);
    return roomprice;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoompriceCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateRoomPriceManager;
