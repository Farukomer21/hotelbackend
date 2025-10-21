const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - reservationManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "reservationManagement",
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
        name: "Reservation",
        description:
          "A reservation record for a hotel guest, supports code-based access, guest/room/package assignments, special requests, payment status, lifecycle status, and summary fields.",
        reference: {
          tableName: "reservation",
          properties: [
            {
              name: "reservationCode",
              type: "String",
            },

            {
              name: "guestId",
              type: "ID",
            },

            {
              name: "roomId",
              type: "ID",
            },

            {
              name: "packageIds",
              type: "[ID]",
            },

            {
              name: "checkInDate",
              type: "Date",
            },

            {
              name: "checkOutDate",
              type: "Date",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "specialRequestIds",
              type: "[ID]",
            },

            {
              name: "paymentStatus",
              type: "Enum",
            },

            {
              name: "totalAmount",
              type: "Double",
            },

            {
              name: "notes",
              type: "Text",
            },

            {
              name: "numGuests",
              type: "Integer",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/reservations`,
            title: "Create Reservation",
            query: [],

            body: {
              type: "json",
              content: {
                reservationCode: "String",
                guestId: "ID",
                roomId: "ID",
                packageIds: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                status: "Enum",
                specialRequestIds: "ID",
                paymentStatus: "Enum",
                totalAmount: "Double",
                notes: "Text",
                numGuests: "Integer",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservations/{reservationId}`,
            title: "Get Reservation",
            query: [],

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservationbycode/{reservationId}`,
            title: "Get Reservationbycode",
            query: [],

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/reservations/{reservationId}`,
            title: "Update Reservation",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                packageIds: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                status: "Enum",
                specialRequestIds: "ID",
                paymentStatus: "Enum",
                totalAmount: "Double",
                notes: "Text",
                numGuests: "Integer",
              },
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/cancelreservationbycode/{reservationId}`,
            title: "Cancel Reservationbycode",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                packageIds: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                status: "Enum",
                specialRequestIds: "ID",
                paymentStatus: "Enum",
                totalAmount: "Double",
                notes: "Text",
                numGuests: "Integer",
              },
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/reservations/{reservationId}`,
            title: "Delete Reservation",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservations`,
            title: "List Reservations",
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
