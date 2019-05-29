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
    e.preventDefault();
    
}