const PaymentManager = require("./PaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PaymentsListedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptListPayments } = require("dbLayer");

class ListPaymentsManager extends PaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "listPayments",
      controllerType: controllerType,
      pagination: false,
      crudType: "list",
      loginRequired: true,
    });

    this.dataName = "payments";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  checkParameters() {}

  async doBusiness() {
    const payments = await dbScriptListPayments(this);
    return payments;
  }

  async addToOutput() {}

  async raiseEvent() {
    PaymentsListedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  getSortBy() {
    return [["id", "DESC"]];
  }

  // Work Flow

  // Action Store
}

module.exports = ListPaymentsManager;
