const { HttpServerError } = require("common");

let { Package_ } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getPackage_ById = async (package_Id) => {
  try {
    const package_ = Array.isArray(package_Id)
      ? await Package_.findAll({
          where: {
            id: { [Op.in]: package_Id },
            isActive: true,
          },
        })
      : await Package_.findOne({
          where: {
            id: package_Id,
            isActive: true,
          },
        });

    if (!package_) {
      return null;
    }
    return Array.isArray(package_Id)
      ? package_.map((item) => item.getData())
      : package_.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingPackage_ById", err);
  }
};

module.exports = getPackage_ById;
