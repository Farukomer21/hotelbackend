const { HttpServerError, BadRequestError } = require("common");

const { Feedback } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getFeedbackListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const feedback = await Feedback.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!feedback || feedback.length === 0) return [];

    //      if (!feedback || feedback.length === 0) {
    //      throw new NotFoundError(
    //      `Feedback with the specified criteria not found`
    //  );
    //}

    return feedback.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingFeedbackListByQuery",
      err,
    );
  }
};

module.exports = getFeedbackListByQuery;
