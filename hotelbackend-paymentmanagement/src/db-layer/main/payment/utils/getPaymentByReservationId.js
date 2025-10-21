const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { Payment } = require("models");
const { Op } = require("sequelize");

const getPaymentByReservationId = async (reservationId) => {
  try {
    const payment = await Payment.findOne({
      where: {
        reservationId: reservationId,
        isActive: true,
      },
    });

    if (!payment) {
      return null;
    }
    return payment.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPaymentByReservationId",
      err,
    );
  }
};

module.exports = getPaymentByReservationId;
