const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { ReservationPackage } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("reservationPackage");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["reservationId", "packageId", "assignedAt"];

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

const createReservationPackage = async (data) => {
  try {
    validateData(data);

    const current_reservationPackage = data.id
      ? await ReservationPackage.findByPk(data.id)
      : null;
    let newreservationPackage = null;

    if (current_reservationPackage) {
      delete data.id;
      data.isActive = true;
      await current_reservationPackage.update(data);
      newreservationPackage = current_reservationPackage;
    }

    if (!newreservationPackage) {
      newreservationPackage = await ReservationPackage.create(data);
    }

    const _data = newreservationPackage.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingReservationPackage",
      err,
    );
  }
};

module.exports = createReservationPackage;
