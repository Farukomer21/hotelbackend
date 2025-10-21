const express = require("express");

// Payment Db Object Rest Api Router
const paymentRouter = express.Router();

// add Payment controllers

// createPayment controller
paymentRouter.post("/v1/payments", require("./create-payment-api"));
// getPayment controller
paymentRouter.get("/v1/payments/:paymentId", require("./get-payment-api"));
// updatePayment controller
paymentRouter.patch("/v1/payments/:paymentId", require("./update-payment-api"));
// deletePayment controller
paymentRouter.delete(
  "/v1/payments/:paymentId",
  require("./delete-payment-api"),
);
// listPayments controller
paymentRouter.get("/v1/payments", require("./list-payments-api"));
// getPaymentsByReservationCode controller
paymentRouter.get(
  "/v1/paymentsbyreservationcode",
  require("./get-paymentsbyreservationcode-api"),
);

module.exports = paymentRouter;
