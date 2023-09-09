const express = require('express');
const app = express();
const req = require('express/lib/request');
const res = require('express/lib/response');
const port = 3001;

app.get('/get_info', (req, res) => {
  try {
    const slackName = req.query.slack_name;
    const track = req.query.track;

    // Get the current day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getUTCDay()];

    // Get the current UTC time with validation of +/-2 hours
    const currentUTC = new Date().toISOString();
    const offsetHours = currentDate.getTimezoneOffset() / 60;
    const isWithinValidRange = offsetHours >= -2 && offsetHours <= 2;
    const utcTime = isWithinValidRange ? currentUTC : 'Invalid UTC offset';

    //GitHub URLs
    const githubFileUrl = 'https://github.com/username/repo/blob/main/file_name.ext';
    const githubRepoUrl = 'https://github.com/username/repo';

    const response = {
      slack_name: slackName,
      current_day: currentDay,
      utc_time: utcTime,
      track: track,
      github_file_url: githubFileUrl,
      github_repo_url: githubRepoUrl,
      status_code: 200,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', status_code: 500 });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
