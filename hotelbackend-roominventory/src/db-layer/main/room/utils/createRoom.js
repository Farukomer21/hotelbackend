const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Room } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("room");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "roomNumber",
    "type",
    "floor",
    "occupancyLimit",
    "status",
  ];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createRoom = async (data) => {
  try {
    validateData(data);

    const current_room = data.id ? await Room.findByPk(data.id) : null;
    let newroom = null;

    if (current_room) {
      delete data.id;
      data.isActive = true;
      await current_room.update(data);
      newroom = current_room;
    }

    if (!newroom) {
      newroom = await Room.create(data);
    }

    const _data = newroom.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingRoom", err);
  }
};

module.exports = createRoom;
