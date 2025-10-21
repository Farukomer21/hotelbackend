const { DeleteGuestManager } = require("apiLayer");
const { z } = require("zod");

const GuestManagementMcpController = require("../../GuestManagementServiceMcpController");

class DeleteGuestMcpController extends GuestManagementMcpController {
  constructor(params) {
    super("deleteGuest", "deleteguest", params);
    this.dataName = "guest";
    this.crudType = "delete";
  }

  createApiManager() {
    return new DeleteGuestManager(this.request, "mcp");
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
          "This id paremeter is used to select the required data object that will be deleted",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "deleteGuest",
    description:
      "Delete (soft delete if enabled) a guest record by ID. Staff can delete obsolete or duplicate guests. Guests with linked reservations are not deleted automatically (referential integrity is handled in reservationManagement).",
    parameters: DeleteGuestMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new DeleteGuestMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return DeleteGuestMcpController.getOutputSchema().parse(result);
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
