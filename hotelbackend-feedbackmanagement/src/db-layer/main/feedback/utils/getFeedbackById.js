const { HttpServerError } = require("common");

let { Feedback } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getFeedbackById = async (feedbackId) => {
  try {
    const feedback = Array.isArray(feedbackId)
      ? await Feedback.findAll({
          where: {
            id: { [Op.in]: feedbackId },
            isActive: true,
          },
        })
      : await Feedback.findOne({
          where: {
            id: feedbackId,
            isActive: true,
          },
        });

    if (!feedback) {
      return null;
    }
    return Array.isArray(feedbackId)
      ? feedback.map((item) => item.getData())
      : feedback.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingFeedbackById", err);
  }
};

module.exports = getFeedbackById;
