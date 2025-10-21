const paymentFunctions = require("./payment");

module.exports = {
  // main Database
  createPayment: paymentFunctions.createPayment,
  getIdListOfPaymentByField: paymentFunctions.getIdListOfPaymentByField,
  getPaymentById: paymentFunctions.getPaymentById,
  getPaymentAggById: paymentFunctions.getPaymentAggById,
  getPaymentListByQuery: paymentFunctions.getPaymentListByQuery,
  getPaymentStatsByQuery: paymentFunctions.getPaymentStatsByQuery,
  getPaymentByQuery: paymentFunctions.getPaymentByQuery,
  updatePaymentById: paymentFunctions.updatePaymentById,
  updatePaymentByIdList: paymentFunctions.updatePaymentByIdList,
  updatePaymentByQuery: paymentFunctions.updatePaymentByQuery,
  deletePaymentById: paymentFunctions.deletePaymentById,
  deletePaymentByQuery: paymentFunctions.deletePaymentByQuery,
  getPaymentByReservationId: paymentFunctions.getPaymentByReservationId,
  dbScriptCreatePayment: paymentFunctions.dbScriptCreatePayment,
  dbScriptGetPayment: paymentFunctions.dbScriptGetPayment,
  dbScriptUpdatePayment: paymentFunctions.dbScriptUpdatePayment,
  dbScriptDeletePayment: paymentFunctions.dbScriptDeletePayment,
  dbScriptListPayments: paymentFunctions.dbScriptListPayments,
  dbScriptGetPaymentsbyreservationcode:
    paymentFunctions.dbScriptGetPaymentsbyreservationcode,
};
