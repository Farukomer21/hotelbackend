const { ServicePublisher } = require("serviceCommon");

// Reservation Event Publisher Classes

// Publisher class for createReservation api
const { ReservationCreatedTopic } = require("./topics");
class ReservationCreatedPublisher extends ServicePublisher {
  constructor(reservation, session, requestId) {
    super(ReservationCreatedTopic, reservation, session, requestId);
  }

  static async Publish(reservation, session, requestId) {
    const _publisher = new ReservationCreatedPublisher(
      reservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getReservationById api
const { ReservationRetrivedTopic } = require("./topics");
class ReservationRetrivedPublisher extends ServicePublisher {
  constructor(reservation, session, requestId) {
    super(ReservationRetrivedTopic, reservation, session, requestId);
  }

  static async Publish(reservation, session, requestId) {
    const _publisher = new ReservationRetrivedPublisher(
      reservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getReservationByCode api
const { ReservationbycodeRetrivedTopic } = require("./topics");
class ReservationbycodeRetrivedPublisher extends ServicePublisher {
  constructor(reservationbycode, session, requestId) {
    super(
      ReservationbycodeRetrivedTopic,
      reservationbycode,
      session,
      requestId,
    );
  }

  static async Publish(reservationbycode, session, requestId) {
    const _publisher = new ReservationbycodeRetrivedPublisher(
      reservationbycode,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateReservation api
const { ReservationUpdatedTopic } = require("./topics");
class ReservationUpdatedPublisher extends ServicePublisher {
  constructor(reservation, session, requestId) {
    super(ReservationUpdatedTopic, reservation, session, requestId);
  }

  static async Publish(reservation, session, requestId) {
    const _publisher = new ReservationUpdatedPublisher(
      reservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for cancelReservationByCode api
const { ReservationbycodeCanceledTopic } = require("./topics");
class ReservationbycodeCanceledPublisher extends ServicePublisher {
  constructor(reservationbycode, session, requestId) {
    super(
      ReservationbycodeCanceledTopic,
      reservationbycode,
      session,
      requestId,
    );
  }

  static async Publish(reservationbycode, session, requestId) {
    const _publisher = new ReservationbycodeCanceledPublisher(
      reservationbycode,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteReservation api
const { ReservationDeletedTopic } = require("./topics");
class ReservationDeletedPublisher extends ServicePublisher {
  constructor(reservation, session, requestId) {
    super(ReservationDeletedTopic, reservation, session, requestId);
  }

  static async Publish(reservation, session, requestId) {
    const _publisher = new ReservationDeletedPublisher(
      reservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listReservations api
const { ReservationsListedTopic } = require("./topics");
class ReservationsListedPublisher extends ServicePublisher {
  constructor(reservations, session, requestId) {
    super(ReservationsListedTopic, reservations, session, requestId);
  }

  static async Publish(reservations, session, requestId) {
    const _publisher = new ReservationsListedPublisher(
      reservations,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  ReservationCreatedPublisher,
  ReservationRetrivedPublisher,
  ReservationbycodeRetrivedPublisher,
  ReservationUpdatedPublisher,
  ReservationbycodeCanceledPublisher,
  ReservationDeletedPublisher,
  ReservationsListedPublisher,
};
