const { ServicePublisher } = require("serviceCommon");

// Guest Event Publisher Classes

// Publisher class for createGuest api
const { GuestCreatedTopic } = require("./topics");
class GuestCreatedPublisher extends ServicePublisher {
  constructor(guest, session, requestId) {
    super(GuestCreatedTopic, guest, session, requestId);
  }

  static async Publish(guest, session, requestId) {
    const _publisher = new GuestCreatedPublisher(guest, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for getGuest api
const { GuestRetrivedTopic } = require("./topics");
class GuestRetrivedPublisher extends ServicePublisher {
  constructor(guest, session, requestId) {
    super(GuestRetrivedTopic, guest, session, requestId);
  }

  static async Publish(guest, session, requestId) {
    const _publisher = new GuestRetrivedPublisher(guest, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for updateGuest api
const { GuestUpdatedTopic } = require("./topics");
class GuestUpdatedPublisher extends ServicePublisher {
  constructor(guest, session, requestId) {
    super(GuestUpdatedTopic, guest, session, requestId);
  }

  static async Publish(guest, session, requestId) {
    const _publisher = new GuestUpdatedPublisher(guest, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deleteGuest api
const { GuestDeletedTopic } = require("./topics");
class GuestDeletedPublisher extends ServicePublisher {
  constructor(guest, session, requestId) {
    super(GuestDeletedTopic, guest, session, requestId);
  }

  static async Publish(guest, session, requestId) {
    const _publisher = new GuestDeletedPublisher(guest, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for listGuests api
const { GuestsListedTopic } = require("./topics");
class GuestsListedPublisher extends ServicePublisher {
  constructor(guests, session, requestId) {
    super(GuestsListedTopic, guests, session, requestId);
  }

  static async Publish(guests, session, requestId) {
    const _publisher = new GuestsListedPublisher(guests, session, requestId);
    await _publisher.publish();
  }
}

module.exports = {
  GuestCreatedPublisher,
  GuestRetrivedPublisher,
  GuestUpdatedPublisher,
  GuestDeletedPublisher,
  GuestsListedPublisher,
};
