const { HttpServerError, BadRequestError } = require("common");

const { Feedback } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getFeedbackByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const feedback = await Feedback.findOne({
      where: query,
    });

    if (!feedback) return null;
    return feedback.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingFeedbackByQuery",
      err,
    );
  }
};

module.exports = getFeedbackByQuery;
