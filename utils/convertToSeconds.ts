function convertToMilliSeconds(input:string) {
  const unit = input.slice(-1); // Get the last character (unit)
  const value = parseInt(input.slice(0, -1), 10); // Get the numeric part

  console.log(unit, value)
  if (isNaN(value)) {
    return 0; // or throw an error
  }

  switch (unit) {
    case 'm': // Minutes to seconds
      return value * (60 * 1000);
    case 's': // Seconds
      return value * 1000;
    case 'h': // Hours to seconds
      return value * 3600;
    default:
      return 200; // Unit not recognized, return null or throw an error
  }
}

export default convertToMilliSeconds