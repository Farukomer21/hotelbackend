const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { SpecialRequest } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("specialRequest");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["reservationId", "requestText", "status"];

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

const createSpecialRequest = async (data) => {
  try {
    validateData(data);

    const current_specialRequest = data.id
      ? await SpecialRequest.findByPk(data.id)
      : null;
    let newspecialRequest = null;

    if (current_specialRequest) {
      delete data.id;
      data.isActive = true;
      await current_specialRequest.update(data);
      newspecialRequest = current_specialRequest;
    }

    if (!newspecialRequest) {
      newspecialRequest = await SpecialRequest.create(data);
    }

    const _data = newspecialRequest.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingSpecialRequest", err);
  }
};

module.exports = createSpecialRequest;
