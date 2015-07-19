1. Get list of countries:
GET /api/countries HTTP 1.1
Host: localhost:1337

2. Get list of hotels in a country:
GET /api/countries/Ukraine/hotels HTTP 1.1
Host: localhost:1337

3. Get hotel info:
GET /api/hotels/47 HTTP 1.1
Host: localhost:1337

4. Add new country:
POST /api/countries HTTP 1.1
Host: localhost:1337
Content-Type: application/json
{"name":"Utopia", "description":"Purus vulputate purus se..."}

5. Add new hotel to a country:
POST /api/countries/Ukraine/hotels HTTP 1.1
Host: localhost:1337
Content-Type: application/json
{"name":"HotelName", "description":"Purus vulputate purus se..."}

6. Update hotel info:
PUT /api/hotels/47 HTTP 1.1
Host: localhost:1337
Content-Type: application/json
{"name":"NewHotelName", "description":"Purus vulputate purus se..."}

7. Delete hotel:
DELETE /api/hotels/47 HTTP 1.1
Host: localhost:1337

8. Bad request error message
GET /api/bad HTTP 1.1
Host: localhost:1337

9. Bad request custom template
GET /api/badTemplate HTTP 1.1
Host: localhost:1337

10. Blueprint alternative requests:
	1) GET /blueprintAPI/countries
	2) GET /blueprintAPI/hotels?country=Ukraine
	3) GET /blueprintAPI/hotels/47
	4) POST /blueprintAPI/countries/?name=Utopia&description=Purus vulputate purus se...
	5) POST /blueprintAPI/hotels/?country=Ukraine&name=HotelName&description=Purus vulputate purus se...
	6) PUT /blueprintAPI/hotels/47/?name=HotelName&description=Purus vulputate purus se...
	7) DELETE /blueprintAPI/hotels/47