const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Guest } = require("models");
const { Op } = require("sequelize");

const getIdListOfGuestByField = async (fieldName, fieldValue, isArray) => {
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

    let guestIdList = await Guest.findAll(options);

    if (!guestIdList) {
      throw new NotFoundError(`Guest with the specified criteria not found`);
    }

    guestIdList = guestIdList.map((item) => item.id);
    return guestIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingGuestIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfGuestByField;
