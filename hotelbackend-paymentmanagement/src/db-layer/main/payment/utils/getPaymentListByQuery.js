const { HttpServerError, BadRequestError } = require("common");

const { Payment } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPaymentListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const payment = await Payment.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!payment || payment.length === 0) return [];

    //      if (!payment || payment.length === 0) {
    //      throw new NotFoundError(
    //      `Payment with the specified criteria not found`
    //  );
    //}

    return payment.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPaymentListByQuery",
      err,
    );
  }
};

module.exports = getPaymentListByQuery;
