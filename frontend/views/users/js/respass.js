const url = window.location.search;
let searchParams = new URLSearchParams(url);
const key = searchParams.get('k');

var password = document.getElementById('password')
var confpass = document.getElementById('confpass')

document.getElementById('restablecer').addEventListener('click',()=>{
    guardar();
});

async function guardar(){

    if(password.value == "" || password.value == null || password.value == undefined){
        swal("¡Error!","¡Ingrese una contraseña!","error")
        return false;
    }
    if (password.value != confpass.value){
        swal("¡Error!","¡La constraseña o su confirmación es diferente una de otra.","error")
        return false;
    }

    var data = {
        key: key,
        password: password.value
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "errmail"){
                return swal("¡Error!","Ocurrio un error al restablecer la contraseña","error") 
            }
            swal("¡Restablecido!","Su contraseña se ha restablecido correctamente, por favor inicie sesión.","success")
            .then(function(){window.location.assign('/views/users/login.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/recuperar/restablecerpass");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}