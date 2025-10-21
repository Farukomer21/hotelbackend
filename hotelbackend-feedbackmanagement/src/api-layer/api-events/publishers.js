const { ServicePublisher } = require("serviceCommon");

// Feedback Event Publisher Classes

// Publisher class for createFeedback api
const { FeedbackCreatedTopic } = require("./topics");
class FeedbackCreatedPublisher extends ServicePublisher {
  constructor(feedback, session, requestId) {
    super(FeedbackCreatedTopic, feedback, session, requestId);
  }

  static async Publish(feedback, session, requestId) {
    const _publisher = new FeedbackCreatedPublisher(
      feedback,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getFeedback api
const { FeedbackRetrivedTopic } = require("./topics");
class FeedbackRetrivedPublisher extends ServicePublisher {
  constructor(feedback, session, requestId) {
    super(FeedbackRetrivedTopic, feedback, session, requestId);
  }

  static async Publish(feedback, session, requestId) {
    const _publisher = new FeedbackRetrivedPublisher(
      feedback,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateFeedback api
const { FeedbackUpdatedTopic } = require("./topics");
class FeedbackUpdatedPublisher extends ServicePublisher {
  constructor(feedback, session, requestId) {
    super(FeedbackUpdatedTopic, feedback, session, requestId);
  }

  static async Publish(feedback, session, requestId) {
    const _publisher = new FeedbackUpdatedPublisher(
      feedback,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteFeedback api
const { FeedbackDeletedTopic } = require("./topics");
class FeedbackDeletedPublisher extends ServicePublisher {
  constructor(feedback, session, requestId) {
    super(FeedbackDeletedTopic, feedback, session, requestId);
  }

  static async Publish(feedback, session, requestId) {
    const _publisher = new FeedbackDeletedPublisher(
      feedback,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listFeedbacks api
const { FeedbacksListedTopic } = require("./topics");
class FeedbacksListedPublisher extends ServicePublisher {
  constructor(feedbacks, session, requestId) {
    super(FeedbacksListedTopic, feedbacks, session, requestId);
  }

  static async Publish(feedbacks, session, requestId) {
    const _publisher = new FeedbacksListedPublisher(
      feedbacks,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  FeedbackCreatedPublisher,
  FeedbackRetrivedPublisher,
  FeedbackUpdatedPublisher,
  FeedbackDeletedPublisher,
  FeedbacksListedPublisher,
};
