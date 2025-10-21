const crypto = require("crypto");

// Generates a secure, unpredictable, non-sequential reservation code. Default length: 8, easily changed if higher security wanted.
module.exports = function generateReservationCode(length = 8) {
  let code;
  let isValid = false;
  while (!isValid) {
    code = crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length)
      .toUpperCase();
    // Optionally, add checks here (e.g., not starting with 0, must contain at least one letter and number, avoid ambiguous characters)
    // In production, check code isn't already used (here, uniqueness is enforced at DB level)
    isValid = /^[A-Z0-9]+$/.test(code);
  }
  return code;
};
