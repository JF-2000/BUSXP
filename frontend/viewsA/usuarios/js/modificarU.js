const url = window.location.search;
let searchParams = new URLSearchParams(url);
const iuser = searchParams.get('r');

var nombre = document.getElementById('nombre')
var email = document.getElementById('email')
var password = document.getElementById('password')
var confpass = document.getElementById('confpass')
var authlvl = document.getElementById('authlvl')
var titulo = document.getElementById('titulo');
var valcorreo;

document.getElementById('email').addEventListener('keyup',()=>{
    var icoerr = document.getElementById('icoerr')
    var icodone = document.getElementById('icodone')
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email.value)){
        icoerr.style.display = "none";
        icodone.style.display = "inline";
        valcorreo = true;
        
    } else {
        icodone.style.display = "none";
        icoerr.style.display = "inline";
        valcorreo = false;
        
    }
})

async function datauser(){
    let usuario = [];
    
    await fetch(api+`/users/${iuser}`)
    .then(response => response.json())
    .then((data) => usuario = data[0])
        // titulo.textContent += usuario.iduser;
        // nombre.value = usuario.nombre;
        // email.value = usuario.email;
        // authlvl.value = usuario.auth
        
        console.log(usuario)
        
}


document.getElementById('guardar').addEventListener('click',(e)=>{
    e.preventDefault();
    guardar();
})

async function guardar(){

    if(valcorreo == false){
        swal("¡Error!","¡Ingrese un email valido!","error")
        return false;
    }
    if(email.value == "" || email.value == null || email.value == undefined){
        swal("¡Error!","¡Ingrese un email valido!","error")
        return false;
    }
    if(nombre.value == "" || nombre.value == null || nombre.value == undefined){
        swal("¡Error!","¡Ingrese un nombre!","error")
        return false;
    }
    if(authlvl.value == "" || authlvl.value == null || authlvl.value == undefined){
        swal("¡Error!","¡Ingrese un Nivel de Usuario!","error")
        return false;
    }
    if(password.value == "" || password.value == null || password.value == undefined){
        swal("¡Error!","¡Ingrese una contraseña!","error")
        return false;
    }
    if (password.value != confpass.value){
        swal("¡Error!","¡La constraseña o su confirmación es diferente una de otra.","error")
        return false;
    }

    var emailc = email.value;
    var correo = emailc.toLocaleLowerCase()

    var data = {
        iduser : iuser,
        nombre: nombre.value,
        email: correo,
        password: password.value,
        authlvl: authlvl.value
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "errmail"){
                return swal("¡Error!","Este correo ya está en uso...","error") 
            }
            swal("¡Modificado!","Usuario Modificado Correctamente","success")
            .then(function(){window.location.assign('/viewsA/usuarios/usuarios.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/nuevoU");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}
