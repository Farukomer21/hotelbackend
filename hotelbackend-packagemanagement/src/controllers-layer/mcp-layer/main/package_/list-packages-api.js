const { ListPackagesManager } = require("apiLayer");
const { z } = require("zod");

const PackageManagementMcpController = require("../../PackageManagementServiceMcpController");

class ListPackagesMcpController extends PackageManagementMcpController {
  constructor(params) {
    super("listPackages", "listpackages", params);
    this.dataName = "package_s";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListPackagesManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        package_s: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            name: z
              .string()
              .max(255)
              .describe(
                "Display name of the package (e.g., 'Breakfast', 'Airport Transfer', 'Spa Access').",
              ),
            description: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Longer, optional description of the package, features, or details.",
              ),
            price: z
              .number()
              .describe(
                "The price of the package in the base currency. Must be >= 0.",
              ),
            availableFrom: z
              .string()
              .describe("Date from which the package is offered/bookable."),
            availableTo: z
              .string()
              .describe(
                "Date until which the package is offered/bookable (inclusive).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A value-added hotel package/service that can be assigned to a reservation. Includes package name, description, pricing, validity dates, and activation status.",
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      accessToken: z
        .string()
        .optional()
        .describe(
          "The access token which is returned from a login request or given by user. This access token will override if there is any bearer or OAuth token in the mcp client. If not given the request will be made with the system (bearer or OAuth) token. For public routes you dont need to deifne any access token.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "listPackages",
    description:
      "List (and filter/search) all packages offered by the hotel. Filter by name, isActive, price, and available dates.",
    parameters: ListPackagesMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListPackagesMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListPackagesMcpController.getOutputSchema().parse(result);
        console.log("Mcp Response Ready", JSON.stringify(result));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        console.log("Mcp Error Occured", err.message);
        //**errorLog
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
