//classes instatiation



//eventListeners
eventListeners();


//functions
function eventListeners(){
    const addbutton = document.querySelector('#addbtn');
    addbutton.addEventListener('click', addUsers);
}

function addUsers(e){
    console.log('button clicked');
}