const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "hotelbackend - personnelManagement",
    brand: {
      name: "hotelbackend",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "personnelManagement",
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
        name: "Personnel",
        description:
          "Hotel staff/personnel record for HR and internal operations; includes contact, job, department, status, and HR notes.",
        reference: {
          tableName: "personnel",
          properties: [
            {
              name: "fullName",
              type: "String",
            },

            {
              name: "jobTitle",
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
              name: "hireDate",
              type: "Date",
            },

            {
              name: "department",
              type: "String",
            },

            {
              name: "status",
              type: "Enum",
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
            url: `${basePath}/v1/personnels`,
            title: "Create Personnel",
            query: [],

            body: {
              type: "json",
              content: {
                fullName: "String",
                jobTitle: "String",
                contactNumber: "String",
                email: "String",
                hireDate: "Date",
                department: "String",
                status: "Enum",
                notes: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/personnels/{personnelId}`,
            title: "Get Personnel",
            query: [],

            parameters: [
              {
                key: "personnelId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/personnels/{personnelId}`,
            title: "Update Personnel",
            query: [],

            body: {
              type: "json",
              content: {
                fullName: "String",
                jobTitle: "String",
                contactNumber: "String",
                email: "String",
                hireDate: "Date",
                department: "String",
                status: "Enum",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "personnelId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/personnels/{personnelId}`,
            title: "Delete Personnel",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "personnelId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/personnels`,
            title: "List Personnel",
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
