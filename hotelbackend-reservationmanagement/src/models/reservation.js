const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A reservation record for a hotel guest, supports code-based access, guest/room/package assignments, special requests, payment status, lifecycle status, and summary fields.
const Reservation = sequelize.define(
  "reservation",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationCode: {
      // Unique, non-sequential code used by guests to access and manage their reservation.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    guestId: {
      // Reference to the guest making the reservation, links to guestManagement:guest.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    roomId: {
      // Reference to the assigned hotel room, links to roomInventory:room.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    packageIds: {
      // List of assigned package IDs, references packageManagement:package.
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
    checkInDate: {
      // Reservation check-in date.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    checkOutDate: {
      // Reservation check-out date.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    status: {
      // Status of the reservation: booked, canceled, or completed.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "booked",
    },
    specialRequestIds: {
      // IDs of special requests attached to this reservation, links to specialRequestManagement:specialRequest.
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
    paymentStatus: {
      // Payment status: unpaid, partial, paid.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "unpaid",
    },
    totalAmount: {
      // Total cost for the reservation (derived/calculated externally).
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    notes: {
      // Additional notes by staff or guest for this reservation.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    numGuests: {
      // Number of guests included in this reservation, for pricing and capacity validations.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
        fields: ["guestId"],
      },
      {
        unique: false,
        fields: ["roomId"],
      },
      {
        unique: false,
        fields: ["checkInDate"],
      },
      {
        unique: false,
        fields: ["checkOutDate"],
      },
      {
        unique: false,
        fields: ["status"],
      },
      {
        unique: false,
        fields: ["paymentStatus"],
      },
      {
        unique: false,
        fields: ["totalAmount"],
      },

      {
        unique: true,
        fields: ["reservationCode"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Reservation;
