const cron = require('node-cron');

let SaqibEstate = cron.schedule('* * * * *', () => { 
  try {
    //Do something here
  } catch (error) {
    throw error;        
  }
});   

SaqibEstate.start();
