const url = window.location.search;
let searchParams = new URLSearchParams(url);
const info = searchParams.get('inf');

async function verifemail(){
    var data = {
        iduser: info
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "errid"){  
                return swal("¡Error!","Este usuario no existe...","error")
                .then(function(){window.location.assign('/views/users/registrar.html')}) 
            }
            swal('Verificación.','Su cuenta ha sido verificada!','success')
            .then(function(){window.location.assign('/views/users/login.html')}) 
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/verificar/verificaruser");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
}