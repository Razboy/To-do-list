var todoList = [];
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// localStorage.clear()

var d = new Date();
var monthIndex = d.getMonth();
var day = d.getDate();
var year = d.getFullYear(); 

function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {

  if(document.getElementById('task').value == ""){
    alert("Write Something!");
  }else {
    var task = document.getElementById('task').value;
 
    var todos = todoList;
    todos.push({
      value: task,
      date: day + " " + monthNames[monthIndex] + " " + year 
    });
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
    document.getElementById('task').value = "";
  }
    
    return false;
}

function onEnter(event){
   var eventValue = event.which || event.keyCode;

   if(eventValue == 13){
    add();
   }
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = todoList;
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
  
    return false;
}
 
function show() {
    var todos = get_todos();
 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li draggable="true">' + '<h3>' + todos[i].value + '</h3>' + '<span class="date">' + todos[i].date +'</span>' + '<button class="upbutton" id="'+ i +'">\u25B2</button>' + '<button class="downbutton" id="'+ i +'">\u25BC</button>' +'<button class="remove" id="' + i +'down' + '">\u274C</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };

    var liUp = document.getElementsByClassName('upbutton');
    var liDown = document.getElementsByClassName('downbutton');
    
    for(var j = 0; j < liUp.length; j++){
      liUp[j].addEventListener('click', draggableUp);
    }

    for(var k = 0; k < liDown.length; k++){
      liDown[k].addEventListener('click', draggableDown);
    }
}

function draggableUp(){
  var idUp = parseInt(this.getAttribute('id'));
    var temp;
    if(idUp > 0 && idUp < todoList.length){
      temp = todoList[idUp];
      todoList[idUp] = todoList[idUp-1];
      todoList[idUp-1] = temp;
      localStorage.setItem('todo', JSON.stringify(todoList));
      show();
    }
}

function draggableDown(){
  var idDown = parseInt(this.getAttribute('id'));
    var tempDown;
    if(idDown < todoList.length-1){
      tempDown = todoList[idDown];
      todoList[idDown] = todoList[idDown+1];
      todoList[idDown+1] = tempDown;
      localStorage.setItem('todo', JSON.stringify(todoList));
      show();
    }
}

function searchTask(){
  var input, filter, ul, li, a, i;
    input = document.getElementById("search-task");
    filter = input.value.toUpperCase();
    ul = document.getElementById("todos");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

if(JSON.parse(localStorage.getItem('todo')) != null){
    if(confirm("Do You wanna to restore your tasks?")){
      todoList = get_todos();
    }else{
      localStorage.clear();
      todoList = [];
    }   
  }

document.getElementById('add').addEventListener('click', add);
show();

