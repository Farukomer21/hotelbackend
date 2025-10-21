const {
  getSpecialRequestById,
  getIdListOfSpecialRequestByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexSpecialRequestData = async () => {
  const specialRequestIndexer = new ElasticIndexer("specialRequest", {
    isSilent: true,
  });
  console.log("Starting to update indexes for SpecialRequest");
  const idList = (await getIdListOfSpecialRequestByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getSpecialRequestById(chunk);
    if (dataList.length) {
      await specialRequestIndexer.indexBulkData(dataList);
      await specialRequestIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexSpecialRequestData();
    console.log(
      "SpecialRequest agregated data is indexed, total specialRequests:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing SpecialRequest data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
