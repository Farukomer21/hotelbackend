const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Package_ } = require("models");
const { Op } = require("sequelize");

const getPackage_AggById = async (package_Id) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const package_ = Array.isArray(package_Id)
      ? await Package_.findAll({
          where: {
            id: { [Op.in]: package_Id },
            isActive: true,
          },
          include: includes,
        })
      : await Package_.findOne({
          where: {
            id: package_Id,
            isActive: true,
          },
          include: includes,
        });

    if (!package_) {
      return null;
    }

    const package_Data =
      Array.isArray(package_Id) && package_Id.length > 0
        ? package_.map((item) => item.getData())
        : package_.getData();
    await Package_.getCqrsJoins(package_Data);
    return package_Data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackage_AggById",
      err,
    );
  }
};

module.exports = getPackage_AggById;
