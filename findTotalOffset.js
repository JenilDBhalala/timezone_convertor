const data = require("./data.json");

//finding total offset - how far any timezone from UTC
const findTotalOffset = (currentTimezone, convertToTimezone) => {
    const total_offset = data[convertToTimezone].offset - data[currentTimezone].offset
    return total_offset;
}

module.exports = findTotalOffset;