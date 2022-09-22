var rhora = document.getElementById('rhora');


document.getElementById('guardar').addEventListener('click',(e)=>{
    e.preventDefault();
    guardar();
})

async function guardar(){


    if(rhora.value == "" || rhora.value == null || rhora.value == undefined){
        swal("¡Error!","¡Ingrese una hora correcta!","error")
        return false;
    }
    var data = {
        rhora: rhora.value,
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
            }
            swal("¡Horario Creado!","El horario ha sido creado exitosamente.","success")
            .then(function(){window.location.assign('/viewsA/horarios/lhorario.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/hora/chorario");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}