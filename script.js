// Initial screen setup
window.onload = function() {
  document.getElementById('screen').value = '0'; // Initially display 0 on the screen
}

// Global variable to track if the result has been displayed
let resultDisplayed = false;

// Append a character to the screen
function appendToScreen(value) {
  var screen = document.getElementById('screen');
  
  // If the result has been displayed and user presses a number, clear the screen and start fresh
  if (resultDisplayed && !isNaN(value)) {
      screen.value = value;
      resultDisplayed = false; // Reset flag after entering a new number
  } else {
      // If screen shows '0' and user presses a number, replace it with the new input
      if (screen.value === '0' && value !== '.') {
          screen.value = value;
      } else {
          screen.value += value; // Append the value to the current screen content
      }
  }
}

// Clear the screen
function clearScreen() {
  var screen = document.getElementById('screen');
  screen.value = '0'; // Reset the screen to '0'
  resultDisplayed = false; // Reset the result flag when clearing
}

// Calculate the result
function calculate() {
  var screen = document.getElementById('screen');
  try {
      // Use eval to evaluate the expression
      screen.value = eval(screen.value);
      resultDisplayed = true; // Set flag that result is displayed
  } catch (e) {
      screen.value = 'Error'; // Show error if the expression is invalid
      resultDisplayed = true; // Ensure that we reset for the next input
  }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
  var key = event.key;

  // Allow numbers and certain operators
  if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
      appendToScreen(key);
  }
  
  // Handle backspace (delete one character)
  if (key === 'Backspace') {
      var screen = document.getElementById('screen');
      screen.value = screen.value.slice(0, -1);
      if (screen.value === '') {
          screen.value = '0'; // Reset to '0' if the screen becomes empty
      }
  }
  
  // Handle the Enter key (equals sign to calculate)
  if (key === 'Enter') {
      calculate();
  }

  // Handle the 'c' key for clear
  if (key === 'c' || key === 'C') {
      clearScreen();
  }
});
