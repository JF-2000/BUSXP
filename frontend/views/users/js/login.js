var email = document.getElementById('email')
var password = document.getElementById('password')
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

document.getElementById('acceder').addEventListener('click',(e)=>{
    e.preventDefault();
    logger();
})

async function logger(){

    if(valcorreo == false){
        swal("¡Error!","¡Ingrese un email valido!","error")
        return false;
    }
    if(email.value == "" || email.value == null || email.value == undefined){
        swal("¡Error!","¡Ingrese un email valido!","error")
        return false;
    }
    if(password.value == "" || password.value == null || password.value == undefined){
        swal("¡Error!","¡Ingrese una contraseña!","error")
        return false;
    }

    var data = {
        email: email.value,
        password: password.value
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","El correo o la contraseña son incorrectos!","error") 
            }
            var usuario = await JSON.parse(xhr.response)
            swal("¡Ingresado!",`Bienvenido ${usuario[0].nombre}, disfrute de nuestros servicios.`,"success")
            localStorage.setItem('uid',`${usuario[0].iduser}`)
            localStorage.setItem('uname',`${usuario[0].nombre}`)
            localStorage.setItem('uauth',`${usuario[0].auth}`)
            window.location.assign('/index.html')

        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/login");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}