const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - reservationPackageMapping",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "reservationPackageMapping",
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
        name: "ReservationPackage",
        description:
          "Join table between a reservation and a package. Each row represents a single package mapped to a reservation (1:M from reservation to reservationPackage, 1:M from package to reservationPackage). Enables assignment, lookup, and unassignment of packages per reservation. Use composite index for uniqueness (one package per reservation).",
        reference: {
          tableName: "reservationPackage",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "packageId",
              type: "ID",
            },

            {
              name: "assignedAt",
              type: "Date",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/reservationpackages`,
            title: "Create Reservationpackage",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                packageId: "ID",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/reservationpackages/{reservationPackageId}`,
            title: "Update Reservationpackage",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "reservationPackageId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/reservationpackages/{reservationPackageId}`,
            title: "Delete Reservationpackage",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "reservationPackageId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservationpackages/{reservationPackageId}`,
            title: "Get Reservationpackage",
            query: [],

            parameters: [
              {
                key: "reservationPackageId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservationpackages`,
            title: "List Reservationpackages",
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
