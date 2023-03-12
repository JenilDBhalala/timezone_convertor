import { createRequire } from "module";
const require = createRequire(import.meta.url);
const inquirer = require("inquirer");
const data = require("./data.json");

let CURRENT_TIME;
let CURRENT_TIMEZONE;
let CONVERT_TO_TIMEZONE;

const timezones = [
  "CST (China Standard Time)",
  "EST (Eastern Standard Time)",
  "JST (Japan Standard Time)",
  "IST (India Standard Time)",
  "PST (Pacific Standard Time)",
  "GMT (Greenwich Mean Time)",
  "CET (Central European Time)",
  "EET (Eastern European Time)",
  "KST (Korea Standard Time)",
  "MSK (Moscow Standard Time)",
  "PHT (Philippine Time)",
  "BRT (Brasília Time)",
  "EAST (Eastern African Time)",
  "WET (Western European Time)",
  "CAT (Central Africa Time)",
  "EAT (Eastern Africa Time)",
  "AST (Arabia Standard Time)",
  "BTT (Bhutan Time)",
  "NPT (Nepal Time)",
];


//validating input time entered by user
const validateTime = (time) => {
  //regular expression which checks whether time is in format of 'HH:MM AM/PM'
  const regex = /^(1[012]|[1-9]):[0-5][0-9](\s)(am|pm)$/i;
  const result = regex.test(time);
  return result;
};

//taking input for current_timezone
await inquirer
  .prompt([
    {
      type: "list",
      name: "current_timezone",
      message: "What is the current timezone?",
      choices: timezones,
    },
  ])
  .then((answer) => {
    CURRENT_TIMEZONE = answer.current_timezone.split(' ')[0];;
  })
  .catch((error) => {
    console.error(error);
  });


//taking input for convert_to_timezone
await inquirer
  .prompt([
    {
      type: "list",
      name: "convert_to_timezone",
      message: "In which timezone you want to convert?",
      choices: timezones,
    },
  ])
  .then((answer) => {
    CONVERT_TO_TIMEZONE = answer.convert_to_timezone.split(' ')[0];
  })
  .catch((error) => {
    console.error(error);
  });


//taking input for current_time
await inquirer
  .prompt([
    {
      type: "input",
      name: "current_time",
      message: `Enter time in format of 'HH:MM AM/PM' :`,
      default: "12:00 AM"
    },
  ])
  .then((answer) => {
    CURRENT_TIME = answer.current_time;

    if (!validateTime(CURRENT_TIME)) {
      throw new Error(`Please enter correct time in format of 'HH:MM AM/PM'`);
    }
  })
  .catch((error) => {
    console.error(error.message);
    process.exit();
  });



//finding total offset - how far any timezone from UTC
const findTotalOffset = (currentTimezone, convertToTimezone) => {
    const total_offset = data[convertToTimezone].offset - data[currentTimezone].offset
    return total_offset;
}

//finding converted-time of new timezone from current-time of old timezone
const findNewTimezoneTime = (current_time, total_offset) => {
    // convert the current time to a date object
    const date = new Date(`01/02/2000 ${current_time}`);
    const time_diff = total_offset * 60 * 60 * 1000;

    // add the time difference in the old time and form the date
    date.setTime(date.getTime() + time_diff);

    // convert the result back to a string in the desired format
    const converted_time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'});
    return converted_time;
}

const total_offset = findTotalOffset(CURRENT_TIMEZONE, CONVERT_TO_TIMEZONE);
const converted_time = findNewTimezoneTime(CURRENT_TIME, total_offset);

//displaying output
console.log(`Current_Timezone_Time (${CURRENT_TIMEZONE}) : ${CURRENT_TIME}`);
console.log(`Converted_Timezone_Time (${CONVERT_TO_TIMEZONE}) : ${converted_time}`);
