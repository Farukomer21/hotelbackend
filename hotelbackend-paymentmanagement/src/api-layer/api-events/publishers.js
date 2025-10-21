const { ServicePublisher } = require("serviceCommon");

// Payment Event Publisher Classes

// Publisher class for createPayment api
const { PaymentCreatedTopic } = require("./topics");
class PaymentCreatedPublisher extends ServicePublisher {
  constructor(payment, session, requestId) {
    super(PaymentCreatedTopic, payment, session, requestId);
  }

  static async Publish(payment, session, requestId) {
    const _publisher = new PaymentCreatedPublisher(payment, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for getPayment api
const { PaymentRetrivedTopic } = require("./topics");
class PaymentRetrivedPublisher extends ServicePublisher {
  constructor(payment, session, requestId) {
    super(PaymentRetrivedTopic, payment, session, requestId);
  }

  static async Publish(payment, session, requestId) {
    const _publisher = new PaymentRetrivedPublisher(
      payment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updatePayment api
const { PaymentUpdatedTopic } = require("./topics");
class PaymentUpdatedPublisher extends ServicePublisher {
  constructor(payment, session, requestId) {
    super(PaymentUpdatedTopic, payment, session, requestId);
  }

  static async Publish(payment, session, requestId) {
    const _publisher = new PaymentUpdatedPublisher(payment, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deletePayment api
const { PaymentDeletedTopic } = require("./topics");
class PaymentDeletedPublisher extends ServicePublisher {
  constructor(payment, session, requestId) {
    super(PaymentDeletedTopic, payment, session, requestId);
  }

  static async Publish(payment, session, requestId) {
    const _publisher = new PaymentDeletedPublisher(payment, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for listPayments api
const { PaymentsListedTopic } = require("./topics");
class PaymentsListedPublisher extends ServicePublisher {
  constructor(payments, session, requestId) {
    super(PaymentsListedTopic, payments, session, requestId);
  }

  static async Publish(payments, session, requestId) {
    const _publisher = new PaymentsListedPublisher(
      payments,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getPaymentsByReservationCode api
const { PaymentsbyreservationcodeRetrivedTopic } = require("./topics");
class PaymentsbyreservationcodeRetrivedPublisher extends ServicePublisher {
  constructor(paymentsbyreservationcode, session, requestId) {
    super(
      PaymentsbyreservationcodeRetrivedTopic,
      paymentsbyreservationcode,
      session,
      requestId,
    );
  }

  static async Publish(paymentsbyreservationcode, session, requestId) {
    const _publisher = new PaymentsbyreservationcodeRetrivedPublisher(
      paymentsbyreservationcode,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  PaymentCreatedPublisher,
  PaymentRetrivedPublisher,
  PaymentUpdatedPublisher,
  PaymentDeletedPublisher,
  PaymentsListedPublisher,
  PaymentsbyreservationcodeRetrivedPublisher,
};
