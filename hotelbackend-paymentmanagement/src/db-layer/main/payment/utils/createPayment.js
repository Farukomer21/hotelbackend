const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Payment } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("payment");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "reservationId",
    "amount",
    "currency",
    "paymentMethod",
    "status",
  ];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createPayment = async (data) => {
  try {
    validateData(data);

    const current_payment = data.id ? await Payment.findByPk(data.id) : null;
    let newpayment = null;

    if (current_payment) {
      delete data.id;
      data.isActive = true;
      await current_payment.update(data);
      newpayment = current_payment;
    }

    if (!newpayment) {
      newpayment = await Payment.create(data);
    }

    const _data = newpayment.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingPayment", err);
  }
};

module.exports = createPayment;
