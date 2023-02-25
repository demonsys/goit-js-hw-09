import { Notify } from 'notiflix/build/notiflix-notify-aio';
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const CreateButton = document.querySelector('.form button');
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
CreateButton.addEventListener('click', CreateButtonClick);
function CreateButtonClick(e) {
  e.preventDefault();
  for (
    let currentPosition = 1;
    currentPosition <= amount.value;
    currentPosition += 1
  ) {
    let currentDelay = +delay.value + +step.value * (currentPosition - 1);
    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          clickToClose: true,
          timeout: 5000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          clickToClose: true,
          timeout: 5000,
        });
      });
  }
}
