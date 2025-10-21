const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Personnel } = require("models");
const { Op } = require("sequelize");

const getIdListOfPersonnelByField = async (fieldName, fieldValue, isArray) => {
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

    let personnelIdList = await Personnel.findAll(options);

    if (!personnelIdList) {
      throw new NotFoundError(
        `Personnel with the specified criteria not found`,
      );
    }

    personnelIdList = personnelIdList.map((item) => item.id);
    return personnelIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPersonnelIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfPersonnelByField;
