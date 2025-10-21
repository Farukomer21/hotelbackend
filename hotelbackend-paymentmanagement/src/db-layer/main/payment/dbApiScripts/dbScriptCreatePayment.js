// This script is written as api-specific
// This script is called from the CreatePaymentManager

const { Payment } = require("models");

const { PaymentQueryCacheInvalidator } = require("./query-cache-classes");
const { HttpServerError, HttpError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { ServicePublisher } = require("serviceCommon");
const { Op } = require("sequelize");

async function raiseDbEvent(apiManager) {
  const dbEvent = apiManager.getDbEventTopic("create");

  try {
    const _publisher = new ServicePublisher(
      dbEvent,
      apiManager.payment,
      apiManager.session,
      apiManager.requestId,
    );
    _publisher.publish();
  } catch (err) {
    //**errorLog
    console.log("DbEvent cant be published", dbEvent, err);
  }
}

async function updateIfExists(dataClause) {
  const dbDoc = await Payment.findByPk(dataClause.id);
  if (dbDoc) {
    delete dataClause.id;
    dataClause.isActive = true;
    await dbDoc.update(dataClause);
    return dbDoc;
  }
  return null;
}

const dbScriptCreatePayment = async (apiManager) => {
  const dataClause = apiManager.getDataClause();

  try {
    let updated = false;
    let dbData = null;

    // check for upsert
    if (dataClause.id) {
      updated = await updateIfExists(dataClause);
      dbData = updated ? updated.getData() : null;
    }

    if (!updated) {
      const dbDoc = await Payment.create(dataClause);
      dbData = dbDoc ? dbDoc.getData() : null;
    }

    apiManager.payment = dbData;

    const elasticIndexer = new ElasticIndexer(
      "payment",
      apiManager.session,
      apiManager.requestId,
    );
    await elasticIndexer.indexData(dbData);

    // invalidate the query caches that are related with this object's old and new state
    const queryCacheInvalidator = new PaymentQueryCacheInvalidator();
    queryCacheInvalidator.invalidateCache(dbData);

    await raiseDbEvent(apiManager, dataClause);

    return dbData;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenExecuting_dbScriptCreatePayment",
      {
        whereClause: null,
        dataClause: dataClause,
        errorName: err.name,
        errorMessage: err.message,
        errorStack: err.stack,
      },
    );
  }
};

module.exports = dbScriptCreatePayment;
