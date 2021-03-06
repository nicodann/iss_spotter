const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=becdaf40-4d68-11ec-b455-b5878e78d19a`, (err, response,body) => {
    if (err) return callback(err, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coords = JSON.parse(body);
    const { latitude, longitude } = coords;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {

    if (err) return callback(err, null);
    
    if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching flyover data. Response: ${body}`;
      callback(Error(msg), null);
      return;

    }
    const ISSdata = JSON.parse(body).response;
    callback(null, ISSdata);
  });
  
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
    }

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err, null);
      }

      fetchISSFlyOverTimes(coords, (err, flyTimes) => {
        if (err) {
          callback(err, null);
        }

        callback(null,flyTimes);
      
      });
    
    });
    
  });

};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };