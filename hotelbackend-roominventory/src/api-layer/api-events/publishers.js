const { ServicePublisher } = require("serviceCommon");

// Room Event Publisher Classes

// Publisher class for createRoom api
const { RoomCreatedTopic } = require("./topics");
class RoomCreatedPublisher extends ServicePublisher {
  constructor(room, session, requestId) {
    super(RoomCreatedTopic, room, session, requestId);
  }

  static async Publish(room, session, requestId) {
    const _publisher = new RoomCreatedPublisher(room, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for updateRoom api
const { RoomUpdatedTopic } = require("./topics");
class RoomUpdatedPublisher extends ServicePublisher {
  constructor(room, session, requestId) {
    super(RoomUpdatedTopic, room, session, requestId);
  }

  static async Publish(room, session, requestId) {
    const _publisher = new RoomUpdatedPublisher(room, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deleteRoom api
const { RoomDeletedTopic } = require("./topics");
class RoomDeletedPublisher extends ServicePublisher {
  constructor(room, session, requestId) {
    super(RoomDeletedTopic, room, session, requestId);
  }

  static async Publish(room, session, requestId) {
    const _publisher = new RoomDeletedPublisher(room, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for getRoom api
const { RoomRetrivedTopic } = require("./topics");
class RoomRetrivedPublisher extends ServicePublisher {
  constructor(room, session, requestId) {
    super(RoomRetrivedTopic, room, session, requestId);
  }

  static async Publish(room, session, requestId) {
    const _publisher = new RoomRetrivedPublisher(room, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for listRooms api
const { RoomsListedTopic } = require("./topics");
class RoomsListedPublisher extends ServicePublisher {
  constructor(rooms, session, requestId) {
    super(RoomsListedTopic, rooms, session, requestId);
  }

  static async Publish(rooms, session, requestId) {
    const _publisher = new RoomsListedPublisher(rooms, session, requestId);
    await _publisher.publish();
  }
}

module.exports = {
  RoomCreatedPublisher,
  RoomUpdatedPublisher,
  RoomDeletedPublisher,
  RoomRetrivedPublisher,
  RoomsListedPublisher,
};
