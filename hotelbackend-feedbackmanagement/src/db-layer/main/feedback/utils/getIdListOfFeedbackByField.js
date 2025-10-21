const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Feedback } = require("models");
const { Op } = require("sequelize");

const getIdListOfFeedbackByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let feedbackIdList = await Feedback.findAll(options);

    if (!feedbackIdList) {
      throw new NotFoundError(`Feedback with the specified criteria not found`);
    }

    feedbackIdList = feedbackIdList.map((item) => item.id);
    return feedbackIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingFeedbackIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfFeedbackByField;
