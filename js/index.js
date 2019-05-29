//classes instatiation
const ui = new UI();

//eventListeners
eventListeners();


//functions
function eventListeners(){
    const addbutton = document.querySelector('#addbtn');
    addbutton.addEventListener('click', addUsers);
}

function addUsers(e){
    document.querySelector('#modalbtn').addEventListener('click', function(f){
        f.preventDefault();
       let clientName = document.querySelector('#clientName').value;
       let diagnosis = document.querySelector('#diagnosis').value;
       let location = document.querySelector("#clientLocation").value;
       let age = document.querySelector('#clientAge').value;
       let medicalFee = document.querySelector("#clientCost").value;
       let date = document.querySelector('#clientDate').value;

       let result = {
       "name": clientName,
       "diagnosis": diagnosis,
       "location": location,
       "age": age,
       "medicalFee": medicalFee,
       "date": date
       }

       let response = new XMLHttpRequest();
       response.open('POST','http://localhost:3000/patients', true);

       response.onload = function(){
           if(status.ok){
               let respText = response.responseText;
           }else{
               console.log(error);
           }
       };

       response.send();
    })

}

