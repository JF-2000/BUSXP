var email = document.getElementById('email');
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
});

document.getElementById('solicitar').addEventListener('click',(e)=>{
    e.preventDefault();
    olvidar();
});


async function olvidar(){

    if(valcorreo == false){
        swal("¡Error!","¡Ingrese un email valido!","error")
        return false;
    }
    if(email.value == "" || email.value == null || email.value == undefined){
        swal("¡Error!","¡Ingrese un email valido!","error")
        return false;
    }

    var emailc = email.value;
    var correo = emailc.toLocaleLowerCase()

    var data = {
        email: correo
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","¡Este correo no esta registrado!","error") 
            }
            swal("¡Enviado!","Se ha enviado un correo de recuperación a la dirección email ingresada.","success")
            .then(function(){window.location.assign('/views/users/login.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/recuperar/olvide");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}