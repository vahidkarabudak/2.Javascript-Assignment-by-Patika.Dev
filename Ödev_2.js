/* Patika.dev_Javascript_2.Ödev*/

// localStorage'da var olan itemları sayfa yenilenince oluşturma fonksiyonu
let ulDOM = document.querySelector("#list")
const showLocalItems = function(){
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (!todos) {
        localStorage.setItem("todos", JSON.stringify([]))
    } else {
        for (let i=0; i< todos.length; i++){
            function localNewElement() {
                let newListElement = document.createElement("li")
                let inputValue = todos[i].text
                let valueText = document.createTextNode(inputValue)
                newListElement.appendChild(valueText)

                let span = document.createElement("span")
                let x = document.createTextNode("x")
                span.classList.add("close")
                span.appendChild(x)
                newListElement.appendChild(span)
                ulDOM.appendChild(newListElement)

                if( todos[i].isChecked == true) {
                    newListElement.classList.add("checked")
                } else {
                    newListElement.classList.remove("checked")
                }

            } 
            localNewElement()
        }
    }
}
showLocalItems()

// List item oluşturma

let listItems = document.getElementsByTagName("li")
for (let i=0; i<listItems.length; i++) {
    let span = document.createElement("span")
    let x = document.createTextNode("x")
    span.classList.add("close")
    span.appendChild(x)
    listItems[i].appendChild(span)
}

// Class'ı close olan itemlar x'a tıklandığında ekranda gösterilmesin

let close = document.getElementsByClassName("close")
for (let i=0; i<close.length; i++){
    close[i].onclick = function(){
        let div = this.parentElement
        div.style.display="none"

        // Class'ı close olan itemlar localStorage'dan silinsin

        const itemText = div.textContent
        const itemTextSlice = itemText.slice(0, itemText.length-2)
    
        let todos = JSON.parse(localStorage.getItem("todos"))
        todos = todos.filter(item => item.text != itemTextSlice)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}

// Yeni liste elemanı ekleniyor

function newListElement () {
    let newList = document.createElement("li")
    let inputValue = document.querySelector("#task").value
    let valueText = document.createTextNode(inputValue)
    newList.appendChild(valueText)
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
        $(".error").toast("show")
    } else {
        $(".success").toast("show")
        ulDOM.appendChild(newList)
    }
    document.querySelector("#task").value=""
    let span = document.createElement("span")
    let x = document.createTextNode("x")
    span.classList.add("close")
    span.appendChild(x)
    newList.appendChild(span)

    // x'e tıklandığında liste elemanı kayboluyor

    for (let i = 0; i<close.length; i++){
        close[i].onclick = function(){
            let div = this.parentElement
            div.style.display = "none"
        }
    }

    // Yeni eklenen list elemanı localStorage'a ekleme
    const todo = {text: inputValue, isChecked: false}
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todo.text != "") {
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
    }
}

// Enter'a basıldığında da item'ı ekleme

let input = document.querySelector("#task")
input.addEventListener("keyup",function(event){
    if(event.key === "Enter"){
        event.preventDefault()
        document.querySelector("#liveToastBtn").click()
    }
})

// Tıklayınca üstünü çizme

ulDOM.addEventListener("click",function(event){
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked")
        const itemText = event.target.textContent
        const itemTextSlice = itemText.slice(0,itemText.length-2)

        if (event.target.classList.contains("checked") == true) {
            const todos = JSON.parse(localStorage.getItem("todos"))
            todos.forEach(element => {
                if (element.text == itemTextSlice){
                    element.isChecked = true
                }
                localStorage.setItem("todos",JSON.stringify(todos))
            })
        } else if ( event.target.classList.contains("checked") == false) {
            const todos = JSON.parse(localStorage.getItem("todos"))
            todos.forEach(element => {
                if (element.text == itemTextSlice) {
                    element.isChecked = false 
                }
                localStorage.setItem("todos",JSON.stringify(todos))
            })
        }
    }
}, false) 