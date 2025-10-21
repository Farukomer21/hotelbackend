const { CreateRoomPriceManager } = require("apiLayer");
const { z } = require("zod");

const RoomPricingMcpController = require("../../RoomPricingServiceMcpController");

class CreateRoomPriceMcpController extends RoomPricingMcpController {
  constructor(params) {
    super("createRoomPrice", "createroomprice", params);
    this.dataName = "roomPrice";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateRoomPriceManager(this.request, "mcp");
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
        .describe(
          "(Optional) Free-text reason describing why the price was set or modified (e.g., 'seasonal adjustment', 'promo', 'rate update').",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createRoomPrice",
    description:
      "Creates a new room price record for a specific room. Requires valid roomId, positive price, and a non-overlapping date range. Stores optional reason for audit/change history. Only staff/internal use.",
    parameters: CreateRoomPriceMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreateRoomPriceMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return CreateRoomPriceMcpController.getOutputSchema().parse(result);
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
