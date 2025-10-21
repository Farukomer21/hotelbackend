const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - guestManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "guestManagement",
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
        name: "Guest",
        description:
          "Represents a hotel guest (individual or group lead). Used for reservations and management—records contact and identification info. Supports free-form notes for staff.",
        reference: {
          tableName: "guest",
          properties: [
            {
              name: "fullName",
              type: "String",
            },

            {
              name: "contactNumber",
              type: "String",
            },

            {
              name: "email",
              type: "String",
            },

            {
              name: "address",
              type: "Text",
            },

            {
              name: "identificationType",
              type: "String",
            },

            {
              name: "identificationNumber",
              type: "String",
            },

            {
              name: "notes",
              type: "Text",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/guests`,
            title: "Create Guest",
            query: [],

            body: {
              type: "json",
              content: {
                fullName: "String",
                contactNumber: "String",
                email: "String",
                address: "Text",
                identificationType: "String",
                identificationNumber: "String",
                notes: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/guests/{guestId}`,
            title: "Get Guest",
            query: [],

            parameters: [
              {
                key: "guestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/guests/{guestId}`,
            title: "Update Guest",
            query: [],

            body: {
              type: "json",
              content: {
                fullName: "String",
                contactNumber: "String",
                email: "String",
                address: "Text",
                identificationType: "String",
                identificationNumber: "String",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "guestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/guests/{guestId}`,
            title: "Delete Guest",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "guestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/guests`,
            title: "List Guests",
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
