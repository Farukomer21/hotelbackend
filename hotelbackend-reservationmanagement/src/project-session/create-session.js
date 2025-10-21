module.exports = {
  createSession: () => {
    const SessionManager = require("./hotelbackend-session");
    return new SessionManager();
  },
};
