const db = require('../database/db');
const helpers = require('../config/helpers');
const Joi = require('joi');
var uuid = require('node-uuid');
require('dotenv').config();

module.exports = {

getProfile: async(req, res, next) => {

  var data = {
    _id: req.user.uuid,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    phone_number: req.user.pone_number,
    avatar: req.user.avatar,
    email: req.user.email,
    type: req.user.type
  }
  return res.status(200).json({
    success: {
      status: "SUCCESS",
      data: data
    }
  });
},

fareEstimation: async(req, res, next) => {

  const loginSchema = Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.string().required(),
  }).unknown();

  const validate = Joi.validate(req.body, loginSchema)

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  // convert addresses to long and lat, then calculate actual price
  // use dummy price for now
  var price = helpers.getTripPrice();

  return res.status(200).json({
    success: {
      status: 'SUCCESS',
      data: {
        min_price: price - 500,
        max_price: price + 1000
      }
    }
  });


},

availableDriver: async(req, res, next) => {

  //get available driver. drivers still needs to be fetched by location
  //but use available registered driver for test

  var drivers = await db.User.findAll({
    where: {
      type: 'driver',
      // is_online: 1,
      // is_on_trip: 0,
    }
  });

  var list = [];

   
  for(person of drivers)
  {
    //this part can be updated by pre-fetching drivers with their cars.
    var car = db.User.findOne({
      where: {
        driver_id: person.uuid,
      }
    });

    list.push({
      _id: person.uuid,
      firstname: person.firstname,
      lastname: person.lastname,
      phone_number: person.phone_number,
      plate_number: car.plate_number,
      brand: car.name
    });
  }

  return res.status(200).json({
    success: {
      status: 'SUCCESS',
      message: 'Available Drivers fetched successfully',
      data: list
    }
  });

},

requestRide: async(req, res, next) => {

  const loginSchema = Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.string().required(),
    driver_id: Joi.string().required(),
    estimated_fee: Joi.string().required(),
  }).unknown();

  const validate = Joi.validate(req.body, loginSchema)

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var check = await db.RideRequest.findOne({
    where: { 
      status: 'pending',
      user_id: req.user.id
    }
  });

  if(check)
  {
    return res.status(400).json(
      helpers.sendError('You have an existing ride that has not been sorted.')
    );
  }

  var ride = await db.RideRequest.create({
    uuid:  uuid(),
    user_id: req.user.id,
    driver_id: req.body.driver_id,
    user_status: 1,
    driver_status: 0,
    from: req.body.from,
    to: req.body.to,
    estimated_fee: req.body.estimated_fee,
    status: "pending",
  });

  //sends notification to driver

  return res.status(200).json({
    success: {
      status: "SUCCESS",
      message: "Ride Request ordered successfully",
      request_id: ride.uuid
    }
  });

},

cancelRide: async(req, res, next) => {

  const loginSchema = Joi.object().keys({
    ride_id: Joi.string().required()
  }).unknown();

  const validate = Joi.validate(req.body, loginSchema)

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var ride = await db.RideRequest.findOne({
    where: {
      uuid: req.body.ride_id
    }
  });

  if(ride)
  {
    if(ride.status == "cancelled")
    {
      return res.status(400).json(
        helpers.sendError('Ride Request has been cancelled already')
      );
    }

    if(req.user.type == "driver")
    {
      //notifies user about update
      ride.status = "cancelled";
      ride.driver_status = -1;
    }
    else
    {
      //notifies driver about update
      ride.status = "cancelled";
      ride.user_status = -1;
    }

    await ride.save();

    return res.status(200).json({
      success: {
        status: "SUCCESS",
        message: "Ride Request cancelled successfully",
        request_id: ride.uuid
      }
    });

  }
  else
  {
    return res.status(400).json(
      helpers.sendError('Ride request does not exist')
    );
  }

},

acceptRide: async(req, res, next) => {

  const loginSchema = Joi.object().keys({
    ride_id: Joi.string().required()
  }).unknown();

  const validate = Joi.validate(req.body, loginSchema)

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var check = await db.RideRequest.findOne({
    where: { 
      status: 'pending',
      driver_id: req.user.uuid
    }
  });

  if(check)
  {
    return res.status(400).json(
      helpers.sendError('You have an existing ride that has not been sorted.')
    );
  }

  var ride = await db.RideRequest.findOne({
    where: {
      uuid: req.body.ride_id,
      driver_id: req.user.uuid
    }
  });

  if(ride)
  {
    if(req.user.type == "driver")
  {
    if(ride.status == "cancelled")
    {
      return res.status(400).json(
        helpers.sendError('Ride Request has been cancelled already')
      );
    }

    //notifies user about update
    ride.status = "pending";
    ride.driver_status = 1;
    await ride.save();

    return res.status(200).json({
      success: {
        status: "SUCCESS",
        message: "Ride Request accepted successfully",
        request_id: ride.uuid
      }
    });
    }
    else
    {
      return res.status(400).json(
        helpers.sendError('You are not permitted to use this resource')
      );
    }
  }
  else
  {
    return res.status(400).json(
      helpers.sendError('Ride request does not exist')
    );
  }

},


}

