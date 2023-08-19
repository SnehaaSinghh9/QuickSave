let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
let deletebtn=document.getElementById("delete-btn")
let tabBtn=document.getElementById("tab-btn")


// localStorage.clear()  
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )  // return null if match does not found
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // }) 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })    
})



function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li>" + "<a href='myLeads[i]' target='_blank'>" + myLeads[i] + "</a>" + "</li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// deletebtn.addEventListener("dblclick", function() {
//     console.log("double clicked!")
//     localStorage.clear()
//     myLeads = []
//     render(myLeads)
// })

deletebtn.ondblclick=function() {deleteAll()};

function deleteAll(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    console.log( localStorage.getItem("myLeads") )
})

