const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `hotelbackend-notification-service-userResetPassword-group`,
});

const userResetPasswordListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "hotelBackend-user-service-password-reset-by-email-start",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const notice = JSON.parse(message.value.toString());

        const mappedData = {
          types: ["email"],
          isStored: false,
          template: "resetPassword",
          metadata: {
            ...notice,
            actionDeepLink: "&#39;https://www.mindbricks.com&#39;",
            actionText: "&#39;Visit Mindbricks&#39;",
          },
        };

        if (!(notice.secretCode != null)) {
          console.log("condition not met", "notice.secretCode != null");
          return;
        }

        mappedData.to = notice["email"];
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error(
          "hotelBackend-user-service-password-reset-by-email-start ",
          error,
        );
      }
    },
  });
};

module.exports = userResetPasswordListener;
