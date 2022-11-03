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
        alert("Tyhjä kenttä!")
        return;
    }
    let index = 1;
    if(x?.id) {
        index = x.id;
    }else if(toDoArray.length > 0) {
        index = Math.max(...toDoArray.map(x => x.id)) + 1;
    }
    const node = document.createElement("li");
    const param = document.createElement("p");
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Poista";
    
    if(x) {
        param.addEventListener("click", () => {
            checkElement(param, index);
        });
        param.style.textDecoration = x.checked ? "line-through" : "unset";
        param.appendChild(document.createTextNode(x.task))
        node.appendChild(param);
        btnDelete.addEventListener("click", () => {
            removeElement(index, node);
        });
    }else {
        const value = document.getElementById("inputField").value;
        
        param.appendChild(document.createTextNode(value))
        node.appendChild(param);
        param.addEventListener("click", () => {
            checkElement(param, index);
        });
        btnDelete.addEventListener("click", () => {
            removeElement(index, node);
        });

        toDoArray.push({id: index, task: value, checked: false});

        updateLocalStorage();
        document.getElementById("inputField").value = ""
    }
    
    node.appendChild(btnDelete);
    todoList.appendChild(node);
    
}

function removeElement(removeId, node) {
    node.remove();
    toDoArray = toDoArray.filter(x => x.id !== removeId)
    updateLocalStorage();
}

function checkElement(node, index) {
    const found = toDoArray.find(element => element.id === index);
    console.log(toDoArray, index);
    found.checked = !found.checked;
    node.style.textDecoration = found.checked ? "line-through" : "unset";
    updateLocalStorage();
}

function inputOnChange(){
    document.getElementById("inputField").style.border = "";
} 