module.exports = (headers) => {
  // Guest Db Object Rest Api Router
  const guestMcpRouter = [];

  // createGuest controller
  guestMcpRouter.push(require("./create-guest-api")(headers));
  // getGuest controller
  guestMcpRouter.push(require("./get-guest-api")(headers));
  // updateGuest controller
  guestMcpRouter.push(require("./update-guest-api")(headers));
  // deleteGuest controller
  guestMcpRouter.push(require("./delete-guest-api")(headers));
  // listGuests controller
  guestMcpRouter.push(require("./list-guests-api")(headers));

  return guestMcpRouter;
};
