const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Hotel staff/personnel record for HR and internal operations; includes contact, job, department, status, and HR notes.
const Personnel = sequelize.define(
  "personnel",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    fullName: {
      // Full legal name of the staff/personnel.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    jobTitle: {
      // Role or job position of staff (e.g., Front Desk, Housekeeping).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    contactNumber: {
      // Primary contact phone number for staff (preferably with country code).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    email: {
      // Work or personal email address (optional for notification or recovery).
      type: DataTypes.STRING,
      allowNull: true,
    },
    hireDate: {
      // Date staff member was hired or joined the hotel.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    department: {
      // Department or functional area (e.g., Housekeeping, Kitchen, Front Desk, Security).
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      // Employment status; active = working; inactive = on leave/retired; terminated = former staff.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    notes: {
      // Notes for internal HR/staff management (free form).
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

module.exports = Personnel;
