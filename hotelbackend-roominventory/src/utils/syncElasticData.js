const { getRoomById, getIdListOfRoomByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexRoomData = async () => {
  const roomIndexer = new ElasticIndexer("room", { isSilent: true });
  console.log("Starting to update indexes for Room");
  const idList = (await getIdListOfRoomByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getRoomById(chunk);
    if (dataList.length) {
      await roomIndexer.indexBulkData(dataList);
      await roomIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexRoomData();
    console.log("Room agregated data is indexed, total rooms:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Room data", err.toString());
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
