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
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {   
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
   })
}
