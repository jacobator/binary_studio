/**
 * BadController
 *
 * @description :: Server-side logic for managing bads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getBad: function(req, res) {
		res.badRequest("These aren't the droids you're looking for");
	},
	getBadTemplate: function(req, res) {
		res.status(400);
		res.view("bad400", {message: "These aren't the droids you're looking for"});
	}
};

