const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A value-added hotel package/service that can be assigned to a reservation. Includes package name, description, pricing, validity dates, and activation status.
const Package_ = sequelize.define(
  "package_",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      // Display name of the package (e.g., 'Breakfast', 'Airport Transfer', 'Spa Access').
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    description: {
      // Longer, optional description of the package, features, or details.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      // The price of the package in the base currency. Must be >= 0.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    availableFrom: {
      // Date from which the package is offered/bookable.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    availableTo: {
      // Date until which the package is offered/bookable (inclusive).
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
        fields: ["name"],
      },
      {
        unique: false,
        fields: ["price"],
      },
      {
        unique: false,
        fields: ["availableFrom"],
      },
      {
        unique: false,
        fields: ["availableTo"],
      },
    ],
  },
);

module.exports = Package_;
