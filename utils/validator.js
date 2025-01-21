function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isDateInRange(userDate, startDate, endDate, showErrorMessages = false) {
    try {
      // Convert inputs to Date objects
      const userDateTime = new Date(userDate);
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
  
      // Validate that all inputs are valid dates
      if (isNaN(userDateTime.getTime())) {
        throw new Error("Invalid userDate provided.");
      }
      if (isNaN(startDateTime.getTime())) {
        throw new Error("Invalid startDate provided.");
      }
      if (isNaN(endDateTime.getTime())) {
        throw new Error("Invalid endDate provided.");
      }
  
      // Validate logical range (startDate should not be after endDate)
      if (startDateTime > endDateTime) {
        throw new Error("startDate cannot be after endDate.");
      }
  
      // Check if userDate is within the range
      return userDateTime >= startDateTime && userDateTime <= endDateTime;
    } catch (error) {
      // Optionally log error messages
      if (showErrorMessages) {
        console.error(error.message);
      }
      return false; // Return false if any error occurs
    }
}
  
module.exports = {isValidEmail,isDateInRange};