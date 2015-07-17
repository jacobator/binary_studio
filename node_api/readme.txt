Request examples:

1. Get list of countries:
Request:
GET /api/countries HTTP 1.1
Host: localhost:3000

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": [
		{
				"name": "Afghanistan",
				"description": "Purus vulputate purus se..."
		},
		...
	]
}

2. Get list of hotels in a country:
Request:
GET /api/countries/Ukraine/hotels HTTP 1.1
Host: localhost:3000

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": [
		{
			"id": 1946,
			"name": "Aliquet",
			"country": "Ukraine",
			"description": "In at purus, mollis se..."
		},
		...
	]
}

3. Get hotel info:
Request:
GET /api/hotels/47 HTTP 1.1
Host: localhost:3000

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": {
		"id": 47,
		"name": "Nullam",
		"country": "AndorrA",
		"description": "Mi nisl quisque porta feu..."
	}
}

4. Add new country:
Request:
POST /api/countries HTTP 1.1
Host: localhost:3000
Content-Type: application/json

{"name":"Utopia", "description":"Purus vulputate purus se..."}

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": "Utopia successfully added"
}

5. Add new hotel to a country:
Request:
POST /api/countries/Ukraine/hotels HTTP 1.1
Host: localhost:3000
Content-Type: application/json

{"name":"HotelName", "description":"Purus vulputate purus se..."}

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": "HotelName successfully added to Ukraine"
}

6. Update hotel info:
Request:
PUT /api/hotels/47 HTTP 1.1
Host: localhost:3000
Content-Type: application/json

{"name":"NewHotelName", "description":"Purus vulputate purus se..."}

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": "Hotel 47 successfully updated"
}

7. Delete hotel:
Request:
DELETE /api/hotels/47 HTTP 1.1
Host: localhost:3000

Response:
Content-Type: application/json; charset=utf-8

{
	"status": "ok",
	"data": "Hotel 47 successfully deleted"
}

8. If an error occurs, you'll get a special responce:
Response:
Content-Type: application/json; charset=utf-8

{
	"status": "error",
	"message": "Error information"
}