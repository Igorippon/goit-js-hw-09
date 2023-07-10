const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.setAttribute('disabled', true);
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
       const bgColor = getRandomHexColor();
    body.style.backgroundColor = bgColor;
    activBtn(startBtn, stopBtn);
        }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  activBtn(stopBtn, startBtn);
    });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function activBtn(disable, enable) {
  disable.setAttribute('disabled', true);
   enable.removeAttribute('disabled')
}