const { GetReservationPackageManager } = require("apiLayer");
const { z } = require("zod");

const ReservationPackageMappingMcpController = require("../../ReservationPackageMappingServiceMcpController");

class GetReservationPackageMcpController extends ReservationPackageMappingMcpController {
  constructor(params) {
    super("getReservationPackage", "getreservationpackage", params);
    this.dataName = "reservationPackage";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetReservationPackageManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        reservationPackage: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation this package is assigned to. Foreign key to reservationManagement:reservation.id.",
              ),
            packageId: z
              .string()
              .uuid()
              .describe(
                "Reference to the package being assigned. Foreign key to packageManagement:package.id.",
              ),
            assignedAt: z
              .string()
              .describe(
                "Timestamp of when the package was assigned to the reservation.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Join table between a reservation and a package. Each row represents a single package mapped to a reservation (1:M from reservation to reservationPackage, 1:M from package to reservationPackage). Enables assignment, lookup, and unassignment of packages per reservation. Use composite index for uniqueness (one package per reservation).",
          ),
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
      reservationPackageId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to query the required data object.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getReservationPackage",
    description:
      "Fetch details of a reservation-package mapping by unique ID. Used to look up details of a specific assigned package.",
    parameters: GetReservationPackageMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new GetReservationPackageMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return GetReservationPackageMcpController.getOutputSchema().parse(result);
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
