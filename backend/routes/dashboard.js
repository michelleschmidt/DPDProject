const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controllers/doctorController");
const userController = require("../controllers/userController");

// To be decided if needed

router.get("/user/:userId", (req, res) => {
  Appointment.findAll({ where: { userId: req.params.userId } })
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/doctor/:doctorId", (req, res) => {
  Appointment.findAll({ where: { doctorId: req.params.doctorId } })
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

const db = require("../models");
const bcrypt = require("bcrypt");

class userService {
  async create(data) {
    data.email = data.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await db.User.create(data);
    return user;
  }

  async get() {
    const user = await db.User.findAll();
    return user;
  }

  async findOne(data) {
    const user = await db.User.findOne(data);
    return user;
  }

  async getById(id) {
    const user = await db.User.findByPk(id);
    return user;
  }

  async getLoggedInUser(id) {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(id, data) {
    data.email = data.email.toLowerCase();
    const user = await db.User.update(data, {
      where: {
        id: id,
      },
    });
    return user;
  }

  async delete(id) {
    const user = await db.User.destroy({
      where: {
        id: id,
      },
    });
    return user;
  }

  async delete(id) {
    const betslip = await db.Betslip.destroy({
      where: {
        id: id,
      },
    });
    return betslip;
  }

  async getById(id) {
    const betslip = await db.Betslip.findByPk(id);
    return betslip;
  }
}

module.exports = userService;

const { Request, Response } = require("express");

const userService = require("../service/user-service");

class userController {
  async create(req, res, next) {
    try {
      const service = new userService();
      const user = await service.create(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }


  async get(req, res, next) {
    try {
      const service = new userService();
      const user = await service.get();
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const service = new userService();
      const user = await service.getById(req.params.id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getLoggedInUser(req, res, next) {
    try {
      const service = new userService();
      const user = await service.getLoggedInUser(req.user.userId);
      res.status(201).json({
        userId: user.id,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
        email: user.email,
        username: user.userName,
        restriction: user.restricted,
        location: user.location,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const service = new userService();
      const user = await service.update(req.params.id, req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const service = new userService();
      const user = await service.delete(req.params.id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new userController();

const Betslip = sequelize.define("Betslip", {
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        message: "field can not be empty",
      },
    },
  },
  totalOdds: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        message: "field can not be empty",
      },
    },
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },

  type: {
    type: DataTypes.STRING,
    defaultValue: "accumulator",
  },

  activeUntil: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  fixtures: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    restricted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  });
  User.associate = (model) => {
    User.hasMany(model.Betslip);
    model.Betslip.belongsTo(User);
  };

  return User;
};

// INSERT INTO person (name)
// VALUES ('["name1", "name2", "name3"]');
// Or Insert JSON data by Key:Value
