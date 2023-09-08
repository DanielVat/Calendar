import { expect } from 'chai';
import { isLeapYear, getFebDays } from './isleapyear.js';
import { generateCalendar }  from './script.js';
import { JSDOM } from 'jsdom';

// Create a new JSDOM instance for testing
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

// Define global variables for the document and window
global.document = dom.window.document;
global.window = dom.window;

describe('isLeapYear', () => {
  it('Should return true for a leap year', () => {
    const year = 2000;
    const result = isLeapYear(year);
    expect(result).to.equal(true);
  });

  it('Should return false for a non-leap year', () => {
    const year = 2022;
    const result = isLeapYear(year);
    expect(result).to.equal(false);
  });
});

describe('getFebDays', () => {
  it('Should return 29 for a leap year', () => {
    const year = 2000;
    const result = getFebDays(year);
    expect(result).to.equal(29);
  });

  it('Should return 28 for a non-leap year', () => {
    const year = 2022;
    const result = getFebDays(year);
    expect(result).to.equal(28);
  });
});

describe('month_picker', () => {
  it('Should trigger the click event', () => {
    // Create a mock month picker element
    const monthPickerElement = document.createElement('div');
    monthPickerElement.id = 'month-picker';

    // Create a variable to track if the click event was triggered
    let clickEventTriggered = false;

    // Attach an event listener to the element
    monthPickerElement.addEventListener('click', () => {
      clickEventTriggered = true;
    });

    // Attach your element to the DOM
    document.body.appendChild(monthPickerElement);

    // Simulate a click event
    const clickEvent = new dom.window.Event('click');
    monthPickerElement.dispatchEvent(clickEvent);

    // Check if the click event was triggered
    expect(clickEventTriggered).to.equal(true);

    // Clean up by removing the element from the DOM
    document.body.removeChild(monthPickerElement);
  });

  // Add more test cases for the month_picker as needed
});

describe('generateCalendar', () => {
  beforeEach(() => {
    // Create and append the necessary DOM elements before each test
    const calendar = document.createElement('div');
    calendar.className = 'calendar';
    document.body.appendChild(calendar);
  });

  afterEach(() => {
    // Clean up: remove the appended DOM elements after each test
    const calendar = document.querySelector('.calendar');
    document.body.removeChild(calendar);
  });

  it('Should highlight the current date in the calendar', () => {
    // Mock the necessary DOM elements
    const calendar = document.createElement('div');
    const calendarDays = document.createElement('div');

    // Append these mock elements to the document body
    document.body.appendChild(calendar);
    calendar.appendChild(calendarDays);

    // Set the current date to a specific date within the generated calendar (e.g., February 15, 2023)
    const currentDate = new Date(2023, 1, 15);

    // Call generateCalendar with a specific month and year (e.g., February 2023)
    generateCalendar(1, 2023);

    // Perform assertions to check if the current date is highlighted
    const highlightedDate = calendar.querySelector('.current-date');
    expect(highlightedDate.textContent).to.equal('15'); // Check if the date is highlighted
    // Add more assertions to validate the highlighting
  });

  it('Should handle the first and last day of the month', () => {
    // Mock the necessary DOM elements
    const calendar = document.createElement('div');
    const calendarDays = document.createElement('div');

    // Append these mock elements to the document body
    document.body.appendChild(calendar);
    calendar.appendChild(calendarDays);

    // Set the current date to the first and last day of a specific month (e.g., January 1 and January 31, 2023)
    const firstDay = new Date(2023, 0, 1);
    const lastDay = new Date(2023, 0, 31);

    // Call generateCalendar with a specific month and year (e.g., January 2023)
    generateCalendar(0, 2023);

    // Perform assertions to check if the first and last days are generated correctly
    const firstDate = calendar.querySelector('.calendar-days div:first-child');
    const lastDate = calendar.querySelector('.calendar-days div:last-child');
    expect(firstDate.textContent).to.equal('1'); // Check the first day
    expect(lastDate.textContent).to.equal('31'); // Check the last day
  
})

})