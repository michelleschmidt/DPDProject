const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");




dashboardRouter.get('/', dashboardController.search);
dashboardRouter.get('/languages', dashboardController.getLanguages);
dashboardRouter.get('/specializations', dashboardController.getSpecializations);

module.exports = dashboardRouter;