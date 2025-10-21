// Like hasOverlapRoomPrice, but excludes specified recordId (for update)
module.exports = async (roomId, validFrom, validTo, recordId) => {
  const RoomPrice = await this.getModel("roomPrice");
  const overlapping = await RoomPrice.findOne({
    where: {
      roomId,
      isActive: true,
      id: { $ne: recordId },
      validFrom: { $lte: validTo },
      validTo: { $gte: validFrom },
    },
  });
  return !!overlapping;
};
