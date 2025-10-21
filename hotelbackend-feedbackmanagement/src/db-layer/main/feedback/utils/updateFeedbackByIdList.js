const { HttpServerError } = require("common");

const { Feedback } = require("models");
const { Op } = require("sequelize");

const updateFeedbackByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Feedback.update(dataClause, options);
    const feedbackIdList = rows.map((item) => item.id);
    return feedbackIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingFeedbackByIdList",
      err,
    );
  }
};

module.exports = updateFeedbackByIdList;
