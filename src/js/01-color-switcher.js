const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
let timer = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
start.addEventListener('click', () => {
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    start.disabled = true;
  }, 1000);
});

stop.addEventListener('click', () => {
  clearInterval(timer);
  start.disabled = false;
});
