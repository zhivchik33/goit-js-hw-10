
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");

let userSelectedDate;
let clockTimer = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate > selectedDates[0]){
      startBtn.disabled = true;
      iziToast.error({
        message: "Please choose a date in the future",
    });
  }
  startBtn.disabled = false;
  userSelectedDate = selectedDates[0];
}
};



function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(ms) {
  return String(ms).padStart(2, '0');
}

const onClick = () => {
    startBtn.disabled = true;;
    inputDate.disabled = true;;

clockTimer = setInterval(() => {
  const currentTime = Date.now();

    const deltaTime = userSelectedDate - currentTime;
    const time = convertMs(deltaTime);
    updateClock(time);

    if (deltaTime <= 0) {
      clearInterval(clockTimer);
      inputDate.disabled = false;

      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
      return;
    }

},1000)
  
  }

function updateClock ({ days, hours, minutes, seconds }){
dataDays.textContent = `${days}`;
dataHours.textContent = `${hours}`;
dataMinutes.textContent = `${minutes}`;
dataSeconds.textContent = `${seconds}`;
}

flatpickr(inputDate, options);

startBtn.addEventListener("click", onClick);