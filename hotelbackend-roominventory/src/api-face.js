const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - roomInventory",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "roomInventory",
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
        name: "Room",
        description:
          "Represents a hotel room and its specifications for assignment to reservations. Includes type, amenities, floor, status, occupancy, and description.",
        reference: {
          tableName: "room",
          properties: [
            {
              name: "roomNumber",
              type: "String",
            },

            {
              name: "type",
              type: "Enum",
            },

            {
              name: "amenities",
              type: "[String]",
            },

            {
              name: "floor",
              type: "Integer",
            },

            {
              name: "description",
              type: "Text",
            },

            {
              name: "occupancyLimit",
              type: "Integer",
            },

            {
              name: "status",
              type: "Enum",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/rooms`,
            title: "Create Room",
            query: [],

            body: {
              type: "json",
              content: {
                roomNumber: "String",
                type: "Enum",
                amenities: "String",
                floor: "Integer",
                description: "Text",
                occupancyLimit: "Integer",
                status: "Enum",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/rooms/{roomId}`,
            title: "Update Room",
            query: [],

            body: {
              type: "json",
              content: {
                roomNumber: "String",
                type: "Enum",
                amenities: "String",
                floor: "Integer",
                description: "Text",
                occupancyLimit: "Integer",
                status: "Enum",
              },
            },

            parameters: [
              {
                key: "roomId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/rooms/{roomId}`,
            title: "Delete Room",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "roomId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/rooms/{roomId}`,
            title: "Get Room",
            query: [],

            parameters: [
              {
                key: "roomId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/rooms`,
            title: "List Rooms",
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
