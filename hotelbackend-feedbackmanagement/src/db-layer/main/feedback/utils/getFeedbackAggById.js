const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Feedback } = require("models");
const { Op } = require("sequelize");

const getFeedbackAggById = async (feedbackId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const feedback = Array.isArray(feedbackId)
      ? await Feedback.findAll({
          where: {
            id: { [Op.in]: feedbackId },
            isActive: true,
          },
          include: includes,
        })
      : await Feedback.findOne({
          where: {
            id: feedbackId,
            isActive: true,
          },
          include: includes,
        });

    if (!feedback) {
      return null;
    }

    const feedbackData =
      Array.isArray(feedbackId) && feedbackId.length > 0
        ? feedback.map((item) => item.getData())
        : feedback.getData();
    await Feedback.getCqrsJoins(feedbackData);
    return feedbackData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingFeedbackAggById",
      err,
    );
  }
};

module.exports = getFeedbackAggById;
