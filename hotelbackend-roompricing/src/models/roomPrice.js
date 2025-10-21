const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a price entry for a hotel room, including validity period and history/audit reason. Linked to a roomInventory:room. Used to track price changes over time for reporting, billing, and audit.
const RoomPrice = sequelize.define(
  "roomPrice",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    roomId: {
      // Foreign key to roomInventory:room. Identifies which room this price applies to.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    price: {
      // Room price in base hotel currency. Must be >= 0.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    validFrom: {
      // Start date/time for this price entry. Inclusive. Required for all entries.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    validTo: {
      // End date/time for this price entry. Inclusive. Required for all entries.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    reason: {
      // (Optional) Free-text reason describing why the price was set or modified (e.g., 'seasonal adjustment', 'promo', 'rate update').
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
        fields: ["roomId"],
      },
      {
        unique: false,
        fields: ["validFrom"],
      },

      {
        unique: true,
        fields: ["roomId", "validFrom"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = RoomPrice;
