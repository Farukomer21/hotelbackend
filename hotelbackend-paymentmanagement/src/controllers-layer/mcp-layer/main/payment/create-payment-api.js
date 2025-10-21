const { CreatePaymentManager } = require("apiLayer");
const { z } = require("zod");

const PaymentManagementMcpController = require("../../PaymentManagementServiceMcpController");

class CreatePaymentMcpController extends PaymentManagementMcpController {
  constructor(params) {
    super("createPayment", "createpayment", params);
    this.dataName = "payment";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreatePaymentManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        payment: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to reservation (reservationManagement:reservation). Required for linking payment to booking.",
              ),
            amount: z
              .number()
              .describe(
                "Amount paid (or attempted) for this payment, in the currency specified. Required.",
              ),
            currency: z
              .string()
              .max(255)
              .describe(
                "ISO code for currency (e.g., 'USD', 'EUR'). Required.",
              ),
            paymentMethod: z
              .enum(["cash", "card", "transfer", "other"])
              .describe(
                "Payment method used for this payment (cash, card, transfer, or other). Required. Used for reporting and audit.",
              ),
            paidAt: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Timestamp when payment was received. Null if payment not completed. Set to now() if not specified on 'status=paid'.",
              ),
            status: z
              .enum(["pending", "paid", "failed", "partiallyPaid"])
              .describe(
                "Status of the payment: pending (recorded, not yet paid), paid (confirmed), failed, partiallyPaid. Required for workflow and audit.",
              ),
            reference: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Free text or code used to reference this payment externally (e.g., bank transfer ref, POS slip, staff note). Optional.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a payment made for a reservation. Includes reference to reservation, amount, currency, payment method, paid date, status, and reference code for audit or external payment linkages. Multiple payments per reservation are allowed (split or partial payments).",
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
          "Reference to reservation (reservationManagement:reservation). Required for linking payment to booking.",
        ),

      amount: z
        .number()
        .describe(
          "Amount paid (or attempted) for this payment, in the currency specified. Required.",
        ),

      currency: z
        .string()
        .max(255)
        .describe("ISO code for currency (e.g., 'USD', 'EUR'). Required."),

      paymentMethod: z
        .enum([])
        .describe(
          "Payment method used for this payment (cash, card, transfer, or other). Required. Used for reporting and audit.",
        ),

      paidAt: z
        .string()
        .optional()
        .describe(
          "Timestamp when payment was received. Null if payment not completed. Set to now() if not specified on 'status=paid'.",
        ),

      status: z
        .enum([])
        .describe(
          "Status of the payment: pending (recorded, not yet paid), paid (confirmed), failed, partiallyPaid. Required for workflow and audit.",
        ),

      reference: z
        .string()
        .max(255)
        .optional()
        .describe(
          "Free text or code used to reference this payment externally (e.g., bank transfer ref, POS slip, staff note). Optional.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createPayment",
    description:
      "Creates a new payment record for a reservation (staff or guest). Requires reservationId, amount, currency, method, status; optionally paidAt/reference. Errors if reservationId not found.",
    parameters: CreatePaymentMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreatePaymentMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return CreatePaymentMcpController.getOutputSchema().parse(result);
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
