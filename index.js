import { Router } from 'itty-router';

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router.get('/', request => {
	let geo_info = {
		"Colo": request.cf.colo,
    	"Country": request.cf.country,
    	"City": request.cf.city,
    	"Continent": request.cf.continent,
    	"Latitude": request.cf.latitude,
    	"Longitude": request.cf.longitude,
    	"PostalCode": request.cf.postalCode,
    	"MetroCode": request.cf.metroCode,
    	"Region": request.cf.region,
    	"RegionCode": request.cf.regionCode,
    	"Timezone": request.cf.timezone,
	}

	return new Response(JSON.stringify(geo_info), {
		headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowable methods
            'Access-Control-Allow-Headers': 'Content-Type', // Allowable headers
        },
	  });
});

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};
