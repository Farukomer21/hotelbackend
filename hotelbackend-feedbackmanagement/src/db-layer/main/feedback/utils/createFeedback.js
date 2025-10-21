const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Feedback } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("feedback");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["reservationId", "rating", "comment", "category"];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createFeedback = async (data) => {
  try {
    validateData(data);

    const current_feedback = data.id ? await Feedback.findByPk(data.id) : null;
    let newfeedback = null;

    if (current_feedback) {
      delete data.id;
      data.isActive = true;
      await current_feedback.update(data);
      newfeedback = current_feedback;
    }

    if (!newfeedback) {
      newfeedback = await Feedback.create(data);
    }

    const _data = newfeedback.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingFeedback", err);
  }
};

module.exports = createFeedback;
