const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A special request attached to a specific reservation (e.g., late check-out, accessibility, dietary, etc.). Supports guest/staff initiation, operational status (requested/inProgress/fulfilled/denied), and staff notes for processing and audits.
const SpecialRequest = sequelize.define(
  "specialRequest",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation this special request is attached to.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    requestText: {
      // Free-form user/staff description of the special request.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    status: {
      // Current operational status of request: requested, inProgress, fulfilled, denied.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "requested",
    },
    staffNote: {
      // Internal staff note for context/auditing fulfillment or denial reasons. Modifiable only by staff-side tools.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    submittedAt: {
      // Timestamp when the request was submitted. If not provided, auto-set to now on create.
      type: DataTypes.DATE,
      allowNull: true,
    },
    resolvedAt: {
      // Timestamp when the special request was completed (fulfilled or denied), set by staff as status changes. Should be null for requested/inProgress.
      type: DataTypes.DATE,
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

module.exports = SpecialRequest;
