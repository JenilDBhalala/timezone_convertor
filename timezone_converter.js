const inquirer = require("inquirer");
const findTotalOffset = require("./findTotalOffset");
const findNewTimezoneTime = require("./findNewTimezoneTime");
const validateTime = require("./validateTime");

let CURRENT_TIME, CURRENT_TIMEZONE, CONVERT_TO_TIMEZONE;

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


//taking input from user : current-timezone, convert-to-timezone, time
inquirer
  .prompt([
    {
      type: "list",
      name: "current_timezone",
      message: "What is the current timezone?",
      choices: timezones,
    },
    {
      type: "list",
      name: "convert_to_timezone",
      message: "In which timezone you want to convert?",
      choices: timezones,
    },
    {
      type: "input",
      name: "current_time",
      message: `Enter time in format of 'HH:MM AM/PM' :`,
      default: "12:00 AM"
    },
  ])
  .then((answers) => {
    CURRENT_TIMEZONE = answers.current_timezone.split(' ')[0];
    CONVERT_TO_TIMEZONE = answers.convert_to_timezone.split(' ')[0];
    CURRENT_TIME = answers.current_time;

    if (!validateTime(CURRENT_TIME)) {
      throw new Error(`Please enter correct time in format of 'HH:MM AM/PM'`);
    }

    const total_offset = findTotalOffset(CURRENT_TIMEZONE, CONVERT_TO_TIMEZONE);
    const converted_time = findNewTimezoneTime(CURRENT_TIME, total_offset);

    //displaying output
    console.log(`Current_Timezone_Time (${CURRENT_TIMEZONE}) : ${CURRENT_TIME}`);
    console.log(`Converted_Timezone_Time (${CONVERT_TO_TIMEZONE}) : ${converted_time}`);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit()
  });









