const { ServicePublisher } = require("serviceCommon");

// ReservationPackage Event Publisher Classes

// Publisher class for createReservationPackage api
const { ReservationpackageCreatedTopic } = require("./topics");
class ReservationpackageCreatedPublisher extends ServicePublisher {
  constructor(reservationpackage, session, requestId) {
    super(
      ReservationpackageCreatedTopic,
      reservationpackage,
      session,
      requestId,
    );
  }

  static async Publish(reservationpackage, session, requestId) {
    const _publisher = new ReservationpackageCreatedPublisher(
      reservationpackage,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateReservationPackage api
const { ReservationpackageUpdatedTopic } = require("./topics");
class ReservationpackageUpdatedPublisher extends ServicePublisher {
  constructor(reservationpackage, session, requestId) {
    super(
      ReservationpackageUpdatedTopic,
      reservationpackage,
      session,
      requestId,
    );
  }

  static async Publish(reservationpackage, session, requestId) {
    const _publisher = new ReservationpackageUpdatedPublisher(
      reservationpackage,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteReservationPackage api
const { ReservationpackageDeletedTopic } = require("./topics");
class ReservationpackageDeletedPublisher extends ServicePublisher {
  constructor(reservationpackage, session, requestId) {
    super(
      ReservationpackageDeletedTopic,
      reservationpackage,
      session,
      requestId,
    );
  }

  static async Publish(reservationpackage, session, requestId) {
    const _publisher = new ReservationpackageDeletedPublisher(
      reservationpackage,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getReservationPackage api
const { ReservationpackageRetrivedTopic } = require("./topics");
class ReservationpackageRetrivedPublisher extends ServicePublisher {
  constructor(reservationpackage, session, requestId) {
    super(
      ReservationpackageRetrivedTopic,
      reservationpackage,
      session,
      requestId,
    );
  }

  static async Publish(reservationpackage, session, requestId) {
    const _publisher = new ReservationpackageRetrivedPublisher(
      reservationpackage,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listReservationPackages api
const { ReservationpackagesListedTopic } = require("./topics");
class ReservationpackagesListedPublisher extends ServicePublisher {
  constructor(reservationpackages, session, requestId) {
    super(
      ReservationpackagesListedTopic,
      reservationpackages,
      session,
      requestId,
    );
  }

  static async Publish(reservationpackages, session, requestId) {
    const _publisher = new ReservationpackagesListedPublisher(
      reservationpackages,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  ReservationpackageCreatedPublisher,
  ReservationpackageUpdatedPublisher,
  ReservationpackageDeletedPublisher,
  ReservationpackageRetrivedPublisher,
  ReservationpackagesListedPublisher,
};
