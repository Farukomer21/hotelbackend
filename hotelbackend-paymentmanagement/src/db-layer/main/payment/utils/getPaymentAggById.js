const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Payment } = require("models");
const { Op } = require("sequelize");

const getPaymentAggById = async (paymentId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const payment = Array.isArray(paymentId)
      ? await Payment.findAll({
          where: {
            id: { [Op.in]: paymentId },
            isActive: true,
          },
          include: includes,
        })
      : await Payment.findOne({
          where: {
            id: paymentId,
            isActive: true,
          },
          include: includes,
        });

    if (!payment) {
      return null;
    }

    const paymentData =
      Array.isArray(paymentId) && paymentId.length > 0
        ? payment.map((item) => item.getData())
        : payment.getData();
    await Payment.getCqrsJoins(paymentData);
    return paymentData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPaymentAggById",
      err,
    );
  }
};

module.exports = getPaymentAggById;
