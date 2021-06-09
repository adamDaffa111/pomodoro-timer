// cek apakah browser punya Storage

if (typeof(Storage) !== undefined) {
  console.log('local storage available');
}else {
  console.log('storage unavailable! your data gonna be lost when page reload');
}


function getLocalTask() {
  let tasks = [];
  if(localStorage.getItem('tasks') == null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// add the item into local Storage
function addLocalTask(obj,key){
  let tasks = getLocalTask();
  tasks.push(obj);
  localStorage.setItem(key,JSON.stringify(tasks));
}

function removeLocalTask(title,key){
  let tasks = getLocalTask();
  tasks.forEach((item,index) => {
    if(item.task == title) {
      tasks.splice(index,1);
    }
  });
  localStorage.setItem(key,JSON.stringify(tasks));
}