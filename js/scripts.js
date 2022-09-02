const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();
function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    filter.addEventListener("keyup", filterTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
}
function clearTasks(){
    if(confirm('Are you sure?')){
        document.querySelectorAll('.collection-item').forEach(function(task){
            task.remove();
        });
        localStorage.removeItem('tasks');
    }
}
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            const taskItem =  e.target.parentElement.parentElement;
            e.target.parentElement.parentElement.remove();
            let tasks = checkTasks();
            tasks.forEach(function(task, index){
                if(taskItem.textContent === task){
                    tasks.splice(index,  1);
                }
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}
function addTask(){
    if(taskInput.value === ''){
        alert('Add as task');
    }else{
        let tasks = checkTasks();
        tasks.push(taskInput.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
function getTasks(){
    let tasks = checkTasks();
    tasks.forEach(function (task){
        taskList.appendChild(createTextNode(task));
    });
}
function checkTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function createTextNode(text){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.id ='new-item';
    li.setAttribute('title', text);
    li.appendChild(document.createTextNode(text));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    return li;
}