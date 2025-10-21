const { getRoomPriceById, getIdListOfRoomPriceByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexRoomPriceData = async () => {
  const roomPriceIndexer = new ElasticIndexer("roomPrice", { isSilent: true });
  console.log("Starting to update indexes for RoomPrice");
  const idList = (await getIdListOfRoomPriceByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getRoomPriceById(chunk);
    if (dataList.length) {
      await roomPriceIndexer.indexBulkData(dataList);
      await roomPriceIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexRoomPriceData();
    console.log(
      "RoomPrice agregated data is indexed, total roomPrices:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing RoomPrice data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
