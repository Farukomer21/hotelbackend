const { getPersonnelById, getIdListOfPersonnelByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexPersonnelData = async () => {
  const personnelIndexer = new ElasticIndexer("personnel", { isSilent: true });
  console.log("Starting to update indexes for Personnel");
  const idList = (await getIdListOfPersonnelByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getPersonnelById(chunk);
    if (dataList.length) {
      await personnelIndexer.indexBulkData(dataList);
      await personnelIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexPersonnelData();
    console.log(
      "Personnel agregated data is indexed, total personnels:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Personnel data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
