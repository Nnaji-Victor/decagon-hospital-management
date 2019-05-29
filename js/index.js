//classes instatiation
const ui = new UI();

//eventListeners
eventListeners();


//functions
function eventListeners(){
    const addbutton = document.querySelector('#addbtn');
    addbutton.addEventListener('click', addUsers);
    window.addEventListener('DOMContentLoaded', displayData);
}

function addUsers(e){
    e.preventDefault();
    document.querySelector('#modalbtn').addEventListener('click', function(e){
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
    if(clientName !== '' || diagnosis !== '' || location !== '' || age !== '' || medicalFee !== '' || date !== ''){
        let url = 'http://localhost:3000/patients';
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(result),
          headers:{
            'Content-Type': 'application/json'
          }
      }).then(res => res.json())
    //   .then(response => console.log('success:', JSON.stringify(response)))
      .then(
        ui.displayMessage("patient succesfully added", "success")
    )
    //   .catch(error => console.error('error', error));
    e.preventDefault();
     }
     
     else{
         ui.displayMessage('please input all data before sending', "danger");
     }
    })
    e.preventDefault();
}

function displayData(){
  let url = 'http://localhost:3000/patients';
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    myJson.forEach(patient => {
    document.querySelector('tbody').innerHTML +=
    `<tr>
    <td><a href="#">${patient.name}</a></td>
    <td>${patient.diagnosis}</td>
    <td>${patient.location}</td>
    <td>${patient.age}</td>
    <td>${patient.AdmissionDate}</td>
    <td>${patient.medicalFee}</td>
    <td class="text-center"><a href="#" id="updatebtn" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm">Update</a></td>
    <td class="text-center"><a href="#" id="deletebtn" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm">delete</a></td>
    </tr>
   `
   });
   
  });

  

}


