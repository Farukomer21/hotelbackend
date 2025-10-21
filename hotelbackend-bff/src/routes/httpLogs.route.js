const express = require("express");
const router = express.Router();
const catchAsync = require("common/catchAsync");
const validate = require("middlewares/validate");
const { httpLogsService } = require("services");
const httpLogsValidation = require("validations/httpLogs.validation");

router.route("/search").post(
  validate(httpLogsValidation.searchLogsPost),
  catchAsync(async (req, res) => {
    const result = await httpLogsService.searchLogs({
      ...req.query,
      ...req.body,
    });
    res.json(result);
  }),
);

router.route("/paired/:requestId").get(
  validate(httpLogsValidation.getPairedLogs),
  catchAsync(async (req, res) => {
    const result = await httpLogsService.getPairedLogs(req.params.requestId);
    res.json(result);
  }),
);

module.exports = router;
