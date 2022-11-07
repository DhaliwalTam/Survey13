var questionNumber = 1;
var numberArray = ["one","two","three","four","five"];
var today = new Date();
var array1 = [];
var array2 = [];
var array3 = [];
var array4 = [];
var array5 = [];

document.getElementById("questionCreate").addEventListener("click",nextQuestion);
document.getElementById("createSurvey").addEventListener("submit", preventSubmit);
document.getElementById("expire").addEventListener("blur",validateDate);
document.getElementById("submitButton").addEventListener("click", formConfirmation);

window.addEventListener("load",function(){
    var addOptionButtons = document.getElementsByClassName("addOptions");
    var controlDivs = document.getElementsByClassName("questionField");
    for(var i=2; i<controlDivs.length; i++){
        controlDivs[i].style.visibility = "hidden";
    }

    for(var i = 0; i < addOptionButtons.length; i++){
        document.getElementsByClassName("addOptions")[i].addEventListener("click",createQuestion);
    }
    
    

    if(today.getMonth()+1 < 10 && today.getDate() < 10){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 < 10 && today.getDate() >= 10){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() < 10 ){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() >= 10 ){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    }

    
    
    if(today.getMonth()+1 < 10 && today.getDate() < 10){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 < 10 && today.getDate() >= 10){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() < 10 ){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() >= 10 ){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    }


})

function nextQuestion(){
    document.getElementById(`question${numberArray[questionNumber-1]}Div`).style.visibility = "visible";
}

function validateDate(){
    const activeDate = new Date(document.getElementById("active").value);
    const expiryDate = new Date(document.getElementById("expire").value);

    if(activeDate > expiryDate){
        alert("Invalid expiry date selected!");
        document.getElementById("expire").value = "";
    }

}

function preventSubmit(e){
    e.preventDefault();
}

function createQuestion(){
    var radioText = document.createElement("input");
    var addButton = document.createElement("button");
    
    addButton.innerHTML = "Add option";
    addButton.className = "add";
    addButton.id = `${questionNumber}`;
    addButton.type = "button";
    radioText.type = "text";
    radioText.id = `radioLabel${questionNumber}`;
    document.getElementById(`question${this.id}Div`).appendChild(radioText);
    document.getElementById(`question${this.id}Div`).appendChild(addButton);
    
    for(var i = 0; i < document.getElementsByClassName("add").length; i++){
        document.getElementsByClassName("add")[i].addEventListener("click",addOptions);
    }
    questionNumber++;
}

function addOptions(){
    var radio = document.createElement("input");
    var label = document.createElement("label");
    
    radio.type = "radio";
    radio.name = `answers${questionNumber-1}`;
    radio.id = `question${questionNumber-1}`;
    radio.value = document.getElementById(`radioLabel${this.id}`).value;
    label.innerHTML = `${document.getElementById(`radioLabel${this.id}`).value}`;
    
    document.getElementById(`options${this.id}`).appendChild(radio);
    document.getElementById(`options${this.id}`).appendChild(label);
    document.getElementById(`options${this.id}`).innerHTML += "<br>";
    document.getElementById(`radioLabel${this.id}`).value = "";  
    
    if(this.id == 1){
        array1.push(label.innerHTML);
        document.getElementById(`optionList${this.id}`).value = array1;
        
    }

   if(this.id == 2){
        array2.push(label.innerHTML);
        document.getElementById(`optionList${this.id}`).value = array2;
        
    }

    if(this.id == 3){
        array3.push(label.innerHTML);
        document.getElementById(`optionList${this.id}`).value = array3;
    }

    if(this.id == 4){
        array4.push(label.innerHTML);
        document.getElementById(`optionList${this.id}`).value = array4;
    }

    if(this.id == 5){
        array5.push(label.innerHTML);
        document.getElementById(`optionList${this.id}`).value = array5;
    }
    //document.getElementById(`optionList${this.id}`).value += `${label.innerHTML}`;
}


function formConfirmation() {
    var mainForm = document.getElementById("createSurvey");
    
    if (questionNumber > 2) {
        mainForm.submit();
    }

    else if(questionNumber < 2){
        alert("You must have more than 2 questions!");
    }
}