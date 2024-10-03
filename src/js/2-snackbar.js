import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector("form");

const createPromisedNotification = (delay, notificationState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     
      if (notificationState === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay); 
  });
};

const onSubmit = (event) => {
  event.preventDefault();
  
  const inputDelay = Number(formEl.elements.delay.value);
  const notificationState = formEl.elements.state.value; 
  if (isNaN(inputDelay) || inputDelay < 0) {
    iziToast.error({
      message: "Please enter a valid delay time!",
    });
    return;
  }
  createPromisedNotification(inputDelay, notificationState)
    .then((result) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${result} ms!`,
      });
    })
    .catch((error) => {
      iziToast.error({
        message: `❌ Rejected promise in ${error} ms!`,
      });
    });
};

formEl.addEventListener("submit", onSubmit);

