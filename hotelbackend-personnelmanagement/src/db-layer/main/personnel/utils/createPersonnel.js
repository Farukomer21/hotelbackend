const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Personnel } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("personnel");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "fullName",
    "jobTitle",
    "contactNumber",
    "hireDate",
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

const createPersonnel = async (data) => {
  try {
    validateData(data);

    const current_personnel = data.id
      ? await Personnel.findByPk(data.id)
      : null;
    let newpersonnel = null;

    if (current_personnel) {
      delete data.id;
      data.isActive = true;
      await current_personnel.update(data);
      newpersonnel = current_personnel;
    }

    if (!newpersonnel) {
      newpersonnel = await Personnel.create(data);
    }

    const _data = newpersonnel.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingPersonnel", err);
  }
};

module.exports = createPersonnel;
