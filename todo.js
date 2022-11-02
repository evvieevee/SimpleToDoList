const todoList = document.getElementById("toDoList");
let toDoArray = [];


function updateLocalStorage() {
    window.localStorage.setItem("evenStorage", JSON.stringify(toDoArray));
}

(function populateToDoList() {
    const a = JSON.parse(window.localStorage.getItem('evenStorage'));
    if(a?.length > 0) a.forEach(x => toDoArray.push(x)); 
    toDoArray.forEach((x) => addElement(x, true))
})();


function addElement(x, fromLocal = false) {
    if(!fromLocal && document.getElementById("inputField").value.length < 3) {
        document.getElementById("inputField").style.border = "3px solid red";
        alert("En tykkää thjistä taskeistä!!!!!!!")
        return;
    }
    let index = 0;
    if(x?.id) {
        index = x.id;
    }else if(toDoArray.length > 0) {
        index = Math.max(...toDoArray.map(x => x.id)) + 1;
    }
    const node = document.createElement("li");
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "X";
    
    if(x) {
        node.appendChild(document.createTextNode(x.task));
        btnDelete.addEventListener("click", () => {
            console.log("delete me", index);
            removeElement(index);
        });
    }else {
        const value = document.getElementById("inputField").value;
        node.appendChild(document.createTextNode(value));
        btnDelete.addEventListener("click", () => {
            console.log("delete me", index)
            removeElement(index);
        });
        toDoArray.push({id: index, task: value, checked: false});
        updateLocalStorage();
        document.getElementById("inputField").value = ""
    }
    
    node.appendChild(btnDelete);
    todoList.appendChild(node);
    
}

function removeElement(removeId) {
    toDoArray = toDoArray.filter(x => x.id === removeId)
    // remove item from list and reset localstorage
    updateLocalStorage();
}

function checkElement() {

    updateLocalStorage();
}

function inputOnChange(){
    document.getElementById("inputField").style.border = "";
} 