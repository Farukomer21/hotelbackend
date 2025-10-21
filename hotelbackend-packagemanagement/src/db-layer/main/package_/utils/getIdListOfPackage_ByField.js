const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Package_ } = require("models");
const { Op } = require("sequelize");

const getIdListOfPackage_ByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let package_IdList = await Package_.findAll(options);

    if (!package_IdList) {
      throw new NotFoundError(`Package_ with the specified criteria not found`);
    }

    package_IdList = package_IdList.map((item) => item.id);
    return package_IdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackage_IdListByField",
      err,
    );
  }
};

module.exports = getIdListOfPackage_ByField;
