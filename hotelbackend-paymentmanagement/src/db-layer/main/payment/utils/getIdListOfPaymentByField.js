const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Payment } = require("models");
const { Op } = require("sequelize");

const getIdListOfPaymentByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let paymentIdList = await Payment.findAll(options);

    if (!paymentIdList) {
      throw new NotFoundError(`Payment with the specified criteria not found`);
    }

    paymentIdList = paymentIdList.map((item) => item.id);
    return paymentIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPaymentIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfPaymentByField;
