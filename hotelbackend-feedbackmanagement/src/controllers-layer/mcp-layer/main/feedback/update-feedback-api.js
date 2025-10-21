const { UpdateFeedbackManager } = require("apiLayer");
const { z } = require("zod");

const FeedbackManagementMcpController = require("../../FeedbackManagementServiceMcpController");

class UpdateFeedbackMcpController extends FeedbackManagementMcpController {
  constructor(params) {
    super("updateFeedback", "updatefeedback", params);
    this.dataName = "feedback";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateFeedbackManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        feedback: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation for which this feedback is submitted. Foreign key to reservationManagement:reservation.",
              ),
            rating: z
              .number()
              .int()
              .describe(
                "Feedback rating from 1 (worst) to 5 (best). Required.",
              ),
            comment: z
              .string()
              .describe(
                "Guest's free-form comment, experience note, or suggestion. Required for meaningful feedback.",
              ),
            submittedAt: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Date/time the feedback was submitted. Auto-set to now on create if not provided.",
              ),
            response: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Optional staff comment or follow-up in response to feedback. Editable only by staff via updateFeedback.",
              ),
            category: z
              .string()
              .max(255)
              .describe(
                "Feedback category or topic for staff analysis/filtering (e.g., housekeeping, room, service). Required. If not selected by guest, default to 'general'.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Feedback submitted by guests for a hotel stay or service, linked to a reservation. Contains rating, comments, staff response, category, and submission timestamp.",
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
      feedbackId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      rating: z
        .number()
        .int()
        .optional()
        .describe("Feedback rating from 1 (worst) to 5 (best). Required."),

      comment: z
        .string()
        .optional()
        .describe(
          "Guest's free-form comment, experience note, or suggestion. Required for meaningful feedback.",
        ),

      response: z
        .string()
        .optional()
        .describe(
          "Optional staff comment or follow-up in response to feedback. Editable only by staff via updateFeedback.",
        ),

      category: z
        .string()
        .max(255)
        .optional()
        .describe(
          "Feedback category or topic for staff analysis/filtering (e.g., housekeeping, room, service). Required. If not selected by guest, default to 'general'.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateFeedback",
    description:
      "Staff/internal tool API to update feedback entry (response, category, comment, rating). reservationId and submittedAt cannot be updated.",
    parameters: UpdateFeedbackMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new UpdateFeedbackMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return UpdateFeedbackMcpController.getOutputSchema().parse(result);
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
