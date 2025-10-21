module.exports = (headers) => {
  // Payment Db Object Rest Api Router
  const paymentMcpRouter = [];

  // createPayment controller
  paymentMcpRouter.push(require("./create-payment-api")(headers));
  // getPayment controller
  paymentMcpRouter.push(require("./get-payment-api")(headers));
  // updatePayment controller
  paymentMcpRouter.push(require("./update-payment-api")(headers));
  // deletePayment controller
  paymentMcpRouter.push(require("./delete-payment-api")(headers));
  // listPayments controller
  paymentMcpRouter.push(require("./list-payments-api")(headers));
  // getPaymentsByReservationCode controller
  paymentMcpRouter.push(
    require("./get-paymentsbyreservationcode-api")(headers),
  );

  return paymentMcpRouter;
};
