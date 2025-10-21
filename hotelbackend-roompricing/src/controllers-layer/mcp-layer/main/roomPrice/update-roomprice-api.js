const { UpdateRoomPriceManager } = require("apiLayer");
const { z } = require("zod");

const RoomPricingMcpController = require("../../RoomPricingServiceMcpController");

class UpdateRoomPriceMcpController extends RoomPricingMcpController {
  constructor(params) {
    super("updateRoomPrice", "updateroomprice", params);
    this.dataName = "roomPrice";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateRoomPriceManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        roomPrice: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            roomId: z
              .string()
              .uuid()
              .describe(
                "Foreign key to roomInventory:room. Identifies which room this price applies to.",
              ),
            price: z
              .number()
              .describe("Room price in base hotel currency. Must be >= 0."),
            validFrom: z
              .string()
              .describe(
                "Start date/time for this price entry. Inclusive. Required for all entries.",
              ),
            validTo: z
              .string()
              .describe(
                "End date/time for this price entry. Inclusive. Required for all entries.",
              ),
            reason: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "(Optional) Free-text reason describing why the price was set or modified (e.g., 'seasonal adjustment', 'promo', 'rate update').",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a price entry for a hotel room, including validity period and history/audit reason. Linked to a roomInventory:room. Used to track price changes over time for reporting, billing, and audit.",
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
      roomPriceId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      price: z
        .number()
        .optional()
        .describe("Room price in base hotel currency. Must be >= 0."),

      validFrom: z
        .string()
        .optional()
        .describe(
          "Start date/time for this price entry. Inclusive. Required for all entries.",
        ),

      validTo: z
        .string()
        .optional()
        .describe(
          "End date/time for this price entry. Inclusive. Required for all entries.",
        ),

      reason: z
        .string()
        .max(255)
        .optional()
        .describe(
          "(Optional) Free-text reason describing why the price was set or modified (e.g., 'seasonal adjustment', 'promo', 'rate update').",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateRoomPrice",
    description:
      "Update an existing room price record (by ID). Validates positive price, date range, and non-overlapping for the room. Only price, validFrom/validTo, and reason are allowed to change. Internal/staff only.",
    parameters: UpdateRoomPriceMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new UpdateRoomPriceMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return UpdateRoomPriceMcpController.getOutputSchema().parse(result);
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
