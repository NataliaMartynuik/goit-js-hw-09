import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const refs = {
    startBtn: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]')
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const choosedDate = new Date(selectedDates[0]).getTime()
      onStart(choosedDate)
        
 },
};

refs.startBtn.setAttribute('disabled', 'disabled');

function onStart(date) {
    
    const endDate = Date.now()
       if (date < endDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return
      }
       refs.startBtn.removeAttribute('disabled', 'disabled');
   
       refs.startBtn.addEventListener('click', () => {
       timer.start(endDate, date)
})
}

flatpickr("#datetime-picker", options)

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }
    start(endTime, currentTime) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
       
        this.intervalId = setInterval(() => {
            const endTime = Date.now()
        if (endTime > currentTime) {
            clearInterval(this.intervalId)
            Notiflix.Notify.info('Time is over');
                  return
            }  
            const deltaTime = currentTime - endTime;
           
                const time = convertMs(deltaTime)
                this.onTick(time)
    }, 1000)

    }
}

const timer = new Timer({
    onTick: updateFaceClock
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function pad(value) {
    return String(value).padStart(2, '0')
}

function updateFaceClock({ days, hours, minutes, seconds }) {
    refs.daysValue.textContent = `${days}`;
    refs.hoursValue.textContent = `${hours}`;
    refs.minutesValue.textContent = `${minutes}`;
    refs.secondsValue.textContent = `${seconds}`;
    
}