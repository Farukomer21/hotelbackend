const GuestManager = require("./GuestManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { GuestCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateGuest } = require("dbLayer");

class CreateGuestManager extends GuestManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createGuest",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "guest";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.guestId = this.guestId;
    jsonObj.fullName = this.fullName;
    jsonObj.contactNumber = this.contactNumber;
    jsonObj.email = this.email;
    jsonObj.address = this.address;
    jsonObj.identificationType = this.identificationType;
    jsonObj.identificationNumber = this.identificationNumber;
    jsonObj.notes = this.notes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.guestId = request.body?.guestId;
    this.fullName = request.body?.fullName;
    this.contactNumber = request.body?.contactNumber;
    this.email = request.body?.email;
    this.address = request.body?.address;
    this.identificationType = request.body?.identificationType;
    this.identificationNumber = request.body?.identificationNumber;
    this.notes = request.body?.notes;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.guestId = request.mcpParams.guestId;
    this.fullName = request.mcpParams.fullName;
    this.contactNumber = request.mcpParams.contactNumber;
    this.email = request.mcpParams.email;
    this.address = request.mcpParams.address;
    this.identificationType = request.mcpParams.identificationType;
    this.identificationNumber = request.mcpParams.identificationNumber;
    this.notes = request.mcpParams.notes;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.guestId = this.id;
    if (!this.guestId) this.guestId = newUUID(false);

    const dataClause = {
      id: this.guestId,
      fullName: this.fullName,
      contactNumber: this.contactNumber,
      email: this.email,
      address: this.address,
      identificationType: this.identificationType,
      identificationNumber: this.identificationNumber,
      notes: this.notes,
      isActive: true,
    };

    return dataClause;
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

  checkParameter_fullName() {
    if (this.fullName == null) {
      throw new BadRequestError("errMsg_fullNameisRequired");
    }

    if (Array.isArray(this.fullName)) {
      throw new BadRequestError("errMsg_fullNameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_contactNumber() {
    if (this.contactNumber == null) {
      throw new BadRequestError("errMsg_contactNumberisRequired");
    }

    if (Array.isArray(this.contactNumber)) {
      throw new BadRequestError("errMsg_contactNumberMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_email() {
    if (this.email == null) return;

    if (Array.isArray(this.email)) {
      throw new BadRequestError("errMsg_emailMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_address() {
    if (this.address == null) return;

    if (Array.isArray(this.address)) {
      throw new BadRequestError("errMsg_addressMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameter_identificationType() {
    if (this.identificationType == null) return;

    if (Array.isArray(this.identificationType)) {
      throw new BadRequestError("errMsg_identificationTypeMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_identificationNumber() {
    if (this.identificationNumber == null) return;

    if (Array.isArray(this.identificationNumber)) {
      throw new BadRequestError("errMsg_identificationNumberMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameters() {
    if (this.guestId) this.checkParameter_guestId();

    if (this.fullName) this.checkParameter_fullName();

    if (this.contactNumber) this.checkParameter_contactNumber();

    if (this.email) this.checkParameter_email();

    if (this.address) this.checkParameter_address();

    if (this.identificationType) this.checkParameter_identificationType();

    if (this.identificationNumber) this.checkParameter_identificationNumber();

    if (this.notes) this.checkParameter_notes();
  }

  async doBusiness() {
    const guest = await dbScriptCreateGuest(this);
    return guest;
  }

  async addToOutput() {}

  async raiseEvent() {
    GuestCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateGuestManager;
