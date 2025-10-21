const ReservationPackageManager = require("./ReservationPackageManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  ReservationpackagesListedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptListReservationpackages } = require("dbLayer");

class ListReservationPackagesManager extends ReservationPackageManager {
  constructor(request, controllerType) {
    super(request, {
      name: "listReservationPackages",
      controllerType: controllerType,
      pagination: false,
      crudType: "list",
      loginRequired: true,
    });

    this.dataName = "reservationPackages";
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
    const reservationpackages = await dbScriptListReservationpackages(this);
    return reservationpackages;
  }

  async addToOutput() {}

  async raiseEvent() {
    ReservationpackagesListedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  getSortBy() {
    return [["id", "DESC"]];
  }

  // Work Flow

  // Action Store
}

module.exports = ListReservationPackagesManager;
