const axios = require('axios');
const db = require("../models");
bcrypt = require("bcryptjs");

const User = db.User;
const Op = db.Op;
const Specialization = db.Specialization;
const Language = db.Language;



class DashboardService{

    async searchDoctors(address, language, specialization, radius) {
      try {
        // Geocode the address
        const location = await this.geocodeAddress(address);
    
        // Build the query
        const query = this.buildQuery(location, radius, language, specialization);
    
        // Perform the search
        const doctors = await User.findAll(query);
    
        // Check if no doctors were found
        if (doctors.length === 0) {
          throw new Error("No doctors found");
        }
    
        return doctors;
      } catch (error) {
        throw error;
      }
    }
    
    async geocodeAddress(address) {
      try {
        const response = await axios.get(
          "http://api.positionstack.com/v1/forward",
          {
            params: {
              access_key: process.env.API_ACCESS_KEY,
              query: address,
            },
          }
        );
    
        const { latitude, longitude } = response.data.data[0];
        return { latitude, longitude };
      } catch (error) {
        throw new Error("Geocoding failed");
      }
    }
    
    buildQuery(location, radius, language, specialization) {
      const query = {
        where: {
          role: "doctor",
        },
        include: [
          {
            model: Specialization,
            attributes: ["area_of_specialization"],
            where: {},
          },
          {
            model: Language,
            attributes: ["language_name"],
            through: { attributes: [] }, // Exclude attributes from the junction table
            where: {},
          },
        ],
      };
    
      // Add location-based search if address is provided
      if (location) {
        query.where = {
          ...query.where,
          [Op.and]: db.Sequelize.where(
            db.Sequelize.fn(
              'ST_Distance_Sphere',
              db.Sequelize.col('location'),
              db.Sequelize.fn('ST_GeomFromText', `POINT(${location.longitude} ${location.latitude})`)
            ),
            { [Op.lte]: radius * 1000 } // Convert km to meters
          ),
        };
      }
    
      // Add language filter if provided
      if (language) {
        query.include[1].where.language_name = {
          [Op.in]: Array.isArray(language) ? language : [language],
        };
      }
    
      // Add specialization filter if provided
      if (specialization) {
        query.include[0].where.area_of_specialization = specialization;
      }
    
      return query;
    }


    
  async getLanguages() {
    const languages = await Language.findAll();
    return languages;
  }

  async getSpecializations() {
    const specializations = await Specialization.findAll();
    return specializations;
  }

      
}


module.exports = new DashboardService();