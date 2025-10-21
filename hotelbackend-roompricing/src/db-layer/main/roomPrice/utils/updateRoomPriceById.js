const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { RoomPrice } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("roomPrice");
  await elasticIndexer.indexData(data);
};

const updateRoomPriceById = async (id, dataClause) => {
  try {
    if (!id && dataClause.id) {
      id = dataClause.id;
      delete dataClause.id;
    }

    if (typeof id === "object") {
      if (!dataClause) dataClause = id;
      id = id.id;
      delete dataClause.id;
    }

    if (!id)
      throw new BadRequestError("ID is required in utility update function");

    const existingDoc = await RoomPrice.findOne({
      where: { id, isActive: true },
    });

    if (!existingDoc) {
      throw new NotFoundError(`Record with ID ${id} not found.`);
    }

    const options = { where: { id, isActive: true }, returning: true };

    const [rowsCount, [dbDoc]] = await RoomPrice.update(dataClause, options);
    if (!dbDoc) {
      throw new NotFoundError("Record not found for update.");
    }
    const _data = dbDoc.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "An unexpected error occurred during the update operation.",
      err,
    );
  }
};

module.exports = updateRoomPriceById;
