const RoomManager = require("./RoomManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoomUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateRoom } = require("dbLayer");

class UpdateRoomManager extends RoomManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateRoom",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "room";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.roomId = this.roomId;
    jsonObj.roomNumber = this.roomNumber;
    jsonObj.type = this.type;
    jsonObj.amenities = this.amenities;
    jsonObj.floor = this.floor;
    jsonObj.description = this.description;
    jsonObj.occupancyLimit = this.occupancyLimit;
    jsonObj.status = this.status;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.roomId = request.params?.roomId;
    this.roomNumber = request.body?.roomNumber;
    this.type = request.body?.type;
    this.amenities = request.body?.amenities;
    this.floor = request.body?.floor;
    this.description = request.body?.description;
    this.occupancyLimit = request.body?.occupancyLimit;
    this.status = request.body?.status;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.roomId = request.mcpParams.roomId;
    this.roomNumber = request.mcpParams.roomNumber;
    this.type = request.mcpParams.type;
    this.amenities = request.mcpParams.amenities;
    this.floor = request.mcpParams.floor;
    this.description = request.mcpParams.description;
    this.occupancyLimit = request.mcpParams.occupancyLimit;
    this.status = request.mcpParams.status;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.roomId }, { isActive: true }] };

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
      roomNumber: this.roomNumber,
      type: this.type,
      amenities: this.amenities
        ? this.amenities
        : this.amenities_remove
          ? sequelize.fn(
              "array_remove",
              sequelize.col("amenities"),
              this.amenities_remove,
            )
          : this.amenities_append
            ? sequelize.fn(
                "array_append",
                sequelize.col("amenities"),
                this.amenities_append,
              )
            : undefined,
      floor: this.floor,
      description: this.description,
      occupancyLimit: this.occupancyLimit,
      status: this.status,
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
    const { getRoomByQuery } = require("dbLayer");
    this.room = await getRoomByQuery(this.whereClause);
    if (!this.room) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.room;
  }

  async checkInstance() {
    if (!this.room) {
      throw new NotFoundError("errMsg_RecordNotFound");
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

  checkParameter_roomNumber() {
    if (this.roomNumber == null) return;

    if (Array.isArray(this.roomNumber)) {
      throw new BadRequestError("errMsg_roomNumberMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_type(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = [
      "single",
      "double",
      "suite",
      "family",
      "deluxe",
      "accessible",
      "other",
    ];
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

  checkParameter_type() {
    if (this.type == null) return;

    if (Array.isArray(this.type)) {
      throw new BadRequestError("errMsg_typeMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_type(this.type);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_typeTypeIsNotValid");
    } else if (enumResult !== true) {
      this.type = enumResult;
    }
  }

  checkParameter_amenities() {
    if (this.amenities == null) return;

    if (!Array.isArray(this.amenities)) {
      throw new BadRequestError("errMsg_amenitiesMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_floor(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_floor() {
    if (this.floor == null) return;

    if (Array.isArray(this.floor)) {
      throw new BadRequestError("errMsg_floorMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_floor(this.floor)) {
      throw new BadRequestError("errMsg_floorTypeIsNotValid");
    }
  }

  checkParameter_description() {
    if (this.description == null) return;

    if (Array.isArray(this.description)) {
      throw new BadRequestError("errMsg_descriptionMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameterType_occupancyLimit(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_occupancyLimit() {
    if (this.occupancyLimit == null) return;

    if (Array.isArray(this.occupancyLimit)) {
      throw new BadRequestError("errMsg_occupancyLimitMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_occupancyLimit(this.occupancyLimit)) {
      throw new BadRequestError("errMsg_occupancyLimitTypeIsNotValid");
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

    const enumOptions = [
      "available",
      "occupied",
      "maintenance",
      "outofservice",
    ];
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

  checkParameters() {
    if (this.roomId) this.checkParameter_roomId();

    if (this.roomNumber) this.checkParameter_roomNumber();

    if (this.type) this.checkParameter_type();

    if (this.amenities) this.checkParameter_amenities();

    if (this.floor) this.checkParameter_floor();

    if (this.description) this.checkParameter_description();

    if (this.occupancyLimit) this.checkParameter_occupancyLimit();

    if (this.status) this.checkParameter_status();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.room?._owner === this.session.userId;
  }

  async doBusiness() {
    const room = await dbScriptUpdateRoom(this);
    return room;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoomUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateRoomManager;
