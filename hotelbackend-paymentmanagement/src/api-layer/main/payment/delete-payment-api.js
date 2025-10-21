const PaymentManager = require("./PaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PaymentDeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeletePayment } = require("dbLayer");

class DeletePaymentManager extends PaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deletePayment",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "payment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.paymentId = this.paymentId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.paymentId = request.params?.paymentId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.paymentId = request.mcpParams.paymentId;
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

  checkParameters() {
    if (this.paymentId) this.checkParameter_paymentId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.payment?._owner === this.session.userId;
  }

  async doBusiness() {
    const payment = await dbScriptDeletePayment(this);
    return payment;
  }

  async addToOutput() {}

  async raiseEvent() {
    PaymentDeletedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = DeletePaymentManager;
