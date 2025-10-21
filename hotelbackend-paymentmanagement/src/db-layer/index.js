const mainFunctions = require("./main");

module.exports = {
  // main Database
  createPayment: mainFunctions.createPayment,
  getIdListOfPaymentByField: mainFunctions.getIdListOfPaymentByField,
  getPaymentById: mainFunctions.getPaymentById,
  getPaymentAggById: mainFunctions.getPaymentAggById,
  getPaymentListByQuery: mainFunctions.getPaymentListByQuery,
  getPaymentStatsByQuery: mainFunctions.getPaymentStatsByQuery,
  getPaymentByQuery: mainFunctions.getPaymentByQuery,
  updatePaymentById: mainFunctions.updatePaymentById,
  updatePaymentByIdList: mainFunctions.updatePaymentByIdList,
  updatePaymentByQuery: mainFunctions.updatePaymentByQuery,
  deletePaymentById: mainFunctions.deletePaymentById,
  deletePaymentByQuery: mainFunctions.deletePaymentByQuery,
  getPaymentByReservationId: mainFunctions.getPaymentByReservationId,
  dbScriptCreatePayment: mainFunctions.dbScriptCreatePayment,
  dbScriptGetPayment: mainFunctions.dbScriptGetPayment,
  dbScriptUpdatePayment: mainFunctions.dbScriptUpdatePayment,
  dbScriptDeletePayment: mainFunctions.dbScriptDeletePayment,
  dbScriptListPayments: mainFunctions.dbScriptListPayments,
  dbScriptGetPaymentsbyreservationcode:
    mainFunctions.dbScriptGetPaymentsbyreservationcode,
};
