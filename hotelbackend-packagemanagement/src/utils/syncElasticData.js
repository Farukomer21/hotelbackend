const { getPackage_ById, getIdListOfPackage_ByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexPackage_Data = async () => {
  const package_Indexer = new ElasticIndexer("package_", { isSilent: true });
  console.log("Starting to update indexes for Package_");
  const idList = (await getIdListOfPackage_ByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getPackage_ById(chunk);
    if (dataList.length) {
      await package_Indexer.indexBulkData(dataList);
      await package_Indexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexPackage_Data();
    console.log(
      "Package_ agregated data is indexed, total package_s:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Package_ data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
