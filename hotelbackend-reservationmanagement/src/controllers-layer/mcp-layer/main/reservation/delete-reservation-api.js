const { DeleteReservationManager } = require("apiLayer");
const { z } = require("zod");

const ReservationManagementMcpController = require("../../ReservationManagementServiceMcpController");

class DeleteReservationMcpController extends ReservationManagementMcpController {
  constructor(params) {
    super("deleteReservation", "deletereservation", params);
    this.dataName = "reservation";
    this.crudType = "delete";
  }

  createApiManager() {
    return new DeleteReservationManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        reservation: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationCode: z
              .string()
              .max(255)
              .describe(
                "Unique, non-sequential code used by guests to access and manage their reservation.",
              ),
            guestId: z
              .string()
              .uuid()
              .describe(
                "Reference to the guest making the reservation, links to guestManagement:guest.",
              ),
            roomId: z
              .string()
              .uuid()
              .describe(
                "Reference to the assigned hotel room, links to roomInventory:room.",
              ),
            packageIds: z.array(
              z
                .string()
                .uuid()
                .optional()
                .nullable()
                .describe(
                  "List of assigned package IDs, references packageManagement:package.",
                ),
            ),
            checkInDate: z.string().describe("Reservation check-in date."),
            checkOutDate: z.string().describe("Reservation check-out date."),
            status: z
              .enum(["booked", "canceled", "completed"])
              .describe(
                "Status of the reservation: booked, canceled, or completed.",
              ),
            specialRequestIds: z.array(
              z
                .string()
                .uuid()
                .optional()
                .nullable()
                .describe(
                  "IDs of special requests attached to this reservation, links to specialRequestManagement:specialRequest.",
                ),
            ),
            paymentStatus: z
              .enum(["unpaid", "partial", "paid"])
              .describe("Payment status: unpaid, partial, paid."),
            totalAmount: z
              .number()
              .describe(
                "Total cost for the reservation (derived/calculated externally).",
              ),
            notes: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Additional notes by staff or guest for this reservation.",
              ),
            numGuests: z
              .number()
              .int()
              .describe(
                "Number of guests included in this reservation, for pricing and capacity validations.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A reservation record for a hotel guest, supports code-based access, guest/room/package assignments, special requests, payment status, lifecycle status, and summary fields.",
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
      reservationId: z
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
    name: "deleteReservation",
    description:
      "Staff operation to hard/soft delete a reservation by ID (staff use only).",
    parameters: DeleteReservationMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new DeleteReservationMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return DeleteReservationMcpController.getOutputSchema().parse(result);
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
