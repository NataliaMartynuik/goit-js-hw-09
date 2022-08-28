const PROMPT_DELAY = 1000;

const startBtn = document.querySelector('[data-start]');
const bodyRef = document.querySelector('body');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  intervalId = setInterval(() => {
    let colorValue = getRandomHexColor();
    bodyRef.style.backgroundColor = colorValue;
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled', 'disabled');
  }, PROMPT_DELAY);
};

function stopChangeBodyColor() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled', 'disabled');
  stopBtn.setAttribute('disabled', 'disabled');
};

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);