const { getFeedbackById, getIdListOfFeedbackByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexFeedbackData = async () => {
  const feedbackIndexer = new ElasticIndexer("feedback", { isSilent: true });
  console.log("Starting to update indexes for Feedback");
  const idList = (await getIdListOfFeedbackByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getFeedbackById(chunk);
    if (dataList.length) {
      await feedbackIndexer.indexBulkData(dataList);
      await feedbackIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexFeedbackData();
    console.log(
      "Feedback agregated data is indexed, total feedbacks:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Feedback data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
