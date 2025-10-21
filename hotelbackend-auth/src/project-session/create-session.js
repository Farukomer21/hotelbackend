module.exports = {
  createSession: () => {
    const SessionManager = require("./hotelbackend-login-session");
    return new SessionManager();
  },
};
