import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount}
  } = event.currentTarget;
     const delayValue = delay.value;
     const stepValue = step.value;
     const amountValue = amount.value
  
 for (let i = 1; i <= amountValue; i++){
   const time = Number(delayValue) + (Number(stepValue) * (i - 1));
    createPromise(i, time)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
  {
    timeout: 4000,
  },);
  })
  .catch(({ position, delay }) => {   
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
  {
    timeout: 4000,
  },);
  });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
         res({ position, delay });
      } else {
         rej({ position, delay })
      }
    }, delay);
   })
}
