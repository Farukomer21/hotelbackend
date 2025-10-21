const { ServicePublisher } = require("serviceCommon");

// RoomPrice Event Publisher Classes

// Publisher class for createRoomPrice api
const { RoompriceCreatedTopic } = require("./topics");
class RoompriceCreatedPublisher extends ServicePublisher {
  constructor(roomprice, session, requestId) {
    super(RoompriceCreatedTopic, roomprice, session, requestId);
  }

  static async Publish(roomprice, session, requestId) {
    const _publisher = new RoompriceCreatedPublisher(
      roomprice,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getRoomPrice api
const { RoompriceRetrivedTopic } = require("./topics");
class RoompriceRetrivedPublisher extends ServicePublisher {
  constructor(roomprice, session, requestId) {
    super(RoompriceRetrivedTopic, roomprice, session, requestId);
  }

  static async Publish(roomprice, session, requestId) {
    const _publisher = new RoompriceRetrivedPublisher(
      roomprice,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateRoomPrice api
const { RoompriceUpdatedTopic } = require("./topics");
class RoompriceUpdatedPublisher extends ServicePublisher {
  constructor(roomprice, session, requestId) {
    super(RoompriceUpdatedTopic, roomprice, session, requestId);
  }

  static async Publish(roomprice, session, requestId) {
    const _publisher = new RoompriceUpdatedPublisher(
      roomprice,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteRoomPrice api
const { RoompriceDeletedTopic } = require("./topics");
class RoompriceDeletedPublisher extends ServicePublisher {
  constructor(roomprice, session, requestId) {
    super(RoompriceDeletedTopic, roomprice, session, requestId);
  }

  static async Publish(roomprice, session, requestId) {
    const _publisher = new RoompriceDeletedPublisher(
      roomprice,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listRoomPrices api
const { RoompricesListedTopic } = require("./topics");
class RoompricesListedPublisher extends ServicePublisher {
  constructor(roomprices, session, requestId) {
    super(RoompricesListedTopic, roomprices, session, requestId);
  }

  static async Publish(roomprices, session, requestId) {
    const _publisher = new RoompricesListedPublisher(
      roomprices,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  RoompriceCreatedPublisher,
  RoompriceRetrivedPublisher,
  RoompriceUpdatedPublisher,
  RoompriceDeletedPublisher,
  RoompricesListedPublisher,
};
