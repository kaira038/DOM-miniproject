// DEFINE UI VARS

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

//console.log(form,taskInput,taskList,clearBtn);

//LOAD ALL EVENT LISTENERS - recommended

loadEventListeners();

function loadEventListeners() {   ////handle all events

    //1. Add task event
    form.addEventListener("submit", addTask);

    //2. Add clear task event
    clearBtn.addEventListener("click", clearTask);

    //3.Remove element
    taskList.addEventListener("click", removeTask);

    //4.DOM load Event
    document.addEventListener("DOMContentLoaded", getTask);  //refresh the page the event-getTask get triggered

}

// 4. DOM load event

function getTask() {

    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];

    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));

    }

    tasks.forEach(function (item) {    // show front end UI of stored items while refresh

        //create element(li)
        const li = document.createElement("li");

        //add classname
        li.className = "collection-item";

        //create text node
        li.appendChild(document.createTextNode(item));
        //li.innerText=taskInput.value;

        //creat element
        const link = document.createElement("a");

        //add classname
        link.className = "delete-item secondary-content";

        //Add Icon HTML
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        //Add link to li
        li.appendChild(link);

        //Add li to ul
        taskList.appendChild(li);
    })

}


//1.Add task

//NOTES:- form event has default refreshing behavior , It can turn off by using prevent default

function addTask(e) {
    e.preventDefault();

    if (taskInput.value === "") {
        alert("Please fill the form");
    } else {
        //create element(li)
        const li = document.createElement("li");

        //add classname
        li.className = "collection-item";

        //create text node
        li.appendChild(document.createTextNode(taskInput.value));

        //creat element
        const link = document.createElement("a");

        //add classname
        link.className = "delete-item secondary-content";

        //Add Icon HTML
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        //Add link to li
        li.appendChild(link);

        //Add li to ul
        taskList.appendChild(li);

        //store in ls
        storeTaskInLocalStorage(taskInput.value);




        //clear input field
        taskInput.value = "";

    }
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks")); // need previos value as well so parse it convert to arr

    }

    tasks.push(task);// add new item end of the array- push()
    // loacal storage can'store data as array should convert into string
    localStorage.setItem("tasks", JSON.stringify(tasks));  //


    console.log(tasks);
    // console.log(Array.isArray(tasks));
}



function clearTask() {
    //taskList.innerHTML=null;
    //taskList.innerHTML="";

    //Another way

    const li = document.querySelectorAll("li");  //Return Nodelist


    // for(i=0;i<li.length;i++){
    //     (li[i]).remove();   //return element- node list may look like array but its not array

    // }


    // For each Method

    //::HTML collection no have for each ,so convert to arr then we use foreach

    li.forEach(function (element) {
        element.remove();
    })

    clearTaskFromLocalStorage();

}

function clearTaskFromLocalStorage() {
    localStorage.clear();
}


//Event delegation -Remove Tas

function removeTask(e) {
    if (e.target.parentElement.className === "delete-item secondary-content") {
        if (confirm("Are you sure")) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromStorage(li) {
    const liInnerText=li.innerText;

    console.log(liInnerText);
    
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(item, index){
       
        if (liInnerText===item) {
            tasks.splice(index,1);
        }
    })

    localStorage.setItem("tasks",JSON.stringify(tasks));

}



// JSON

// const arr=[1,2,3,4];

// const arrToString= JSON.stringify(arr);

// const stringToArray= JSON.parse(arrToString);


// console.log(arrToString);
// console.log(Array.isArray(arrToString)); //false -its not array
// console.log(typeof(arrToString)); // shows string
// console.log(stringToArray);
// console.log(Array.isArray(stringToArray));  //true its array
// console.log(typeof(stringToArray));  //object (doubt)