

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

const createAlert = (input, button) => {
  const promise = new Promise((resolve,reject) => {
    setTimeout(() => {
      if (button === "fulfilled"){
        resolve(input);
      } else {
        reject(input);
      }
    }, input);
  });
  return promise;
}



const onSubmit = (event) => {
    event.preventDefault();
    const inputDelay = Number(formEl.elements.delay.value);
    const radioBtn = formEl.elements.state.value;
    if (isNaN(inputDelay) || inputDelay < 0) {
        iziToast.error({
            message: "Please enter a valid delay time!",
        });
        return;
    }

    createAlert(inputDelay, radioBtn)
        .then(result => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${inputDelay} ms!`,
            });
        })
        .catch(err => {
            iziToast.error({
                message: `❌ Rejected promise in ${inputDelay} ms`,
            });
        })
};
formEl.addEventListener("submit", onSubmit);
