const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Package_ } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("package_");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["name", "price", "availableFrom", "availableTo"];

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

const createPackage_ = async (data) => {
  try {
    validateData(data);

    const current_package_ = data.id ? await Package_.findByPk(data.id) : null;
    let newpackage_ = null;

    if (current_package_) {
      delete data.id;
      data.isActive = true;
      await current_package_.update(data);
      newpackage_ = current_package_;
    }

    if (!newpackage_) {
      newpackage_ = await Package_.create(data);
    }

    const _data = newpackage_.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingPackage_", err);
  }
};

module.exports = createPackage_;
