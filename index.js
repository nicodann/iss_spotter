const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
  
//     console.log('It worked! Returned IP:' , ip);
//     IP = ip;
//     // console.log(IP)
//   });
    
// let IP = '99.230.8.54'
// fetchCoordsByIP('99', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Coords:", data)
// })

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Data:", data);
    
// });

const printDateTime = (passTimes) => {
  for (const time of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass on ${date} for ${duration} seconds.`);
  }
};

nextISSTimesForMyLocation((error,passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  printDateTime(passTimes);
});