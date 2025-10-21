const SpecialRequestManager = require("./SpecialRequestManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  SpecialrequestCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateSpecialrequest } = require("dbLayer");

class CreateSpecialRequestManager extends SpecialRequestManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createSpecialRequest",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "specialRequest";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.specialRequestId = this.specialRequestId;
    jsonObj.reservationId = this.reservationId;
    jsonObj.requestText = this.requestText;
    jsonObj.status = this.status;
    jsonObj.staffNote = this.staffNote;
    jsonObj.submittedAt = this.submittedAt;
    jsonObj.resolvedAt = this.resolvedAt;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.specialRequestId = request.body?.specialRequestId;
    this.reservationId = request.body?.reservationId;
    this.requestText = request.body?.requestText;
    this.status = request.body?.status;
    this.staffNote = request.body?.staffNote;
    this.submittedAt = request.body?.submittedAt;
    this.resolvedAt = request.body?.resolvedAt;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.specialRequestId = request.mcpParams.specialRequestId;
    this.reservationId = request.mcpParams.reservationId;
    this.requestText = request.mcpParams.requestText;
    this.status = request.mcpParams.status;
    this.staffNote = request.mcpParams.staffNote;
    this.submittedAt = request.mcpParams.submittedAt;
    this.resolvedAt = request.mcpParams.resolvedAt;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.specialRequestId = this.id;
    if (!this.specialRequestId) this.specialRequestId = newUUID(false);

    const dataClause = {
      id: this.specialRequestId,
      reservationId: this.reservationId,
      requestText: this.requestText,
      status: this.status,
      staffNote: this.staffNote,
      submittedAt: this.submittedAt,
      resolvedAt: this.resolvedAt,
      isActive: true,
    };

    dataClause.submittedAt = this.submittedAt || new Date();
    this.submittedAt = dataClause.submittedAt;
    dataClause.resolvedAt = ["fulfilled", "denied"].includes(this.status)
      ? this.resolvedAt || new Date()
      : null;
    this.resolvedAt = dataClause.resolvedAt;

    return dataClause;
  }

  checkParameterType_specialRequestId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_specialRequestId() {
    if (this.specialRequestId == null) return;

    if (Array.isArray(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_specialRequestId(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdTypeIsNotValid");
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

  checkParameter_requestText() {
    if (this.requestText == null) {
      throw new BadRequestError("errMsg_requestTextisRequired");
    }

    if (Array.isArray(this.requestText)) {
      throw new BadRequestError("errMsg_requestTextMustNotBeAnArray");
    }

    // Parameter Type: String
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
    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

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

    if (this.reservationId) this.checkParameter_reservationId();

    if (this.requestText) this.checkParameter_requestText();

    if (this.status) this.checkParameter_status();

    if (this.staffNote) this.checkParameter_staffNote();
  }

  async doBusiness() {
    const specialrequest = await dbScriptCreateSpecialrequest(this);
    return specialrequest;
  }

  async addToOutput() {}

  async raiseEvent() {
    SpecialrequestCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateSpecialRequestManager;
