var http = require("http");
var urlparse = require("url");
var fs = require("fs");

var portnum = 3000;

http.createServer(onRequest).listen(portnum);
console.log("Server started, listening on port# " + portnum);

 function onRequest(req, res) {
	var reqBody = "";

	console.log("%s %s", req.method, req.url);

	req.on("data", function(chunk) {
		reqBody += chunk.toString();
	});

	req.on("end", function() {
		var url = urlparse.parse(req.url, true);
		var returnCode = 200;
		var cotentType = "application/json";
		var outObj = restFunc(req.method, url.pathname, reqBody);
		var outputStr = JSON.stringify(outObj);
		var bufLen = Buffer.byteLength(outputStr, "utf8");

		res.writeHead(returnCode, {
			"Connection": "close",
			"Content-Type": cotentType + "; charset=utf-8",
			"Content-Length": bufLen
		});
		res.end(outputStr);
	});
}

function restFunc(method, urlPathName, reqBody) {
	var insertObj, outObj = {};
	var api, table, recId, subtable, target;
	var argArray = urlPathName.split("/");
	var argLength = argArray.length;

	function getTarget() {
		if (api == "api") {
			if (table == "countries") {
				if (argLength == 3) {
					return "countries";
				}
				else if ((subtable == "hotels") && (argLength == 5)) {
					return "country hotels";
				}
			}
			else if ((table == "hotels") && (argLength == 4)) {
				return "hotel";
			}
		}
		else {
			return "";
		}
	}

	if (!argArray[argLength - 1]) {
		argLength--;
	}

	if (argLength < 6) {
		api = argArray[1];
		table = argArray[2];
		recId = argArray[3];
		subtable = argArray[4];
	}

	target = getTarget();

	if (!target) {
		outObj.status = "error";
		outObj.message = "Cannot " + method + " " + urlPathName;
		return outObj;
	}
	else if (method == "POST" || method == "PUT") {
		try {
			insertObj = JSON.parse(reqBody);
		}
		catch (e) {
			insertObj = {};
		}
	}

	switch (target) {
		case "countries":
			outObj = countries(method, insertObj);
			break;
		case "country hotels":
			outObj = countryHotels(method, recId, insertObj);
			break;
		case "hotel":
			outObj = hotels(method, recId, insertObj);
	}

	if (outObj.status == "error" && !outObj.message) {
		outObj.message = "Cannot " + method + " " + urlPathName;
	}

	return outObj;
}

function countries(method, insertObj) {
	var path = __dirname + "/data/countries.json";
	var data = readData(path)
	var outObj = {
		status: "error"
	};

	switch (method) {
		case "GET":
			outObj = {
				status: "ok",
				data: data
			};
			break;
		case "POST":
			if (!insertObj.name || !insertObj.description) {
				outObj = {
					status: "error",
					message: "Both name and description must be specified"
				}
				break;
			}
			var item = {
				"name": insertObj.name,
				"description": insertObj.description
			};
			for (var i = 0; i < data.length; i++) {
				if (data[i].name == item.name) {
					outObj = {
						status: "error",
						message: item.name + " is already present"
					};
					break;
				}
			}
			if (outObj.message) break;
			data.push(item);
			writeData(path, data)
			outObj = {
				status: "ok",
				data: item.name + " successfully added"
			};
			break;
	}

	return outObj;
}

function countryHotels(method, name, insertObj) {
	var path = __dirname + "/data/hotels.json";
	var data = readData(path)
	var outObj = {
		status: "error"
	};

	switch (method) {
		case "GET":
			var country_data = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].country == name) {
					country_data.push(data[i]);
				}
			}
			outObj = {
				status: "ok",
				data: country_data
			};
			break;
		case "POST":
			if (!insertObj.name || !insertObj.description) {
				outObj = {
					status: "error",
					message: "Both name and description must be specified"
				}
				break;
			}
			var item = {
				"id": (data[data.length - 1].id + 1),
				"name": insertObj.name,
				"country": name,
				"description": insertObj.description
			};
			data.push(item);
			writeData(path, data);
			outObj = {
				status: "ok",
				data: item.name + " successfully added to " + item.country
			};
			break;
	}

	return outObj;
}

function hotels(method, id, insertObj) {
	var path = __dirname + "/data/hotels.json";
	var data = readData(path)
	var outObj = {
		status: "error"
	};

	switch (method) {
		case "GET":
			var item = {};
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					item = data[i];
					break;
				}
			}
			outObj = {
				status: "ok",
				data: item
			};
			break;
		case "PUT":
			var item = {};
			if (!insertObj.name && !insertObj.description) {
				outObj = {
					status: "error",
					message: "Name or/and description must be specified"
				}
				break;
			}
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					item = data[i];
					break;
				}
			}
			if (!item.id) {
				outObj = {
					status: "error",
					message: "Hotel " + id + " not found"
				};
				break;
			}
			if (insertObj.name) {
				item.name = insertObj.name;
			}
			if (insertObj.description) {
				item.description = insertObj.description;
			}
			writeData(path, data);
			outObj = {
				status: "ok",
				data: "Hotel " + item.id + " successfully updated"
			};
			break;
		case "DELETE":
			var item = {};
			outObj = {
				status: "error",
				message: "Hotel " + id + " not found"
			};
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					item = data[i];
					data.splice(data.indexOf(item), 1);
					writeData(path, data)
					outObj = {
						status: "ok",
						data: "Hotel " + item.id + " successfully deleted"
					};
					break;
				}
			}
			break;
	}

	return outObj;
}

function readData(path) {
	return JSON.parse(fs.readFileSync(path));
}

function writeData(path, data) {
	fs.writeFileSync(path, JSON.stringify(data));
}