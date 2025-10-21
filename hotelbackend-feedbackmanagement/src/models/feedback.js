const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Feedback submitted by guests for a hotel stay or service, linked to a reservation. Contains rating, comments, staff response, category, and submission timestamp.
const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation for which this feedback is submitted. Foreign key to reservationManagement:reservation.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    rating: {
      // Feedback rating from 1 (worst) to 5 (best). Required.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      // Guest's free-form comment, experience note, or suggestion. Required for meaningful feedback.
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "text",
    },
    submittedAt: {
      // Date/time the feedback was submitted. Auto-set to now on create if not provided.
      type: DataTypes.DATE,
      allowNull: true,
    },
    response: {
      // Optional staff comment or follow-up in response to feedback. Editable only by staff via updateFeedback.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      // Feedback category or topic for staff analysis/filtering (e.g., housekeeping, room, service). Required. If not selected by guest, default to 'general'.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "general",
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

module.exports = Feedback;
