const SpecialRequestManager = require("./SpecialRequestManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  SpecialrequestUpdatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateSpecialrequest } = require("dbLayer");

class UpdateSpecialRequestManager extends SpecialRequestManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateSpecialRequest",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "specialRequest";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.specialRequestId = this.specialRequestId;
    jsonObj.status = this.status;
    jsonObj.staffNote = this.staffNote;
    jsonObj.resolvedAt = this.resolvedAt;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.specialRequestId = request.params?.specialRequestId;
    this.status = request.body?.status;
    this.staffNote = request.body?.staffNote;
    this.resolvedAt = request.body?.resolvedAt;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.specialRequestId = request.mcpParams.specialRequestId;
    this.status = request.mcpParams.status;
    this.staffNote = request.mcpParams.staffNote;
    this.resolvedAt = request.mcpParams.resolvedAt;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.specialRequestId }, { isActive: true }] };

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
      status: this.status,
      staffNote: this.staffNote,
      resolvedAt: this.resolvedAt,
    };

    dataClause.resolvedAt = ["fulfilled", "denied"].includes(this.status)
      ? this.resolvedAt || new Date()
      : null;
    this.resolvedAt = dataClause.resolvedAt;

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
    const { getSpecialRequestByQuery } = require("dbLayer");
    this.specialRequest = await getSpecialRequestByQuery(this.whereClause);
    if (!this.specialRequest) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.specialRequest;
  }

  async checkInstance() {
    if (!this.specialRequest) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_specialRequestId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_specialRequestId() {
    if (this.specialRequestId == null) {
      throw new BadRequestError("errMsg_specialRequestIdisRequired");
    }

    if (Array.isArray(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_specialRequestId(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdTypeIsNotValid");
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

    const enumOptions = ["requested", "inprogress", "fulfilled", "denied"];
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

  checkParameter_staffNote() {
    if (this.staffNote == null) return;

    if (Array.isArray(this.staffNote)) {
      throw new BadRequestError("errMsg_staffNoteMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameters() {
    if (this.specialRequestId) this.checkParameter_specialRequestId();

    if (this.status) this.checkParameter_status();

    if (this.staffNote) this.checkParameter_staffNote();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.specialRequest?._owner === this.session.userId;
  }

  async doBusiness() {
    const specialrequest = await dbScriptUpdateSpecialrequest(this);
    return specialrequest;
  }

  async addToOutput() {}

  async raiseEvent() {
    SpecialrequestUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateSpecialRequestManager;
