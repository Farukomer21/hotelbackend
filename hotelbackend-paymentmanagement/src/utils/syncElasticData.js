const { getPaymentById, getIdListOfPaymentByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexPaymentData = async () => {
  const paymentIndexer = new ElasticIndexer("payment", { isSilent: true });
  console.log("Starting to update indexes for Payment");
  const idList = (await getIdListOfPaymentByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getPaymentById(chunk);
    if (dataList.length) {
      await paymentIndexer.indexBulkData(dataList);
      await paymentIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexPaymentData();
    console.log(
      "Payment agregated data is indexed, total payments:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Payment data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
