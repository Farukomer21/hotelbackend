const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Payment = require("./payment");

Payment.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const paymentMethodOptions = ["cash", "card", "transfer", "other"];
  const dataTypepaymentMethodPayment = typeof data.paymentMethod;
  const enumIndexpaymentMethodPayment =
    dataTypepaymentMethodPayment === "string"
      ? paymentMethodOptions.indexOf(data.paymentMethod)
      : data.paymentMethod;
  data.paymentMethod_idx = enumIndexpaymentMethodPayment;
  data.paymentMethod =
    enumIndexpaymentMethodPayment > -1
      ? paymentMethodOptions[enumIndexpaymentMethodPayment]
      : null;
  // set enum Index and enum value
  const statusOptions = ["pending", "paid", "failed", "partiallyPaid"];
  const dataTypestatusPayment = typeof data.status;
  const enumIndexstatusPayment =
    dataTypestatusPayment === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusPayment;
  data.status =
    enumIndexstatusPayment > -1 ? statusOptions[enumIndexstatusPayment] : null;

  data._iPublic = true;

  return data;
};

module.exports = {
  Payment,
  updateElasticIndexMappings,
};
