const inputTask = document.querySelector('#title');
const repeatSelect = document.querySelector('#repeat-pomodoro');
const addBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');
const completedTaskList = document.querySelector('#completedTasks');
let tasks = [];
let taskObj,taskName,taskRepeat;

// data local
let localTask = getLocalTask('tasks');
let localCompletedTask = getLocalTask('completed-task');

// listener for add todos
addBtn.addEventListener('click',addTodo);
// listener for some featured todo todos in task list
taskList.addEventListener('click',featuredTodo);
// listener for some featured todo todos in complete task list
completedTaskList.addEventListener('click',featuredTodo);


// display UI data 
document.addEventListener('DOMContentLoaded',() => {
  displayAllTask(taskList,localTask);
  displayAllTask(completedTaskList,localCompletedTask);

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
 const task = inputTask.value;
 const repeatNumber = repeatSelect.value;
  // basic validation when field is blank
  if(task != '') {
    taskObj = {
      task,
      number: repeatNumber
    };
    tasks.push(taskObj);
    addLocalTask(taskObj,'tasks');
    displayAllTask(taskList,tasks);
   
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
    taskName = element.nextElementSibling.children[0].innerText;
    taskRepeat = element.nextElementSibling.children[0].nextElementSibling.children[1].innerText;
    
    if (element.parentElement.parentElement.id == 'completedTasks') {
      removeLocalTask(taskName,'completed-task');
      taskObj = {
        task: taskName,
        number: taskRepeat
      };
      addLocalTask(taskObj,'tasks');
      addtask(taskList,[taskName,taskRepeat]);
    }else if(element.parentElement.parentElement.id == 'tasks') {
      removeLocalTask(taskName,'tasks');
      taskObj = {
        task: taskName,
        number: taskRepeat
      };
      addLocalTask(taskObj,'completed-task');
      addtask(completedTasks,[taskName,taskRepeat]);
    }

    // hapus local storage dengan key active-task
    localStorage.setItem('active-task',null);
   // clear active task
    taskActive = false;
    document.querySelector('.active-task').classList.add('hide');

    element.parentElement.classList.toggle('task-completed');
    element.parentElement.classList.add('hide');

    resetHideBtn();
    clearInterval(pomodoro);
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
      // parent element
      const parent = element.parentElement.parentElement.parentElement;
      // title task
      const title = element.parentElement.previousElementSibling.previousElementSibling.children[0].innerText;

      if (parent.id == 'tasks') {
        // clear from local 
        removeLocalTask(title,'tasks');
      }else if (parent.id == 'completedTasks') {
        // clear from local 
        removeLocalTask(title,'completed-task');
      } 
        
      // hapus local storage dengan key active-task
      localStorage.setItem('active-task',null);

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
    taskName = element.parentElement.previousElementSibling.children[0].innerText;
    taskRepeat = element.parentElement.previousElementSibling.children[1].children[1].innerText;
   
    taskObj = {
      task:taskName,
      number:taskRepeat
    };

    displayActiveTask(taskObj);
    numbRepeat = +taskRepeat;
    taskActive = true;

    // add into local localStorage
    localStorage.setItem('active-task',JSON.stringify(taskObj));
    
    clearDangerAnimation();
    resetHideBtn();
    
    // hide the menu
    document.querySelector('.features').classList.add('hide');
    // display active task
    document.querySelector('.active-task').classList.remove('hide');
  }
}


function resetHideBtn(){
  setProgress(0);
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


function displayActiveTask({task,number}){
  taskName = task;
  document.querySelector('.active-task').innerHTML = `
    <div class="task-name">
      <p>${task}</p>
      <div>
        <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${number} </span>
      </div>
    </div>
  `;
}


function addtask(taskList,tasks){
 if (taskList.id == 'tasks') {
  taskList.innerHTML += `
    <li>
      <input type="checkbox" id="check" class="check"/>
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

function displayAllTask(taskList,tasks){
  let str = '';
  if (taskList.id == 'tasks') {
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
  }else if (taskList.id == 'completedTasks') {
   tasks.forEach(({task,number}) => {
     str +=  `
        <li class="task-completed">
          <input type="checkbox" id="check" checked class="check"/>
          <div class="task-name">
            <p> ${task} </p>
            <div>
              <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${number}</span>
            </div>
          </div>
          <button class="play-btn"> <i class="fas fa-play"></i></button>
          <button class="delete-btn"> <i class="fas fa-trash"></i></button>
        </li>
    `;
   });
  }
 taskList.innerHTML = str;
}