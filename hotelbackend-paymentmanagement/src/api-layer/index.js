module.exports = {
  PaymentManagementServiceManager: require("./service-manager/PaymentManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Payment Db Object
  CreatePaymentManager: require("./main/payment/create-payment-api"),
  GetPaymentManager: require("./main/payment/get-payment-api"),
  UpdatePaymentManager: require("./main/payment/update-payment-api"),
  DeletePaymentManager: require("./main/payment/delete-payment-api"),
  ListPaymentsManager: require("./main/payment/list-payments-api"),
  GetPaymentsByReservationCodeManager: require("./main/payment/get-paymentsbyreservationcode-api"),
  integrationRouter: require("./integrations/testRouter"),
};
