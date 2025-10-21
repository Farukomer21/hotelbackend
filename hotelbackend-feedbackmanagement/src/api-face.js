const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - feedbackManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "feedbackManagement",
      version: process.env.SERVICE_VERSION || "1.0.0",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "Feedback",
        description:
          "Feedback submitted by guests for a hotel stay or service, linked to a reservation. Contains rating, comments, staff response, category, and submission timestamp.",
        reference: {
          tableName: "feedback",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "rating",
              type: "Integer",
            },

            {
              name: "comment",
              type: "Text",
            },

            {
              name: "submittedAt",
              type: "Date",
            },

            {
              name: "response",
              type: "Text",
            },

            {
              name: "category",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/feedbacks`,
            title: "Create Feedback",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                rating: "Integer",
                comment: "Text",
                response: "Text",
                category: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/feedbacks/{feedbackId}`,
            title: "Get Feedback",
            query: [],

            parameters: [
              {
                key: "feedbackId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/feedbacks/{feedbackId}`,
            title: "Update Feedback",
            query: [],

            body: {
              type: "json",
              content: {
                rating: "Integer",
                comment: "Text",
                response: "Text",
                category: "String",
              },
            },

            parameters: [
              {
                key: "feedbackId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/feedbacks/{feedbackId}`,
            title: "Delete Feedback",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "feedbackId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/feedbacks`,
            title: "List Feedbacks",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },
        ],
      },
    ],
  };

  inject(app, config);
};
