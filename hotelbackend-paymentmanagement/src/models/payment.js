const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a payment made for a reservation. Includes reference to reservation, amount, currency, payment method, paid date, status, and reference code for audit or external payment linkages. Multiple payments per reservation are allowed (split or partial payments).
const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to reservation (reservationManagement:reservation). Required for linking payment to booking.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    amount: {
      // Amount paid (or attempted) for this payment, in the currency specified. Required.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    currency: {
      // ISO code for currency (e.g., 'USD', 'EUR'). Required.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    paymentMethod: {
      // Payment method used for this payment (cash, card, transfer, or other). Required. Used for reporting and audit.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "cash",
    },
    paidAt: {
      // Timestamp when payment was received. Null if payment not completed. Set to now() if not specified on 'status=paid'.
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      // Status of the payment: pending (recorded, not yet paid), paid (confirmed), failed, partiallyPaid. Required for workflow and audit.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    reference: {
      // Free text or code used to reference this payment externally (e.g., bank transfer ref, POS slip, staff note). Optional.
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["reservationId"],
      },
    ],
  },
);

module.exports = Payment;
