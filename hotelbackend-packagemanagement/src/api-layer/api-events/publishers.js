const { ServicePublisher } = require("serviceCommon");

// Package_ Event Publisher Classes

// Publisher class for createPackage api
const { Package_CreatedTopic } = require("./topics");
class Package_CreatedPublisher extends ServicePublisher {
  constructor(package_, session, requestId) {
    super(Package_CreatedTopic, package_, session, requestId);
  }

  static async Publish(package_, session, requestId) {
    const _publisher = new Package_CreatedPublisher(
      package_,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updatePackage api
const { Package_UpdatedTopic } = require("./topics");
class Package_UpdatedPublisher extends ServicePublisher {
  constructor(package_, session, requestId) {
    super(Package_UpdatedTopic, package_, session, requestId);
  }

  static async Publish(package_, session, requestId) {
    const _publisher = new Package_UpdatedPublisher(
      package_,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deletePackage api
const { Package_DeletedTopic } = require("./topics");
class Package_DeletedPublisher extends ServicePublisher {
  constructor(package_, session, requestId) {
    super(Package_DeletedTopic, package_, session, requestId);
  }

  static async Publish(package_, session, requestId) {
    const _publisher = new Package_DeletedPublisher(
      package_,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getPackage api
const { Package_RetrivedTopic } = require("./topics");
class Package_RetrivedPublisher extends ServicePublisher {
  constructor(package_, session, requestId) {
    super(Package_RetrivedTopic, package_, session, requestId);
  }

  static async Publish(package_, session, requestId) {
    const _publisher = new Package_RetrivedPublisher(
      package_,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listPackages api
const { PackagesListedTopic } = require("./topics");
class PackagesListedPublisher extends ServicePublisher {
  constructor(packages, session, requestId) {
    super(PackagesListedTopic, packages, session, requestId);
  }

  static async Publish(packages, session, requestId) {
    const _publisher = new PackagesListedPublisher(
      packages,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  Package_CreatedPublisher,
  Package_UpdatedPublisher,
  Package_DeletedPublisher,
  Package_RetrivedPublisher,
  PackagesListedPublisher,
};
