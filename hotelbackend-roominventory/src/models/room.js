const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a hotel room and its specifications for assignment to reservations. Includes type, amenities, floor, status, occupancy, and description.
const Room = sequelize.define(
  "room",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    roomNumber: {
      // The unique identifier for the room within the hotel (e.g., '101', 'A04').
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    type: {
      // Type or category of the room (e.g., single, double, suite, deluxe, family, accessible, other).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "single",
    },
    amenities: {
      // List of amenities and facilities available in this room (e.g., 'wifi', 'mini-bar', 'tv').
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    floor: {
      // The floor on which the room is located.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      // Freeform description for the room (location, view, remarks for staff) for reference in chatbots and tools.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    occupancyLimit: {
      // Maximum number of guests allowed in this room.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      // Operational status of the room: available (can assign), occupied (assigned to reservation), maintenance, or outOfService.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
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
        fields: ["type"],
      },
      {
        unique: false,
        fields: ["floor"],
      },
      {
        unique: false,
        fields: ["occupancyLimit"],
      },
      {
        unique: false,
        fields: ["status"],
      },

      {
        unique: true,
        fields: ["roomNumber"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Room;
