const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - packageManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "packageManagement",
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
        name: "Package_",
        description:
          "A value-added hotel package/service that can be assigned to a reservation. Includes package name, description, pricing, validity dates, and activation status.",
        reference: {
          tableName: "package_",
          properties: [
            {
              name: "name",
              type: "String",
            },

            {
              name: "description",
              type: "Text",
            },

            {
              name: "price",
              type: "Double",
            },

            {
              name: "availableFrom",
              type: "Date",
            },

            {
              name: "availableTo",
              type: "Date",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/package_s`,
            title: "Create Package_",
            query: [],

            body: {
              type: "json",
              content: {
                name: "String",
                description: "Text",
                price: "Double",
                availableFrom: "Date",
                availableTo: "Date",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/package_s/{package_Id}`,
            title: "Update Package_",
            query: [],

            body: {
              type: "json",
              content: {
                name: "String",
                description: "Text",
                price: "Double",
                availableFrom: "Date",
                availableTo: "Date",
              },
            },

            parameters: [
              {
                key: "package_Id",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/package_s/{package_Id}`,
            title: "Delete Package_",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "package_Id",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/package_s/{package_Id}`,
            title: "Get Package_",
            query: [],

            parameters: [
              {
                key: "package_Id",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/packages`,
            title: "List Packages",
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
