const { DeletePersonnelManager } = require("apiLayer");
const { z } = require("zod");

const PersonnelManagementMcpController = require("../../PersonnelManagementServiceMcpController");

class DeletePersonnelMcpController extends PersonnelManagementMcpController {
  constructor(params) {
    super("deletePersonnel", "deletepersonnel", params);
    this.dataName = "personnel";
    this.crudType = "delete";
  }

  createApiManager() {
    return new DeletePersonnelManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        personnel: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            fullName: z
              .string()
              .max(255)
              .describe("Full legal name of the staff/personnel."),
            jobTitle: z
              .string()
              .max(255)
              .describe(
                "Role or job position of staff (e.g., Front Desk, Housekeeping).",
              ),
            contactNumber: z
              .string()
              .max(255)
              .describe(
                "Primary contact phone number for staff (preferably with country code).",
              ),
            email: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Work or personal email address (optional for notification or recovery).",
              ),
            hireDate: z
              .string()
              .describe("Date staff member was hired or joined the hotel."),
            department: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Department or functional area (e.g., Housekeeping, Kitchen, Front Desk, Security).",
              ),
            status: z
              .enum(["active", "inactive", "terminated"])
              .describe(
                "Employment status; active = working; inactive = on leave/retired; terminated = former staff.",
              ),
            notes: z
              .string()
              .optional()
              .nullable()
              .describe("Notes for internal HR/staff management (free form)."),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Hotel staff/personnel record for HR and internal operations; includes contact, job, department, status, and HR notes.",
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
      personnelId: z
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
    name: "deletePersonnel",
    description:
      "Delete a staff/personnel record by unique ID. By default uses soft delete for integrity; for HR/remove ex-staff.",
    parameters: DeletePersonnelMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new DeletePersonnelMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return DeletePersonnelMcpController.getOutputSchema().parse(result);
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
