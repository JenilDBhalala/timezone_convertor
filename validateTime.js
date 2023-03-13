//validating input time entered by user
const validateTime = (time) => {
    //regular expression which checks whether time is in format of 'HH:MM AM/PM'
    const regex = /^(1[012]|[1-9]):[0-5][0-9](\s)(am|pm)$/i;
    const result = regex.test(time);
    return result;
};

module.exports = validateTime;