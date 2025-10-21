const { GetGuestManager } = require("apiLayer");
const { z } = require("zod");

const GuestManagementMcpController = require("../../GuestManagementServiceMcpController");

class GetGuestMcpController extends GuestManagementMcpController {
  constructor(params) {
    super("getGuest", "getguest", params);
    this.dataName = "guest";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetGuestManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        guest: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            fullName: z
              .string()
              .max(255)
              .describe(
                "Full legal name of the guest (individual or group lead). Required for reservations.",
              ),
            contactNumber: z
              .string()
              .max(255)
              .describe(
                "Primary contact phone number for the guest (with country code if possible).",
              ),
            email: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Email address for the guest (optional but recommended for reservations and confirmations).",
              ),
            address: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Physical/mailing address of the guest (optional, for compliance or contact reasons).",
              ),
            identificationType: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Type of ID provided by the guest (e.g., passport, ID card, driver’s license).",
              ),
            identificationNumber: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "The identification number/code for the selected identificationType (for compliance/audit).",
              ),
            notes: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Additional staff notes about the guest. For info relevant to hotel staff only. Not shown to guest.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a hotel guest (individual or group lead). Used for reservations and management—records contact and identification info. Supports free-form notes for staff.",
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
      guestId: z
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
    name: "getGuest",
    description:
      "Fetch details of a guest by unique ID. For internal/staff lookup. Returns all guest details except system-only fields.",
    parameters: GetGuestMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new GetGuestMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return GetGuestMcpController.getOutputSchema().parse(result);
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
