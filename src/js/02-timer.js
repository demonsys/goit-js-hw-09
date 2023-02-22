import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
let startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeDelta = selectedDates[0] - Date.now();
    console.log(timeDelta);
    if (timeDelta > 0) {
      startBtn.disabled = false;
      console.log(daysField);
      daysField.textContent = addLeadingZero(convertMs(timeDelta).days);
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};
flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
console.log(daysField);
function showTimer(time) {
  daysField.textContent = addLeadingZero(time.days);
}
