const {
  getReservationById,
  getIdListOfReservationByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexReservationData = async () => {
  const reservationIndexer = new ElasticIndexer("reservation", {
    isSilent: true,
  });
  console.log("Starting to update indexes for Reservation");
  const idList = (await getIdListOfReservationByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getReservationById(chunk);
    if (dataList.length) {
      await reservationIndexer.indexBulkData(dataList);
      await reservationIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexReservationData();
    console.log(
      "Reservation agregated data is indexed, total reservations:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Reservation data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
