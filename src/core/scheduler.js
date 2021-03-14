const schedule = require('node-schedule')
require('dotenv').config()

function scheduleJob() {
  console.log('scheduled')
  return schedule.scheduleJob(process.env.JOB_CRON_PATTERN, function () {
    //schedule logic here
    console.log(`Executed at - ` + Date.now())
  })
}

scheduleJob()
