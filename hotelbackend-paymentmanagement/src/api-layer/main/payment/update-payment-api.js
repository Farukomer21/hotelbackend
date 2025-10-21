const PaymentManager = require("./PaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PaymentUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdatePayment } = require("dbLayer");

class UpdatePaymentManager extends PaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updatePayment",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "payment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.paymentId = this.paymentId;
    jsonObj.amount = this.amount;
    jsonObj.currency = this.currency;
    jsonObj.paymentMethod = this.paymentMethod;
    jsonObj.paidAt = this.paidAt;
    jsonObj.status = this.status;
    jsonObj.reference = this.reference;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.paymentId = request.params?.paymentId;
    this.amount = request.body?.amount;
    this.currency = request.body?.currency;
    this.paymentMethod = request.body?.paymentMethod;
    this.paidAt = request.body?.paidAt;
    this.status = request.body?.status;
    this.reference = request.body?.reference;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.paymentId = request.mcpParams.paymentId;
    this.amount = request.mcpParams.amount;
    this.currency = request.mcpParams.currency;
    this.paymentMethod = request.mcpParams.paymentMethod;
    this.paidAt = request.mcpParams.paidAt;
    this.status = request.mcpParams.status;
    this.reference = request.mcpParams.reference;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.paymentId }, { isActive: true }] };

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
      amount: this.amount,
      currency: this.currency,
      paymentMethod: this.paymentMethod,
      paidAt: this.paidAt,
      status: this.status,
      reference: this.reference,
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
    const { getPaymentByQuery } = require("dbLayer");
    this.payment = await getPaymentByQuery(this.whereClause);
    if (!this.payment) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.payment;
  }

  async checkInstance() {
    if (!this.payment) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_paymentId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_paymentId() {
    if (this.paymentId == null) {
      throw new BadRequestError("errMsg_paymentIdisRequired");
    }

    if (Array.isArray(this.paymentId)) {
      throw new BadRequestError("errMsg_paymentIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_paymentId(this.paymentId)) {
      throw new BadRequestError("errMsg_paymentIdTypeIsNotValid");
    }
  }

  checkParameterType_amount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_amount() {
    if (this.amount == null) return;

    if (Array.isArray(this.amount)) {
      throw new BadRequestError("errMsg_amountMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_amount(this.amount)) {
      throw new BadRequestError("errMsg_amountTypeIsNotValid");
    }
  }

  checkParameter_currency() {
    if (this.currency == null) return;

    if (Array.isArray(this.currency)) {
      throw new BadRequestError("errMsg_currencyMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_paymentMethod(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["cash", "card", "transfer", "other"];
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

  checkParameter_paymentMethod() {
    if (this.paymentMethod == null) return;

    if (Array.isArray(this.paymentMethod)) {
      throw new BadRequestError("errMsg_paymentMethodMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_paymentMethod(
      this.paymentMethod,
    );
    if (enumResult === false) {
      throw new BadRequestError("errMsg_paymentMethodTypeIsNotValid");
    } else if (enumResult !== true) {
      this.paymentMethod = enumResult;
    }
  }

  checkParameterType_paidAt(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_paidAt() {
    if (this.paidAt == null) return;

    if (Array.isArray(this.paidAt)) {
      throw new BadRequestError("errMsg_paidAtMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_paidAt(this.paidAt)) {
      throw new BadRequestError("errMsg_paidAtTypeIsNotValid");
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

    const enumOptions = ["pending", "paid", "failed", "partiallypaid"];
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

  checkParameter_reference() {
    if (this.reference == null) return;

    if (Array.isArray(this.reference)) {
      throw new BadRequestError("errMsg_referenceMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.paymentId) this.checkParameter_paymentId();

    if (this.amount) this.checkParameter_amount();

    if (this.currency) this.checkParameter_currency();

    if (this.paymentMethod) this.checkParameter_paymentMethod();

    if (this.paidAt) this.checkParameter_paidAt();

    if (this.status) this.checkParameter_status();

    if (this.reference) this.checkParameter_reference();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.payment?._owner === this.session.userId;
  }

  async doBusiness() {
    const payment = await dbScriptUpdatePayment(this);
    return payment;
  }

  async addToOutput() {}

  async raiseEvent() {
    PaymentUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = UpdatePaymentManager;
