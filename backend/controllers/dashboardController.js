const DashbordService = require("../services/dashboardService");

class DashboardController {

    async search(req, res, next) {
        try {
          const { address, language, specialization, radius } = req.query;
          const doctors = await DashbordService.searchDoctors(address, language, specialization, radius);
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


    //   async search(req, res, next) {
    //     try {
    //       const { address, language, specialization, radius } = req.query;
      
    //       // Perform geocoding to convert the address into geographic coordinates
    //       const geocodingResponse = await axios.get(
    //         "http://api.positionstack.com/v1/forward",
    //         {
    //           params: {
    //             access_key: process.env.ACCESS_KEY,
    //             query: address,
    //           },
    //         }
    //       );
      
    //       const lat = geocodingResponse.data.data[0].latitude;
    //       const lng = geocodingResponse.data.data[0].longitude;
      
    //       const userLocation = {
    //         type: "Point",
    //         coordinates: [lng, lat],
    //       };
      
    //       // Parse the radius value as a number and convert to meters
    //       const radiusInMeters = parseInt(radius) * 1000;
      
    //       const doctors = await DashbordService.findNearbyDoctors(
    //         userLocation,
    //         radiusInMeters,
    //         language,
    //         specialization
    //       );
      
    //       res.status(200).json(doctors);
    //     } catch (error) {
    //       next(error);
    //     }
    //   }
      


}

    module.exports = new DashboardController();