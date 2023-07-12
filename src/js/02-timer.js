import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css"

const refs = {
 startBtn : document.querySelector('button[data-start]'),
 days : document.querySelector('span[data-days]'),
 hours : document.querySelector('span[data-hours]'),
 minutes : document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const date = Date.now();
    if (date >= selectedDates) {
      Notiflix.Report.failure("Please choose a date in the future")
    }
    refs.startBtn.removeAttribute('disabled'); 
  }
}

const fp = flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener("click", onClickStart);
function onClickStart() {
  const userDate = fp.selectedDates[0];

        refs.startBtn.setAttribute('disabled', true);
          timerId = setInterval(() => {
       const date = Date.now();
        const ms = userDate - date;
        if (ms <= 0) {
          clearInterval(timerId);
        } else {
          const valueTimer = convertMs(ms);
          aupdateTimer(valueTimer);
        }
      }, 1000);    
}


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

function aupdateTimer({ days, hours, minutes, seconds }) {
                  refs.days.textContent = addLeadingZero(days); 
                  refs.hours.textContent = addLeadingZero(hours);
                  refs.minutes.textContent = addLeadingZero(minutes);
                  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}