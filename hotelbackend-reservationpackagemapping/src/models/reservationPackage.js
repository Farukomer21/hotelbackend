const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Join table between a reservation and a package. Each row represents a single package mapped to a reservation (1:M from reservation to reservationPackage, 1:M from package to reservationPackage). Enables assignment, lookup, and unassignment of packages per reservation. Use composite index for uniqueness (one package per reservation).
const ReservationPackage = sequelize.define(
  "reservationPackage",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation this package is assigned to. Foreign key to reservationManagement:reservation.id.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    packageId: {
      // Reference to the package being assigned. Foreign key to packageManagement:package.id.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    assignedAt: {
      // Timestamp of when the package was assigned to the reservation.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
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
      {
        unique: false,
        fields: ["packageId"],
      },

      {
        unique: true,
        fields: ["reservationId", "packageId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = ReservationPackage;
