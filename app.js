import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL : "https://shiba-cart-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "cart");

console.log(app)
console.log(database)

const inputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppingListElement = document.getElementById("shopping-list");

addButtonElement.addEventListener("click", () => {
    let inputValue = inputFieldElement.value;
    
    if(inputValue.length == 0){
        alert("Invalid input");
    } else {
        push(itemsInDB, inputValue);
    }
    clearInputField();   
})

onValue (itemsInDB, function(snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
       clearShoppingCartElement();
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            addItem(currentItem);
        }
    } else {
        shoppingListElement.innerHTML= "";
    }

})

function clearShoppingCartElement () {

    shoppingListElement.innerHTML = "";
}

function clearInputField() {

    inputFieldElement.value = "";
}

function addItem(item) {

    let itemID = item[0]
    let itemValue = item[1]
    
    let newElement = document.createElement("li");
    newElement.textContent = itemValue

    newElement.addEventListener("click", () => {
        let itemInDB = ref(database, `cart/${itemID}`)
        remove(itemInDB)
    })
    shoppingListElement.append(newElement)
    
}