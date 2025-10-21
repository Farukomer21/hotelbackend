const { HttpServerError, BadRequestError } = require("common");

const { Payment } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPaymentByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const payment = await Payment.findOne({
      where: query,
    });

    if (!payment) return null;
    return payment.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPaymentByQuery",
      err,
    );
  }
};

module.exports = getPaymentByQuery;
