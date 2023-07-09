import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css"

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', true);
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let timerId = null;

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let date = new Date;
    if (date >= selectedDates[0]) {
            Notiflix.Report.failure("Please choose a date in the future")
        } else {
          startBtn.removeAttribute('disabled');
          startBtn.addEventListener("click", onClickStart);
        function onClickStart() {
            startBtn.setAttribute('disabled', true);
          timerId = setInterval(() => {
             date = new Date;
             const ms = selectedDates[0] - date;
                    if (ms <= 0) {
                      clearInterval(timerId); 
                    } else {
                        const valueTimer = convertMs(ms);
                      addLeadingZero(valueTimer);
                   }   
    }, 1000);
}
        }
    }
});

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
                  days.textContent = value.days.toString().padStart(2, '0'); 
                  hours.textContent = value.hours.toString().padStart(2, '0');
                  minutes.textContent = value.minutes.toString().padStart(2, '0');
                  seconds.textContent = value.seconds.toString().padStart(2, '0');
}

