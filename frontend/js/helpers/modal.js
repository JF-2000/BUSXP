// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
if(document.getElementById("btnmodal")){
    var btnmodal = document.getElementById("btnmodal");

    btnmodal.onclick = function() {
        modal.style.display = "block";
    }
      
}

// Get the <span> element that closes the modal
if(document.getElementsByClassName("close")[0]){
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
}   


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
