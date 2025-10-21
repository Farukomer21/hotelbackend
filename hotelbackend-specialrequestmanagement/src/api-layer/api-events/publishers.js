const { ServicePublisher } = require("serviceCommon");

// SpecialRequest Event Publisher Classes

// Publisher class for createSpecialRequest api
const { SpecialrequestCreatedTopic } = require("./topics");
class SpecialrequestCreatedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestCreatedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestCreatedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getSpecialRequest api
const { SpecialrequestRetrivedTopic } = require("./topics");
class SpecialrequestRetrivedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestRetrivedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestRetrivedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateSpecialRequest api
const { SpecialrequestUpdatedTopic } = require("./topics");
class SpecialrequestUpdatedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestUpdatedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestUpdatedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteSpecialRequest api
const { SpecialrequestDeletedTopic } = require("./topics");
class SpecialrequestDeletedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestDeletedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestDeletedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listSpecialRequests api
const { SpecialrequestsListedTopic } = require("./topics");
class SpecialrequestsListedPublisher extends ServicePublisher {
  constructor(specialrequests, session, requestId) {
    super(SpecialrequestsListedTopic, specialrequests, session, requestId);
  }

  static async Publish(specialrequests, session, requestId) {
    const _publisher = new SpecialrequestsListedPublisher(
      specialrequests,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  SpecialrequestCreatedPublisher,
  SpecialrequestRetrivedPublisher,
  SpecialrequestUpdatedPublisher,
  SpecialrequestDeletedPublisher,
  SpecialrequestsListedPublisher,
};
