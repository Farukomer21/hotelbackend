const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - paymentManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "paymentManagement",
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
        name: "Payment",
        description:
          "Represents a payment made for a reservation. Includes reference to reservation, amount, currency, payment method, paid date, status, and reference code for audit or external payment linkages. Multiple payments per reservation are allowed (split or partial payments).",
        reference: {
          tableName: "payment",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "amount",
              type: "Double",
            },

            {
              name: "currency",
              type: "String",
            },

            {
              name: "paymentMethod",
              type: "Enum",
            },

            {
              name: "paidAt",
              type: "Date",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "reference",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/payments`,
            title: "Create Payment",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                amount: "Double",
                currency: "String",
                paymentMethod: "Enum",
                paidAt: "Date",
                status: "Enum",
                reference: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/payments/{paymentId}`,
            title: "Get Payment",
            query: [],

            parameters: [
              {
                key: "paymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/payments/{paymentId}`,
            title: "Update Payment",
            query: [],

            body: {
              type: "json",
              content: {
                amount: "Double",
                currency: "String",
                paymentMethod: "Enum",
                paidAt: "Date",
                status: "Enum",
                reference: "String",
              },
            },

            parameters: [
              {
                key: "paymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/payments/{paymentId}`,
            title: "Delete Payment",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "paymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/payments`,
            title: "List Payments",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/paymentsbyreservationcode`,
            title: "Get Paymentsbyreservationcode",
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
