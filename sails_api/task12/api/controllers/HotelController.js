/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getCountryHotels: function(req, res) {
		Hotel.find({country: req.param("name")}).exec(function(error, result) {
			return res.send(result);
		});
	},
	addCountryHotel: function(req, res) {
		if (req.body.name && req.body.description) {
			Hotel.create({name: req.body.name, country: req.param("name"), description: req.body.description}).exec(function(error, result) {
				return res.send(result);
			});
		}
		else {
			res.status(400);
			res.send("Both name and description must be specified");
		}
	},
	getHotel: function(req, res) {
		Hotel.findOne({id: req.param("id")}).exec(function(error, result) {
			return res.send(result);
		});
	},
	updateHotel: function(req, res) {
		var obj = {};
		if (req.body.name || req.body.description) {
			if (req.body.name) {
				obj.name = req.body.name;
			}
			if (req.body.description) {
				obj.description = req.body.description;
			}
			Hotel.update({id: req.param("id")}, obj).exec(function(error, result) {
				return res.send(result);
			});
		}
		else {
			res.status(400);
			res.send("Name or/and description must be specified");
		}
		
	},
	deleteHotel: function(req, res) {
		Hotel.findOne({id: req.param("id")}).exec(function(error, result) {
			if (result) {
				Hotel.destroy({id: req.param("id")}).exec(function(error, result) {
					return res.send("Hotel id=" + req.param("id") + " successfully deleted");
				});
			}
			else {
				res.status(404);
				res.send(result);
			}
		});
	}
};

