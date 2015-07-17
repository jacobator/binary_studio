var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();
var portnum = 3000;
var path;
var data;
var outObj;


app.use(function(req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
});

app.route("/api/countries")
.all(function(req, res, next) {
	path = __dirname + "/data/countries.json";
	data = JSON.parse(fs.readFileSync(path));
	next();
})
.get(function(req, res, next) {
	outObj = {
		status: "ok",
		data: data
	};
	res.json(outObj);
})
.post(bodyParser.json(), function(req, res, next) {
	if (!req.body.name || !req.body.description) {
		outObj = {
			status: "error",
			message: "Both name and description must be specified"
		};
		res.json(outObj);
		return;
	}
	var item = {
		"name": req.body.name,
		"description": req.body.description
	};
	for (var i = 0; i < data.length; i++) {
		if (data[i].name == item.name) {
			outObj = {
				status: "error",
				message: item.name + " is already present"
			};
			res.json(outObj);
			return;
		}
	}
	data.push(item);
	fs.writeFileSync(path, JSON.stringify(data));
	outObj = {
		status: "ok",
		data: item.name + " successfully added"
	};
	res.json(outObj);
});

app.route("/api/countries/:name/hotels")
.all(function(req, res, next) {
	path = __dirname + "/data/hotels.json";
	data = JSON.parse(fs.readFileSync(path));
	next();
})
.get(function(req, res, next) {
	var country_data = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].country == req.params.name) {
			country_data.push(data[i]);
		}
	}
	outObj = {
		status: "ok",
		data: country_data
	};
	res.json(outObj);
})
.post(bodyParser.json(), function(req, res, next) {
	if (!req.body.name || !req.body.description) {
		outObj = {
			status: "error",
			message: "Both name and description must be specified"
		}
		res.json(outObj);
		return;
	}
	var item = {
		"id": (data[data.length - 1].id + 1),
		"name": req.body.name,
		"country": req.params.name,
		"description": req.body.description
	};
	data.push(item);
	fs.writeFileSync(path, JSON.stringify(data));
	outObj = {
		status: "ok",
		data: item.name + " successfully added to " + item.country
	};
	res.json(outObj);
});

app.route("/api/hotels/:id")
.all(function(req, res, next) {
	path = __dirname + "/data/hotels.json";
	data = JSON.parse(fs.readFileSync(path));
	next();
})
.get(function(req, res, next) {
	var item = {};
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == req.params.id) {
			item = data[i];
		}
	}
	outObj = {
		status: "ok",
		data: item
	};
	res.json(outObj);
})
.put(bodyParser.json(), function(req, res, next) {
	var item = {};
	if (!req.body.name && !req.body.description) {
		outObj = {
			status: "error",
			message: "Name or/and description must be specified"
		}
		res.json(outObj);
		return;
	}
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == req.params.id) {
			item = data[i];
		}
	}
	if (req.body.name) {
		item.name = req.body.name;
	}
	if (req.body.description) {
		item.description = req.body.description;
	}
	fs.writeFileSync(path, JSON.stringify(data));
	if (item.id) {
		outObj = {
			status: "ok",
			data: "Hotel " + item.id + " successfully updated"
		};
	}
	else {
		outObj = {
			status: "error",
			message: "Hotel " + req.params.id + " not found"
		}
	}
	res.json(outObj);
})
.delete(function(req, res, next) {
	var item = {};
	outObj.status = "error";
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == req.params.id) {
			item = data[i];
			data.splice(data.indexOf(item), 1);
			fs.writeFileSync(path, JSON.stringify(data));
			outObj = {
				status: "ok",
				data: "Hotel " + item.id + " successfully deleted"
			};
		}
	}
	if (outObj.status != "ok") {
		outObj = {
			status: "error",
			message: "Hotel " + req.params.id + " not found"
		}
	}
	res.json(outObj);
});

app.listen(portnum);
console.log("Server started, listening on port# " + portnum);