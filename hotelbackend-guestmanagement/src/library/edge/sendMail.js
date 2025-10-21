module.exports = async (request) => {
  /* Mock of async mail */ return {
    status: 200,
    message: "Email sent (mock)",
    sentTo: request.body && request.body.to,
  };
};
