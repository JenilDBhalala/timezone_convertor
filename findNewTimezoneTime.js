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

module.exports = findNewTimezoneTime;