import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-7a8a5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")

const inputFieldEl = document.getElementById("inputfield-el")
const btn = document.getElementById("btn")
const moviesEl = document.getElementById("movies-el")

btn.addEventListener("click", function(){
    let inputField = inputFieldEl.value
    
    push(moviesInDB, inputField)
    
    clearinputField()
})


onValue(moviesInDB, function(snapshot) {
    if (snapshot.exists()) {
    
    let itemsArray = Object.entries(snapshot.val())
    
   clearMoviesEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
       appendItemToMoviesEl(currentItem)
    }
    } else {
        moviesEl.innerHTML = "No items here... yet"
    }
    
})


// to clear the field after button cliked
function clearinputField(){
    inputFieldEl.value = ""
}

function clearMoviesEl() {
    moviesEl.innerHTML = ""
}



function appendItemToMoviesEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `movies/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    moviesEl.append(newEl)
}