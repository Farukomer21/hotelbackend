const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a hotel guest (individual or group lead). Used for reservations and management—records contact and identification info. Supports free-form notes for staff.
const Guest = sequelize.define(
  "guest",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    fullName: {
      // Full legal name of the guest (individual or group lead). Required for reservations.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    contactNumber: {
      // Primary contact phone number for the guest (with country code if possible).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    email: {
      // Email address for the guest (optional but recommended for reservations and confirmations).
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      // Physical/mailing address of the guest (optional, for compliance or contact reasons).
      type: DataTypes.TEXT,
      allowNull: true,
    },
    identificationType: {
      // Type of ID provided by the guest (e.g., passport, ID card, driver’s license).
      type: DataTypes.STRING,
      allowNull: true,
    },
    identificationNumber: {
      // The identification number/code for the selected identificationType (for compliance/audit).
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      // Additional staff notes about the guest. For info relevant to hotel staff only. Not shown to guest.
      type: DataTypes.TEXT,
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
    indexes: [],
  },
);

module.exports = Guest;
