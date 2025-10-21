module.exports = async (request) => {
  return {
    status: 200,
    message: "Hello from reservationManagement edge function!",
    date: new Date().toISOString(),
  };
};
