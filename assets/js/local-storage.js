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