//classes instatiation
const ui = new UI();

//eventListeners
eventListeners();


//functions
// function callAPI(url, data, method, apiFunction){
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(){
//     if(this.readyState === 4 && this.status === 201 || this.readyState === 4 && this.status === 202){
//       apiFunction(this.responseText);
//     }
//   };

//   xhr.open(method, url, true);
//   xhr.setRequestHeader('X-Requested-with', 'XMLHttpRequest');
//   xhr.setRequestHeader('content-type', 'application/json');
//   if(data){
//     xhr.send(data);
//   }else{
//     xhr.send();
//   }
// }

function eventListeners(){
    const addbutton = document.querySelector('#addbtn');
    addbutton.addEventListener('click', addUsers);

    window.addEventListener('DOMContentLoaded', displayData);

   const  deleteBtn = document.querySelector('#dataTable tbody');
    deleteBtn.addEventListener('click', deletePatient);

   const showData = document.querySelector('#dataTable tbody');
    showData.addEventListener('click', displaySingleData);
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
       let description = document.querySelector('#clientDescription').value;

       let result = {
       name: clientName,
       age: age,
       diagnosis: diagnosis,
       AdmissionDate: date,
       location: location,
       medicalFee: medicalFee,
       description: description
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
    document.querySelector('#append').innerHTML +=
    `<tr id="${patient.id}">
    <td><a class="clientName" data-toggle="modal" data-target="#dataModal" href="#">${patient.name}</a></td>
    <td>${patient.diagnosis}</td>
    <td>${patient.location}</td>
    <td>${patient.age}</td>
    <td>${patient.AdmissionDate}</td>
    <td class="text-center"><a href="#" id="updatebtn" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm update">Update</a></td>
    <td class="text-center"><a href="#" data-toggle="modal" data-target="#deleteModal" id="deletebtn" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove">delete</a></td>
    </tr>
   `
   });
   
  });
}


function deletePatient(r){
    r.preventDefault();
    let deletebtn = document.querySelector('#confirmDltBtn');

    deletebtn.addEventListener('click', function(e){
      if(r.target.classList.contains('remove')){
        let id = r.target.parentElement.parentElement.id;
        let url = 'http://localhost:3000/patients/'
        fetch(url+id,{
          method: 'DELETE'
        }).then(()=>{
          console.log('removed')
        }).catch(err => {
          console.log('err')
        })
      }
    })
}

function displaySingleData(e){
  e.preventDefault();
  if(e.target.classList.contains('clientName')){
    let id = e.target.parentElement.parentElement.id;
    let url = 'http://localhost:3000/patients/'+id;
    fetch(url)
    .then(function(data) {
      return data.json();
    }).then(function(myjson){
      const div = document.createElement('div');
      div.innerHTML += `
      <ul class="list-group list-group-flush">
      <li class="list-group-item ">Name: <span class="font-weight-bold"> ${myjson.name}</span></li>
      <li class="list-group-item">age: <span class="font-weight-bold">${myjson.age}</span></li>
      <li class="list-group-item">Location: <span class="font-weight-bold">${myjson.location}</span></li>
      <li class="list-group-item">Diagnosis:<span class="font-weight-bold"> ${myjson.diagnosis}</span></li>
      <li class="list-group-item">Apointment Date: <span class="font-weight-bold"> ${myjson.AdmissionDate} </span></li>
      <li class="list-group-item">Medical Cost:<span class="font-weight-bold"> ₦${myjson.medicalFee}</span></li>
      <li class="list-group-item text-center">Symptoms and Conditions: </li>
      <div class="mb-3">
        <textarea class="form-control" id="" placeholder="${myjson.description}" value="" disabled></textarea>
        <div class="invalid-feedback">
        </div>
      </div>
    </ul>
      `;

      document.querySelector('#single-data').appendChild(div);
      document.querySelector('#closeusrData').addEventListener('click', function(){
       div.remove();
      })

      document.querySelector('#closemodaldata').addEventListener('click',function(){
        div.remove();
      })
    })
  }
}


