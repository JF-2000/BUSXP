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
            localStorage.setItem('uid',`${usuario[0].iduser}`)
            localStorage.setItem('uname',`${usuario[0].nombre}`)
            var _0xae26=["\x61\x75\x74\x68","\x75\x61\x75\x74\x68","\x75\x73\x65\x72","\x73\x65\x74\x49\x74\x65\x6D","\x61\x64\x6D","\x63\x68\x6F\x66","\x73\x65\x63\x72\x65\x74"];if(usuario[0][_0xae26[0]]== 1){localStorage[_0xae26[3]](_0xae26[1],_0xae26[2])};if(usuario[0][_0xae26[0]]== 2){localStorage[_0xae26[3]](_0xae26[1],_0xae26[4])};if(usuario[0][_0xae26[0]]== 3){localStorage[_0xae26[3]](_0xae26[1],_0xae26[5])};if(usuario[0][_0xae26[0]]== 4){localStorage[_0xae26[3]](_0xae26[1],_0xae26[6])}
            swal("¡Ingresado!",`Bienvenido ${usuario[0].nombre}, disfrute de nuestros servicios.`,"success")
            .then(function(){
                var _0xcd92=["\x61\x75\x74\x68","\x2F\x76\x69\x65\x77\x73\x43\x2F\x6D\x69\x73\x76\x69\x61\x6A\x65\x73\x2E\x68\x74\x6D\x6C","\x61\x73\x73\x69\x67\x6E","\x6C\x6F\x63\x61\x74\x69\x6F\x6E"];if(usuario[0][_0xcd92[0]]== 3){return window[_0xcd92[3]][_0xcd92[2]](_0xcd92[1])}
                window.location.assign('/index.html')
            })
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

document.getElementById('password')
    .addEventListener('keyup', function(event) {
        if (event.code === 'Enter'){
            event.preventDefault();
            logger();
        }
});