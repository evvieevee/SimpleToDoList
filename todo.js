const todoList = document.getElementById("toDoList");
let toDoArray = []; 

/**Tässä kohtaa tallennetaan LocalStorageen. */
function updateLocalStorage() {
    window.localStorage.setItem("evenStorage", JSON.stringify(toDoArray));
}
/**Tässä kohtaa tiedot haetaan localstoragesta. Ja alustetaan visuaalisuus saadulla datalla. */
(function populateToDoList() {
    const a = JSON.parse(window.localStorage.getItem('evenStorage'));
    if(a?.length > 0) a.forEach(x => toDoArray.push(x)); 
    toDoArray.forEach((x) => addElement(x))
})();

/**Tämä antaa virheilmoituksen tyhjästä tai liian lyhyestä vastauksesta. Sivulle pompsahtaa lappu, 
 * joka ilmoittaa, että kenttä on tyhjä. Luo elementit ja määrittelee niiden ominaisuudet. 
*/ 
function addElement(storageObject) {
    if(!storageObject && document.getElementById("inputField").value.length < 3) {
        document.getElementById("inputField").style.border = "3px solid red";
        alert("Tyhjä kenttä!")
        return;
    }
// Tässä taski yksilöidään antamalla sille uniikki indexi. 
    let index = 1;
    if(storageObject?.id) {
        index = storageObject.id;
    }else if(toDoArray.length > 0) {
        index = Math.max(...toDoArray.map(x => x.id)) + 1;
    }
    const node = document.createElement("li");
    const param = document.createElement("p");
    /// Tässä luodaan rivin poisto nappi, jonka tekstiksi määritellään "Poista"
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Poista";
    // Tässä asetetaan teksti-elementille kuittaus ominaisuus.
    param.addEventListener("click", () => checkElement(param, index));
    // Tässä pistetään poisto nappi elementille poisto ominaisuus.
    btnDelete.addEventListener("click", () => removeElement(index, node));

    // Tässä saadaan aikaan yliviivaus klikatulle riville. 
    // Eli kun riviä klikataan, rivi merkitään yliviivatuksi, eli tehdyksi.
    if(storageObject) {
        param.style.textDecoration = storageObject.checked ? "line-through" : "unset";
        param.appendChild(document.createTextNode(storageObject.task))
    }else {
        const value = document.getElementById("inputField").value;
        param.appendChild(document.createTextNode(value))
        toDoArray.push({id: index, task: value, checked: false});

    // Päivitetään tiedot localstorageen, jonka jälkeen tyhjennetään input fieldi
        updateLocalStorage();
        document.getElementById("inputField").value = ""
    }
    
    node.appendChild(param);
    node.appendChild(btnDelete);
    // lisätään elementit visuaalisesti listaan
    todoList.appendChild(node);  
}
/** tämä poistaa elementin listasta kokonaan */
function removeElement(removeId, node) {
    node.remove();
    toDoArray = toDoArray.filter(x => x.id !== removeId)
    updateLocalStorage();
}
/** Tämä muuttaa taskin kuittauksen arvon */
function checkElement(node, index) {
    const found = toDoArray.find(element => element.id === index);
    found.checked = !found.checked;
    node.style.textDecoration = found.checked ? "line-through" : "unset";
    updateLocalStorage();
}
/** Poistaa inputfieldin punaisen reunan */
function inputOnChange() {
    document.getElementById("inputField").style.border = "";
} 