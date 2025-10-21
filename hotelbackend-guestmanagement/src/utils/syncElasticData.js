const { getGuestById, getIdListOfGuestByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexGuestData = async () => {
  const guestIndexer = new ElasticIndexer("guest", { isSilent: true });
  console.log("Starting to update indexes for Guest");
  const idList = (await getIdListOfGuestByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getGuestById(chunk);
    if (dataList.length) {
      await guestIndexer.indexBulkData(dataList);
      await guestIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexGuestData();
    console.log("Guest agregated data is indexed, total guests:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Guest data", err.toString());
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
