const inputTask = document.querySelector('#title');
const repeatSelect = document.querySelector('#repeat-pomodoro');
const addBtn = document.querySelector('#add-task');

const taskList = document.querySelector('#tasks');
const completedTaskList = document.querySelector('#completedTasks');

let tasks = [];

// listener for add todos
addBtn.addEventListener('click',addTodo);

// listener for some featured todo todos in task list
taskList.addEventListener('click',featuredTodo);

// listener for some featured todo todos in complete task list
completedTaskList.addEventListener('click',featuredTodo);

// add todo function
function addTodo() {
  let  task = inputTask.value;
  let repeatNumber = repeatSelect.value;
  // basic validation when field is blank
  if(task != '') {
    addtask(taskList,task,repeatNumber);
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
   
    if (element.parentElement.parentElement.id == 'completedTasks') {
      addtask(taskList,dataTask,dataNumber);
    }else {
      addtask(completedTasks,dataTask,dataNumber);
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
      element.parentElement.parentElement.classList.add('remove');
      document.querySelector('.active-task').classList.add('hide');
  
      setTimeout(function() {
        element.parentElement.parentElement.style.display = "none";
      }, 500);
      
      resetHideBtn();
      }
    });
  }
  else if(element.classList.contains('fa-play')){
    let taskName = element.parentElement.previousElementSibling.children[0].innerText;
    let taskRepeat = element.parentElement.previousElementSibling.children[1].children[1].innerText;
    
    resetHideBtn();
    
    document.querySelector('.features').classList.add('hide');
    
    document.querySelector('.active-task').classList.remove('hide');
    
    document.querySelector('.active-task').innerHTML = `
      <input type="checkbox" id="check" class="check"/>
      <div class="task-name">
        <p>${taskName}</p>
        <div>
          <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${taskRepeat} </span>
        </div>
      </div>
      <div>
        <button class="delete-btn"> <i class="fas fa-trash"></i></button>
      </div>
    `;
  }
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

function addtask(taskList,task,numb){
  if (taskList.id == 'tasks') {
   taskList.innerHTML += `
      <li>
        <input type="checkbox" id="check" class="check"/>
        <div class="task-name">
          <p> ${task} </p>
          <div>
            <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${numb} </span>
          </div>
        </div>
        <button class="play-btn"> <i class="fas fa-play"></i></button>
        <button class="delete-btn"> <i class="fas fa-trash"></i></button>
      </li>
    `;
  }else if(taskList.id == 'completedTasks'){
   taskList.innerHTML += `
      <li class="task-completed">
        <input type="checkbox" id="check" class="check"/>
        <div class="task-name">
          <p> ${task} </p>
          <div>
            <i class="fas fa-stopwatch"></i> = <span class="number-of-task"> ${numb} </span>
          </div>
        </div>
        <button class="play-btn"> <i class="fas fa-play"></i></button>
        <button class="delete-btn"> <i class="fas fa-trash"></i></button>
      </li>
    `;
  }
}