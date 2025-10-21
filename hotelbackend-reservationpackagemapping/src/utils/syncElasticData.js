const {
  getReservationPackageById,
  getIdListOfReservationPackageByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexReservationPackageData = async () => {
  const reservationPackageIndexer = new ElasticIndexer("reservationPackage", {
    isSilent: true,
  });
  console.log("Starting to update indexes for ReservationPackage");
  const idList = (await getIdListOfReservationPackageByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getReservationPackageById(chunk);
    if (dataList.length) {
      await reservationPackageIndexer.indexBulkData(dataList);
      await reservationPackageIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexReservationPackageData();
    console.log(
      "ReservationPackage agregated data is indexed, total reservationPackages:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing ReservationPackage data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
