var email = document.getElementById('email');
var nombre = document.getElementById('nombre');
var password = document.getElementById('password');
var btnsave = document.getElementById('guardar');


async function reusuario(){
    var usuario = [];
    await fetch(api+`/users/perfil/${localStorage.getItem('uid')}`)
    .then(response => response.json())
    .then((data) => usuario = data);
    email.value = usuario[1];
    nombre.value = usuario[0];
    password.value = usuario[2];
}

nombre.addEventListener('keyup',()=>{
    btnsave.removeAttribute("disabled");
})
password.addEventListener('keyup',()=>{
    btnsave.removeAttribute("disabled");
})

btnsave.addEventListener('click',()=>{
    guardar();
})

async function guardar(){

    if(nombre.value == "" || nombre.value == null || nombre.value == undefined){
        swal("¡Error!","¡Ingrese un nombre!","error")
        return false;
    }
    if(password.value == "" || password.value == null || password.value == undefined){
        swal("¡Error!","¡Ingrese una contraseña!","error")
        return false;
    }

    var data = {
        id: localStorage.getItem('uid'),
        nombre: nombre.value,
        password: password.value
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "errmail"){
                return swal("¡Error!","Se produjo un error al guardar la información.","error") 
            }
            swal("¡Cambios guardados","Se han guardado los cambios de forma exitosa.","success")
            .then(function(){window.location.reload()})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/users/perfilmodif");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}
