const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - specialRequestManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "specialRequestManagement",
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
        name: "SpecialRequest",
        description:
          "A special request attached to a specific reservation (e.g., late check-out, accessibility, dietary, etc.). Supports guest/staff initiation, operational status (requested/inProgress/fulfilled/denied), and staff notes for processing and audits.",
        reference: {
          tableName: "specialRequest",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "requestText",
              type: "String",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "staffNote",
              type: "Text",
            },

            {
              name: "submittedAt",
              type: "Date",
            },

            {
              name: "resolvedAt",
              type: "Date",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/specialrequests`,
            title: "Create Specialrequest",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                requestText: "String",
                status: "Enum",
                staffNote: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/specialrequests/{specialRequestId}`,
            title: "Get Specialrequest",
            query: [],

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/specialrequests/{specialRequestId}`,
            title: "Update Specialrequest",
            query: [],

            body: {
              type: "json",
              content: {
                status: "Enum",
                staffNote: "Text",
              },
            },

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/specialrequests/{specialRequestId}`,
            title: "Delete Specialrequest",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/specialrequests`,
            title: "List Specialrequests",
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
