const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { RoomPrice } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("roomPrice");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["roomId", "price", "validFrom", "validTo"];

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

const createRoomPrice = async (data) => {
  try {
    validateData(data);

    const current_roomPrice = data.id
      ? await RoomPrice.findByPk(data.id)
      : null;
    let newroomPrice = null;

    if (current_roomPrice) {
      delete data.id;
      data.isActive = true;
      await current_roomPrice.update(data);
      newroomPrice = current_roomPrice;
    }

    if (!newroomPrice) {
      newroomPrice = await RoomPrice.create(data);
    }

    const _data = newroomPrice.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingRoomPrice", err);
  }
};

module.exports = createRoomPrice;
