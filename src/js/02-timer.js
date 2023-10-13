import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dataday = document.querySelector('[data-days]');
const dataHour = document.querySelector('[data-hours]');
const dataminute = document.querySelector('[data-minutes]');
const datasecond = document.querySelector('[data-seconds]');
startButton.setAttribute('disabled', true);
let timer = null;
let rundomedate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      startButton.setAttribute('disabled', true);
      input.style.borderColor = 'red';
    } else {
      rundomedate = selectedDates[0];
      startButton.removeAttribute('disabled');
      input.style.borderColor = 'blue';
      startButton.addEventListener('click', startTimer);
    }
  },
};
flatpickr('#datetime-picker', options);
function startTimer() {
  timer = setInterval(() => {
    startButton.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
    const currenttime = Date.now();
    const margadate = rundomedate - currenttime;
    if (margadate < 1000) {
      clearInterval(timer);
      startButton.removeAttribute('disabled');
    }
    const { days, hours, minutes, seconds } = convertMs(margadate);
    dataday.textContent = days;
    dataHour.textContent = hours;
    dataminute.textContent = minutes;
    datasecond.textContent = seconds;
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
