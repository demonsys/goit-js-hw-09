const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
let timerId = null;
const delayTime = 1000;
startBtn.addEventListener('click', onStartBtnClick);
function onStartBtnClick() {
  startBtn.disabled = true;
  timerId = setInterval(changeBodyBcg, delayTime);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBodyBcg() {
  document.body.style.backgroundColor = getRandomHexColor();
}
stoptBtn.addEventListener('click', onStopBtnClick);
function onStopBtnClick() {
  clearInterval(timerId);
  startBtn.disabled = false;
}
