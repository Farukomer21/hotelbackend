const { HttpServerError } = require("common");

let { Payment } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getPaymentById = async (paymentId) => {
  try {
    const payment = Array.isArray(paymentId)
      ? await Payment.findAll({
          where: {
            id: { [Op.in]: paymentId },
            isActive: true,
          },
        })
      : await Payment.findOne({
          where: {
            id: paymentId,
            isActive: true,
          },
        });

    if (!payment) {
      return null;
    }
    return Array.isArray(paymentId)
      ? payment.map((item) => item.getData())
      : payment.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingPaymentById", err);
  }
};

module.exports = getPaymentById;
