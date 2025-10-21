const { HttpServerError } = require("common");

const { Payment } = require("models");
const { Op } = require("sequelize");

const updatePaymentByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Payment.update(dataClause, options);
    const paymentIdList = rows.map((item) => item.id);
    return paymentIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingPaymentByIdList", err);
  }
};

module.exports = updatePaymentByIdList;
