const { EntityCache } = require("common");

class ReservationEntityCache extends EntityCache {
  constructor() {
    super("reservation", ["reservationCode"]);
  }

  async getReservationById(reservationId) {
    const result = await this.getEntityFromCache(reservationId);
    return result;
  }

  async getReservations(input) {
    const query = {};

    const result = await this.selectEntityFromCache(query);
    return result;
  }
}

module.exports = {
  ReservationEntityCache,
};
