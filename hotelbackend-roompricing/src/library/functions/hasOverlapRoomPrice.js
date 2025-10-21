// Checks if a room price period overlaps any other (excluding deleted/soft-deleted), used in create
module.exports = async (roomId, validFrom, validTo) => {
  const RoomPrice = await this.getModel("roomPrice");
  const overlapping = await RoomPrice.findOne({
    where: {
      roomId,
      isActive: true,
      validFrom: { $lte: validTo },
      validTo: { $gte: validFrom },
    },
  });
  return !!overlapping;
};
