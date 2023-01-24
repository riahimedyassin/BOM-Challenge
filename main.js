let newTask=document.querySelector(".task")
let addButton=document.querySelector(".add")
let allTasks=document.querySelector(".tasks")
let myBody=document.querySelector("body");
let myColors=document.querySelectorAll(".color");

myColors.forEach(el=> {
    document.body.style.backgroundColor=localStorage.colors
    el.addEventListener("click",e=> {
        document.body.style.backgroundColor=el.getAttribute("data-color")
        localStorage.colors=el.getAttribute("data-color")
    
    })
})

// localStorage.clear()
tasksList= [];
if (localStorage.tasksList) {
    showElements(JSON.parse(localStorage.getItem("tasksList")))
    tasksList=JSON.parse(localStorage.tasksList);
}
//REMOVE 
allTasks.addEventListener("click",(e) => {
    if(e.target.classList.contains("del")) {
        console.log(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
        removeFromLocal(e.target.parentElement.getAttribute('data-id'))
    }
    if(e.target.classList.contains("new-task")) {
        e.target.classList.toggle("done")
    }

})
function removeFromLocal(element) {
    let deleteArray=JSON.parse(localStorage.tasksList);
    deleteArray=deleteArray.filter(el => {
        return el.id!=element
    })
    addToLocal(deleteArray)
}
function showElements(taskList) {
    for (let i=0;i<taskList.length;i++) {
        let div=document.createElement("div");
        div.setAttribute("data-id",`${taskList[i].id}`)
        div.appendChild(document.createTextNode(`${taskList[i].title}`))
        let span=document.createElement("span");
        span.appendChild(document.createTextNode("Delete"))
            span.classList.add("del");
            div.appendChild(span)
        allTasks.appendChild(div);
        div.classList.add("new-task");
    }
    taskDone()
}

function taskDone() {
    let myTasks=document.querySelectorAll("div .new-task");
    myTasks.forEach(e=> {
        var myArray=JSON.parse(localStorage.tasksList);
        myArray.map(el=> {
            if( el.id==e.getAttribute("data-id") ) {
                el.complited ? e.classList.add("done"):e.classList.remove("done")
            }
        })
        e.addEventListener("click",el=> {
    
            myArray=myArray.map(element=> {
                if(element.id==el.currentTarget.getAttribute("data-id") ) {
                    (element.complited===false) ? element.complited=true:element.complited=false
                    return element
                }
                else {
                    return element
                }     
            })
               
        })
        addToLocal(myArray)
    })
    
}
addButton.addEventListener("click",function() {
    tasksList=JSON.parse(localStorage.tasksList);
    if (newTask.value!=="") {
        let taskObject={
            id:Date.now(),
            title:`${newTask.value}`,
            complited:false
        }   
        newTask.value=""
        tasksList.push(taskObject)
        allTasks.innerHTML="";
        newTask.focus()
        addToLocal(tasksList);
        for (let i=0;i<tasksList.length;i++) {
            let div=document.createElement("div");
            div.setAttribute("data-id",`${tasksList[i].id}`);
            div.appendChild(document.createTextNode(`${tasksList[i].title}`))
            let span=document.createElement("span");
        span.appendChild(document.createTextNode("Delete"))
            span.classList.add("del");
            div.appendChild(span)
            div.classList.add("new-task");
            allTasks.appendChild(div);

        }
        
        
    }
    
})

function addToLocal(taskComp) {
    localStorage.tasksList=JSON.stringify(taskComp)
}