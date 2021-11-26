const { nextISSTimesForMyLocation } = require('./iss');

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