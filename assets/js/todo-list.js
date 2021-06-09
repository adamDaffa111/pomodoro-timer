const inputTask = document.querySelector('#title');
const repeatSelect = document.querySelector('#repeat-pomodoro');
const addBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');
const completedTaskList = document.querySelector('#completedTasks');
let tasks = [];
let taskObj;

// data local
let localTask = getLocalTask();
// listener for add todos
addBtn.addEventListener('click',addTodo);
// listener for some featured todo todos in task list
taskList.addEventListener('click',featuredTodo);
// listener for some featured todo todos in complete task list
completedTaskList.addEventListener('click',featuredTodo);

console.log(taskActive)
// display UI data 
document.addEventListener('DOMContentLoaded',() => {
  addtask(taskList,localTask);
  if (JSON.parse(localStorage.getItem('active-task')) != null) {
    taskObj = JSON.parse(localStorage.getItem('active-task'));
    // display active task
    document.querySelector('.active-task').classList.remove('hide');
    taskActive = true;
    numbRepeat = taskObj.number;
    displayActiveTask(taskObj);
  }
});

// add todo function
function addTodo() {
  let  task = inputTask.value;
  let repeatNumber = repeatSelect.value;
  // basic validation when field is blank
  if(task != '') {
    taskObj = {
      task,
      number: repeatNumber
    };
    
    addLocalTask(taskObj,'tasks');
    addtask(taskList,localTask);
   
    inputTask.value = '';
    repeatSelect.value = 1;
    swal({
      text: "tugas ditambahkan!",
      icon: "success",
      button: "ok!",
    });
  }else {
    alert('task can\'t be blank');
  }
}

// featured todo function
function featuredTodo(e) {
  const element = e.target;
  
  if (element.classList.contains('check')) {
    const dataTask = element.nextElementSibling.children[0].innerText;
    const dataNumber = element.nextElementSibling.children[0].nextElementSibling.children[1].innerText;
   
    // clear active task
    taskActive = false;

    if (element.parentElement.parentElement.id == 'completedTasks') {
      addtask(taskList,localTask);
    }else {
      addtask(completedTasks,[dataTask,dataNumber]);
    }
    
    document.querySelector('.active-task').classList.add('hide');

    element.parentElement.classList.toggle('task-completed');
    element.parentElement.classList.add('hide');

    setTimeout(function() {
       element.parentElement.style.display = "none";
    }, 500);
  }
  else if (element.classList.contains('fa-trash')) {
    swal({
      title: "apakah anda yakin?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan tugas ini",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("tugas telah dihapus!", {
          icon: "success",
        });
      // title task
      const title = element.parentElement.previousElementSibling.previousElementSibling.children[0].innerText;

      // clear from local 
      removeLocalTask(title,'tasks');
      
      element.parentElement.parentElement.classList.add('remove');
      document.querySelector('.active-task').classList.add('hide');
      // clear active task
      taskActive = false;
      setTimeout(function() {
        element.parentElement.parentElement.style.display = "none";
      }, 500);
      
      clearDangerAnimation();
      resetHideBtn();
      }
    });
  }
  else if(element.classList.contains('fa-play')){
    let taskName = element.parentElement.previousElementSibling.children[0].innerText;
    let taskRepeat = element.parentElement.previousElementSibling.children[1].children[1].innerText;
      taskObj = {
      task:taskName,
      number:taskRepeat
    };

    displayActiveTask(taskObj);
    numbRepeat = +taskRepeat;
    taskActive = true;
    // add into local localStorage
    localStorage.setItem('active-task',JSON.stringify(taskObj));
    
    setProgress(0);
    clearDangerAnimation();
    resetHideBtn();
    
    // hide the menu
    document.querySelector('.features').classList.add('hide');
    
    // display active task
    document.querySelector('.active-task').classList.remove('hide');
   
  }
}

function displayActiveTask({task,number}){
  document.querySelector('.active-task').innerHTML = `
    <div class="task-name">
      <p>${task}</p>
      <div>
        <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${number} </span>
      </div>
    </div>
  `;
}

function resetHideBtn(){
  resetCounter();
  clearInterval(pomodoro);
  // display start button
  startBtn.classList.remove('hide');
  // hide pause button
  pauseBtn.classList.add('hide');
  // hide reload button
  reloadBtn.classList.add('hide');
  // hide resume button
  resumeBtn.classList.add('hide');
  // hide stop button
  stopBtn.classList.add('hide');
}

function addtask(taskList,tasks){
  if (taskList.id == 'tasks') {
    let str = '';
    tasks.forEach(({task,number}) => {
      str +=  `
        <li>
          <input type="checkbox" id="check" class="check"/>
          <div class="task-name">
            <p> ${task}  </p>
            <div>
              <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${number}</span>
            </div>
          </div>
          <button class="play-btn"> <i class="fas fa-play"></i></button>
          <button class="delete-btn"> <i class="fas fa-trash"></i></button>
        </li>
    `;
   });
  taskList.innerHTML = str;
  }else if(taskList.id == 'completedTasks'){
   taskList.innerHTML += `
      <li class="task-completed">
        <input type="checkbox" id="check" checked class="check"/>
        <div class="task-name">
          <p> ${tasks[0]}</p>
          <div>
            <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${tasks[1]}</span>
          </div>
        </div>
        <button class="play-btn"> <i class="fas fa-play"></i></button>
        <button class="delete-btn"> <i class="fas fa-trash"></i></button>
      </li>
    `;
    
  }
}