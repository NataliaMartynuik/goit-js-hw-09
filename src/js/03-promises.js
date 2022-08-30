  
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('click', onClickSubmit);

function onClickSubmit(event) {
  event.preventDefault();
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  const {
    elements: { delay, step, amount }
   } = event.currentTarget;
  let currentDelay = Number(delay.value);
  const currentStep = Number(step.value);
  const currentAmount = Number(amount.value);
  generatePromise(currentDelay, currentStep, currentAmount);
      
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
  return promise;
}

function generatePromise(firstDelay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise( i, firstDelay )
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += step;
     
  }
}