const { HttpServerError } = require("common");

let { Personnel } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getPersonnelById = async (personnelId) => {
  try {
    const personnel = Array.isArray(personnelId)
      ? await Personnel.findAll({
          where: {
            id: { [Op.in]: personnelId },
            isActive: true,
          },
        })
      : await Personnel.findOne({
          where: {
            id: personnelId,
            isActive: true,
          },
        });

    if (!personnel) {
      return null;
    }
    return Array.isArray(personnelId)
      ? personnel.map((item) => item.getData())
      : personnel.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingPersonnelById", err);
  }
};

module.exports = getPersonnelById;
