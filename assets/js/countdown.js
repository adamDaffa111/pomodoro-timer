// cek apakah browser punya Storage
if (typeof(Storage) !== undefined) {
  console.log('local storage available');
}else {
  console.log('storage unavailable! your data gonna be lost when page reload');
}


function getLocalTask(key) {
  let tasks = [];
  if(localStorage.getItem(key) == null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem(key));
  }
  return tasks;
}

// add the item into local Storage
function addLocalTask(obj,key){
  let tasks = getLocalTask(key);
  tasks.push(obj);
  localStorage.setItem(key,JSON.stringify(tasks));
}

function removeLocalTask(title,key){
  let tasks = getLocalTask(key);
  tasks.forEach((item,index) => {
    if(item.task == title) {
      tasks.splice(index,1);
    }
  });
  localStorage.setItem(key,JSON.stringify(tasks));
}






//// COUNTDOWN ////

// bels
const audio = document.querySelector('audio');

// number repeat
// this variable will be containing when user add and run task 
let numbRepeat;

// countdown pomodoro
const pomodoroTime = 1;
let minutes,totalSeconds,seconds,perc,time;
totalSeconds = pomodoroTime * 60;
time = pomodoroTime * 60;
let taskActive = false;
let pomodoro = setInterval(updateCounter,1000);

const countdown = document.querySelector('.time h1');
const startBtn = document.querySelector('button.play');
const pauseBtn = document.querySelector('button.pause');
const resumeBtn = document.querySelector('button.resume');
const stopBtn = document.querySelector('button.stop');
const reloadBtn = document.querySelector('button.reload');

document.addEventListener('DOMContentLoaded',() => {
  clearInterval(pomodoro);
});

startBtn.addEventListener('click',(e) => {
  validateAvailableTask(e);
});

pauseBtn.addEventListener('click',(e) => {
  clearInterval(pomodoro);
  e.target.classList.add('hide');
  e.target.nextElementSibling.classList.remove('hide');
  e.target.nextElementSibling.nextElementSibling.classList.remove('hide');
});

stopBtn.addEventListener('click',(e) => {
  clearInterval(pomodoro);
  e.target.classList.add('hide');
  e.target.previousElementSibling.classList.add('hide');
  startBtn.classList.remove('hide');
  setProgress(0);
  resetCounter();
});

resumeBtn.addEventListener('click',(e) => {
  pomodoro = setInterval(updateCounter,100);
  e.target.classList.add('hide');
  e.target.previousElementSibling.classList.remove('hide');
  e.target.nextElementSibling.classList.add('hide');
});

reloadBtn.addEventListener('click',(e) => {
  validateAvailableTask(e);
});

// cek if the task is available or no
function validateAvailableTask(element){
  // identifying element
  if(element.target.classList.contains('play')){
    if (!taskActive) {
      alert('you should create the task!');
    }else {
      numbRepeat--;
      taskObj.number = numbRepeat;

      displayActiveTask(taskObj);
      pomodoro = setInterval(updateCounter,100);
      time = pomodoroTime * 60;
      element.target.classList.add('hide');
      element.target.nextElementSibling.classList.remove('hide');
    }
  }else if(element.target.classList.contains('reload')) {
    if (!taskActive) {
      alert('you should create the task!');
    }else {
      time = pomodoroTime * 60;
      element.target.classList.add('hide');
      pauseBtn.classList.remove('hide');
    }
  }
}

function updateCounter() {
  minutes = Math.floor(time/60);
  seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  clearDangerAnimation();

  if(time < 11){
    document.querySelector('.progress-ring__circle').classList.add('danger-time');
    document.querySelector('.progress-ring').classList.add('danger-time');
  }

  if (time <= 0) {
    if (numbRepeat < 1) {
      clearActiveTask();
      taskActive = false;
      pauseBtn.classList.add('hide');
      reloadBtn.classList.remove('hide');
      audio.play();
      countdown.innerHTML = "00 : 00";
      // set null in active task key
      localStorage.setItem('active-task',null);
    }else {
      resetCounter();
      clearInterval(pomodoro);
      audio.play();
      setProgress(0);
      reloadBtn.classList.add('hide');
      pauseBtn.classList.add('hide');
      startBtn.classList.remove('hide');
    }
  }else {
    perc = Math.ceil(((totalSeconds - time) / totalSeconds) * 100);
    setProgress(perc);
    countdown.innerHTML = `${minutes} : ${seconds}`;
  }
  time--;
}


// utilities function   
function resetCounter(){
  time = pomodoroTime * 60;
  minutes = Math.floor(time/60);
  seconds = time % 60;
  time = pomodoroTime * 60;
  countdown.innerHTML = `${minutes} : ${seconds}0`;
}

function clearActiveTask(){
  const activeTask = document.querySelector('.active-task');
  activeTask.classList.add('hide');
}







//// CIRCULLAR PROGGRESS /////
const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  
  
  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
  
  function clearDangerAnimation() {
    document.querySelector('.progress-ring__circle').classList.remove('danger-time');    document.querySelector('.progress-ring').classList.remove('danger-time');
  }