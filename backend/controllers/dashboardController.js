const DashbordService = require("../services/dashboardService");

class DashboardController {
  async search(req, res, next) {
    try {
      const { address, language, specialization, radius } = req.query;
      const doctors = await DashbordService.searchDoctors(
        address,
        language,
        specialization,
        radius
      );
      res.status(200).json(doctors);
    } catch (error) {
      next(error);
    }
  }

  async getLanguages(req, res, next) {
    try {
      const languages = await DashbordService.getLanguages();
      res.status(201).json(languages);
    } catch (error) {
      next(error);
    }
  }
  async getSpecializations(req, res, next) {
    try {
      const specializations = await DashbordService.getSpecializations();
      res.status(201).json(specializations);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorsByLanguage(req, res, next) {
    try {
      const languagesWithCounts = await DashbordService.getDoctorsByLanguage();
      res.json(languagesWithCounts);
    } catch (error) {
      next(error);
    }
  }


  async getUsersByLanguage(req, res, next) {
    try {
      const result = await DashbordService.getUsersByLanguage();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
