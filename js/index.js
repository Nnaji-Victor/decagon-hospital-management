//classes instatiation
const ui = new UI();

//eventListeners
eventListeners();

let count = 0;
let amount = 0;
let total = 0;

function eventListeners(){
    const addbutton = document.querySelector('#addbtn');
    addbutton.addEventListener('click', addUsers);

    window.addEventListener('DOMContentLoaded', displayData);

    window.addEventListener('DOMContentLoaded', updateDashboard);

   const  deleteBtn = document.querySelector('#dataTable tbody');
    deleteBtn.addEventListener('click', deletePatient);

   const showData = document.querySelector('#dataTable tbody');
    showData.addEventListener('click', displaySingleData);

    const  updateUserBtn = document.querySelector('#dataTable tbody');
    updateUserBtn.addEventListener('click', updateUser);
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

      let url = 'http://localhost:3000/patients';
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(result),
          headers:{
            'Content-Type': 'application/json'
          }
            }).then(res => res.json())
            .then(ui.displayMessage("patient succesfully added", "success"))
                e.preventDefault();
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
    <td class="text-center"><a href="#" id="clickUpdate"  data-toggle="modal" data-target="#updateModal" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm update">Update</a></td>
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

function updateUser(e){
  e.preventDefault();

  let appendDiv = document.querySelector('#putModal');
  let id = e.target.parentElement.parentElement.id;
  let url = 'http://localhost:3000/patients/'+id;
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(myJson){
    appendDiv.innerHTML=`
  <div class="modal fade" id="updateModal" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="btn  btn-lg btn-block text-capitalize">Edit Patient</button>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body" id="ref">
      <form id="form-selector">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="clientName">Name</label>
          <input type="text" class="form-control" id="clientName2" value = "${myJson.name}"  placeholder="name eg: Henry Clark" required>
        </div>
        <div class="form-group col-md-6">
          <label for="diagnosis">Diagnosis</label>
          <input type="text" class="form-control" id="diagnosis2" value = "${myJson.diagnosis}" placeholder="Diagnosis">
        </div>
      </div>
      <div class="form-group">
        <label for="clientLocation">Location</label>
        <input type="text" class="form-control" id="clientLocation2"  value = "${myJson.location}" placeholder="London">
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="clientAge">Age</label>
          <input type="text" class="form-control" value = "${myJson.age}" id="clientAge2">
        </div>
        <div class="form-group col-md-6">
          <label for="clientAge">Date</label>
            <input class="form-control" type="text"  value = "${myJson.AdmissionDate}" placeholder="12/4/2019" id="clientDate2">
        </div>
        <div class="form-group col-md-4">
          <label for="clientCost">Medical Fee (₦)</label>
          <input type="text" class="form-control" value = ${myJson.medicalFee}  id="clientCost2" required>
        </div>
      </div>
      <div class="form-group">
        <label for="clientDescription">Describe Symptoms and conditions</label>
        <textarea class="form-control" value="" id="clientDescription2" rows="3">${myJson.description}</textarea>
      </div>
      <button type="button" id="updatebtn" class="btn btn-primary" value="">Update Patient</button>
    </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
          </div>
          </div>
      </div>
  `;

    let updateBtn = document.querySelector('#updatebtn');
    updateBtn.addEventListener('click', function(e){
     document.querySelector('#form-selector').remove();
      let clientName = document.querySelector('#clientName2').value;
      let diagnosis = document.querySelector('#diagnosis2').value;
      let location = document.querySelector("#clientLocation2").value;
      let age = document.querySelector('#clientAge2').value;
      let medicalFee = document.querySelector("#clientCost2").value;
      let date = document.querySelector('#clientDate2').value;
      let description = document.querySelector('#clientDescription2').value;


      let result = {
      name: clientName,
      age: age,
      diagnosis: diagnosis,
      AdmissionDate: date,
      location: location,
      medicalFee: medicalFee,
      description: description
   };

   fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(result),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
//   .then(response => console.log('success:', JSON.stringify(response)))
  .then(
  ui.displayMessage("patient succesfully added", "success")
  )
      })
  })

}

function updateDashboard(){
  let url = 'http://localhost:3000/patients';
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    myJson.forEach((patient) => {
      amount += Number(patient.medicalFee);
     })
     document.querySelector('#displayAmount').innerText = "₦"+amount;
  });
}


