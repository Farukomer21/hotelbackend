const PersonnelManager = require("./PersonnelManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PersonnelUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdatePersonnel } = require("dbLayer");

class UpdatePersonnelManager extends PersonnelManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updatePersonnel",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "personnel";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.personnelId = this.personnelId;
    jsonObj.fullName = this.fullName;
    jsonObj.jobTitle = this.jobTitle;
    jsonObj.contactNumber = this.contactNumber;
    jsonObj.email = this.email;
    jsonObj.hireDate = this.hireDate;
    jsonObj.department = this.department;
    jsonObj.status = this.status;
    jsonObj.notes = this.notes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.personnelId = request.params?.personnelId;
    this.fullName = request.body?.fullName;
    this.jobTitle = request.body?.jobTitle;
    this.contactNumber = request.body?.contactNumber;
    this.email = request.body?.email;
    this.hireDate = request.body?.hireDate;
    this.department = request.body?.department;
    this.status = request.body?.status;
    this.notes = request.body?.notes;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.personnelId = request.mcpParams.personnelId;
    this.fullName = request.mcpParams.fullName;
    this.jobTitle = request.mcpParams.jobTitle;
    this.contactNumber = request.mcpParams.contactNumber;
    this.email = request.mcpParams.email;
    this.hireDate = request.mcpParams.hireDate;
    this.department = request.mcpParams.department;
    this.status = request.mcpParams.status;
    this.notes = request.mcpParams.notes;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.personnelId }, { isActive: true }] };

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
      fullName: this.fullName,
      jobTitle: this.jobTitle,
      contactNumber: this.contactNumber,
      email: this.email,
      hireDate: this.hireDate,
      department: this.department,
      status: this.status,
      notes: this.notes,
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
    const { getPersonnelByQuery } = require("dbLayer");
    this.personnel = await getPersonnelByQuery(this.whereClause);
    if (!this.personnel) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.personnel;
  }

  async checkInstance() {
    if (!this.personnel) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_personnelId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_personnelId() {
    if (this.personnelId == null) {
      throw new BadRequestError("errMsg_personnelIdisRequired");
    }

    if (Array.isArray(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_personnelId(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdTypeIsNotValid");
    }
  }

  checkParameter_fullName() {
    if (this.fullName == null) return;

    if (Array.isArray(this.fullName)) {
      throw new BadRequestError("errMsg_fullNameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_jobTitle() {
    if (this.jobTitle == null) return;

    if (Array.isArray(this.jobTitle)) {
      throw new BadRequestError("errMsg_jobTitleMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_contactNumber() {
    if (this.contactNumber == null) return;

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

  checkParameterType_hireDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_hireDate() {
    if (this.hireDate == null) return;

    if (Array.isArray(this.hireDate)) {
      throw new BadRequestError("errMsg_hireDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_hireDate(this.hireDate)) {
      throw new BadRequestError("errMsg_hireDateTypeIsNotValid");
    }
  }

  checkParameter_department() {
    if (this.department == null) return;

    if (Array.isArray(this.department)) {
      throw new BadRequestError("errMsg_departmentMustNotBeAnArray");
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

    const enumOptions = ["active", "inactive", "terminated"];
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

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameters() {
    if (this.personnelId) this.checkParameter_personnelId();

    if (this.fullName) this.checkParameter_fullName();

    if (this.jobTitle) this.checkParameter_jobTitle();

    if (this.contactNumber) this.checkParameter_contactNumber();

    if (this.email) this.checkParameter_email();

    if (this.hireDate) this.checkParameter_hireDate();

    if (this.department) this.checkParameter_department();

    if (this.status) this.checkParameter_status();

    if (this.notes) this.checkParameter_notes();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.personnel?._owner === this.session.userId;
  }

  async doBusiness() {
    const personnel = await dbScriptUpdatePersonnel(this);
    return personnel;
  }

  async addToOutput() {}

  async raiseEvent() {
    PersonnelUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdatePersonnelManager;
