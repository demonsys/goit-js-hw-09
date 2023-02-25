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
    if (selectedDates[0] > Date.now()) {
      startBtn.disabled = false;
      const startTimer = () => {
        startBtn.disabled = true;
        setInterval(() => {
          const timeDelta = selectedDates[0] - Date.now();
          updateTimer(timeDelta);
        }, 1000);
      };
      startBtn.addEventListener('click', startTimer);
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
function updateTimer(time) {
  daysField.textContent = addLeadingZero(convertMs(time).days);
  hoursField.textContent = addLeadingZero(convertMs(time).hours);
  minutesField.textContent = addLeadingZero(convertMs(time).minutes);
  secondsField.textContent = addLeadingZero(convertMs(time).seconds);
}
