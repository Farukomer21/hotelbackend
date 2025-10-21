const { UpdateSpecialRequestManager } = require("apiLayer");
const { z } = require("zod");

const SpecialRequestManagementMcpController = require("../../SpecialRequestManagementServiceMcpController");

class UpdateSpecialRequestMcpController extends SpecialRequestManagementMcpController {
  constructor(params) {
    super("updateSpecialRequest", "updatespecialrequest", params);
    this.dataName = "specialRequest";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateSpecialRequestManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        specialRequest: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation this special request is attached to.",
              ),
            requestText: z
              .string()
              .max(255)
              .describe(
                "Free-form user/staff description of the special request.",
              ),
            status: z
              .enum(["requested", "inProgress", "fulfilled", "denied"])
              .describe(
                "Current operational status of request: requested, inProgress, fulfilled, denied.",
              ),
            staffNote: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Internal staff note for context/auditing fulfillment or denial reasons. Modifiable only by staff-side tools.",
              ),
            submittedAt: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Timestamp when the request was submitted. If not provided, auto-set to now on create.",
              ),
            resolvedAt: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Timestamp when the special request was completed (fulfilled or denied), set by staff as status changes. Should be null for requested/inProgress.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A special request attached to a specific reservation (e.g., late check-out, accessibility, dietary, etc.). Supports guest/staff initiation, operational status (requested/inProgress/fulfilled/denied), and staff notes for processing and audits.",
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
      specialRequestId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      status: z
        .enum([])
        .optional()
        .describe(
          "Current operational status of request: requested, inProgress, fulfilled, denied.",
        ),

      staffNote: z
        .string()
        .optional()
        .describe(
          "Internal staff note for context/auditing fulfillment or denial reasons. Modifiable only by staff-side tools.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateSpecialRequest",
    description:
      "Update the status and/or staffNote on an existing special request record. ReservationId/requestText not updatable. Setting status to &#39;fulfilled&#39; or &#39;denied&#39; triggers resolvedAt autocalculation.",
    parameters: UpdateSpecialRequestMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new UpdateSpecialRequestMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return UpdateSpecialRequestMcpController.getOutputSchema().parse(result);
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
