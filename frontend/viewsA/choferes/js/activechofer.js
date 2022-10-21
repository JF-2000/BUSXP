async function activechofer(i){
    if(i == "" || i == null || i == undefined){
        swal("¡Error!","¡No se encuentra el ID!","error")
        return false;
    }

    var data = {
        idchofer: i
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
            }
            swal("¡Estado!","Estado alterado de forma exitosa.","success")
            .then(function(){window.location.assign('/viewsA/choferes/choferes.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/choferes/inachofer");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
}