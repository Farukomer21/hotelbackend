const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { SpecialRequest } = require("models");
const { Op } = require("sequelize");

const getIdListOfSpecialRequestByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
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

    let specialRequestIdList = await SpecialRequest.findAll(options);

    if (!specialRequestIdList) {
      throw new NotFoundError(
        `SpecialRequest with the specified criteria not found`,
      );
    }

    specialRequestIdList = specialRequestIdList.map((item) => item.id);
    return specialRequestIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSpecialRequestIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfSpecialRequestByField;
