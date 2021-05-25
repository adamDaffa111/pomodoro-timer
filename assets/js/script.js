// show features menu
document.querySelector('.hamburger-btn').addEventListener('click',() => {
document.querySelector('.features').classList.remove('hide');
});

document.querySelector('.features').addEventListener('click',(e) => {
  if (e.target.className == 'features') {
    document.querySelector('.features').classList.add('hide');

  }
});


// dropdown
const dropdownBtn = document.querySelectorAll('.dropdown-btn');
const dropdownContent = document.querySelectorAll('.dropdown-content');

dropdownBtn.forEach((btn,i)=> {
  dropdownContent[i].classList.add('hide')
  btn.addEventListener('click',(e) => {
   dropdownContent[i].classList.toggle('hide')
  });
})




// countdown 
    const pomodoroTime = 1;
    let time = pomodoroTime * 60;
    let pomodoro = setInterval(updateCounter,100);

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
     pomodoro = setInterval(updateCounter,100);
     time = pomodoroTime * 60;
     e.target.classList.add('hide');
     e.target.nextElementSibling.classList.remove('hide');
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
     resetCounter();
    });
    
    resumeBtn.addEventListener('click',(e) => {
     pomodoro = setInterval(updateCounter,100);
     e.target.classList.add('hide');
     e.target.previousElementSibling.classList.remove('hide');
     e.target.nextElementSibling.classList.add('hide');

    });
   
    reloadBtn.addEventListener('click',(e) => {
     time = pomodoroTime * 60;
     e.target.classList.add('hide');
     pauseBtn.classList.remove('hide');
    });
    
   
    let minutes;
    let secound;
      
    function updateCounter() {
      minutes = Math.floor(time/60);
      secound = time % 60;
     
      secound = secound < 10 ? '0' + secound : secound;
      
      if (time < 1) {
        countdown.innerHTML = "00 : 00";
        pauseBtn.classList.add('hide');
         reloadBtn.classList.remove('hide');
         clearActiveTask();
      }else {
        countdown.innerHTML = `${minutes} : ${secound}`;
      }
      
      time--;
    }
    
    function resetCounter(){
     time = pomodoroTime * 60;
     minutes = Math.floor(time/60);
     secound = time % 60;
      
     time = pomodoroTime * 60;
      countdown.innerHTML = `${minutes} : ${secound}0`;
    }
    
    
    function clearActiveTask(){
      const activeTask = document.querySelector('.active-task');
      activeTask.classList.add('hide');
    }