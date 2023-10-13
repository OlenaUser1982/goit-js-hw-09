import Notiflix from 'notiflix';
const form = document.querySelector('.form');

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
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
function formSubmit(evt) {
  evt.preventDefault();
  let delayElem = evt.currentTarget.delay.valueAsNumber;
  let stepElem = evt.currentTarget.step.valueAsNumber;
  let amountElem = evt.currentTarget.amount.valueAsNumber;
  for (let i = 1; i <= amountElem; i += 1) {
    createPromise(i, delayElem);
    delayElem += stepElem;
  }
}
form.addEventListener('submit', formSubmit);
