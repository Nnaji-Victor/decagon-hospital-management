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
       name: clientName,
       age: age,
       diagnosis: diagnosis,
       AdmissionDate: date,
       location: location,
       medicalFee: medicalFee
    };

    let url = 'http://localhost:3000/patients';
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(result),
          headers:{
            'Content-Type': 'application/json'
          }
      }).then(res => res.json())
      .then(response => console.log('success:', JSON.stringify(response)))
      .catch(error => console.error('error', error))
    })

}


