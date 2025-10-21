const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Guest } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("guest");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["fullName", "contactNumber"];

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

const createGuest = async (data) => {
  try {
    validateData(data);

    const current_guest = data.id ? await Guest.findByPk(data.id) : null;
    let newguest = null;

    if (current_guest) {
      delete data.id;
      data.isActive = true;
      await current_guest.update(data);
      newguest = current_guest;
    }

    if (!newguest) {
      newguest = await Guest.create(data);
    }

    const _data = newguest.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingGuest", err);
  }
};

module.exports = createGuest;
