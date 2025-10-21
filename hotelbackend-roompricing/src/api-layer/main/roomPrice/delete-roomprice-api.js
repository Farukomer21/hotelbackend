const RoomPriceManager = require("./RoomPriceManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoompriceDeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteRoomprice } = require("dbLayer");

class DeleteRoomPriceManager extends RoomPriceManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteRoomPrice",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "roomPrice";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.roomPriceId = this.roomPriceId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.roomPriceId = request.params?.roomPriceId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.roomPriceId = request.mcpParams.roomPriceId;
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

  checkParameters() {
    if (this.roomPriceId) this.checkParameter_roomPriceId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.roomPrice?._owner === this.session.userId;
  }

  async doBusiness() {
    const roomprice = await dbScriptDeleteRoomprice(this);
    return roomprice;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoompriceDeletedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteRoomPriceManager;
