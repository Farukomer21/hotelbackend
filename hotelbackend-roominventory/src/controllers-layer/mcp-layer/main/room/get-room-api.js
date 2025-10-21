const { GetRoomManager } = require("apiLayer");
const { z } = require("zod");

const RoomInventoryMcpController = require("../../RoomInventoryServiceMcpController");

class GetRoomMcpController extends RoomInventoryMcpController {
  constructor(params) {
    super("getRoom", "getroom", params);
    this.dataName = "room";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetRoomManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        room: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            roomNumber: z
              .string()
              .max(255)
              .describe(
                "The unique identifier for the room within the hotel (e.g., '101', 'A04').",
              ),
            type: z
              .enum([
                "single",
                "double",
                "suite",
                "family",
                "deluxe",
                "accessible",
                "other",
              ])
              .describe(
                "Type or category of the room (e.g., single, double, suite, deluxe, family, accessible, other).",
              ),
            amenities: z.array(
              z
                .string()
                .max(255)
                .optional()
                .nullable()
                .describe(
                  "List of amenities and facilities available in this room (e.g., 'wifi', 'mini-bar', 'tv').",
                ),
            ),
            floor: z
              .number()
              .int()
              .describe("The floor on which the room is located."),
            description: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Freeform description for the room (location, view, remarks for staff) for reference in chatbots and tools.",
              ),
            occupancyLimit: z
              .number()
              .int()
              .describe("Maximum number of guests allowed in this room."),
            status: z
              .enum(["available", "occupied", "maintenance", "outOfService"])
              .describe(
                "Operational status of the room: available (can assign), occupied (assigned to reservation), maintenance, or outOfService.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a hotel room and its specifications for assignment to reservations. Includes type, amenities, floor, status, occupancy, and description.",
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
          "This id paremeter is used to query the required data object.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getRoom",
    description:
      "Fetch detailed info for a room by id. Used by staff tools and for assignment in reservation creation.",
    parameters: GetRoomMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new GetRoomMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return GetRoomMcpController.getOutputSchema().parse(result);
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
