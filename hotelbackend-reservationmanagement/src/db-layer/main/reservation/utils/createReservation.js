const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Reservation } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("reservation");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "reservationCode",
    "guestId",
    "roomId",
    "checkInDate",
    "checkOutDate",
    "status",
    "paymentStatus",
    "totalAmount",
    "numGuests",
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

const createReservation = async (data) => {
  try {
    validateData(data);

    const current_reservation = data.id
      ? await Reservation.findByPk(data.id)
      : null;
    let newreservation = null;

    if (current_reservation) {
      delete data.id;
      data.isActive = true;
      await current_reservation.update(data);
      newreservation = current_reservation;
    }

    if (!newreservation) {
      newreservation = await Reservation.create(data);
    }

    const _data = newreservation.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingReservation", err);
  }
};

module.exports = createReservation;
