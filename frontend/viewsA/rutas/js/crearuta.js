var rdesde = document.getElementById('rdesde');
var rhasta = document.getElementById('rhasta');
var capacidad = document.getElementById('capacidad');
var monto = document.getElementById('monto');


document.getElementById('guardar').addEventListener('click',(e)=>{
    e.preventDefault();
    guardar();
})

async function guardar(){


    if(rdesde.value == "" || rdesde.value == null || rdesde.value == undefined){
        swal("¡Error!","¡Ingrese el lugar de salida de la ruta!","error")
        return false;
    }
    if(rhasta.value == "" || rhasta.value == null || rhasta.value == undefined){
        swal("¡Error!","¡Ingrese el destino de la ruta!","error")
        return false;
    }
    if(capacidad.value == "" || capacidad.value == null || capacidad.value == undefined){
        swal("¡Error!","¡Ingrese la cantidad de personas máxima en ls viajes de esta ruta!","error")
        return false;
    }
    if (monto.value == "" || monto.value == null || monto.value == undefined ||  monto.value <= 0){
        swal("¡Error!","¡Ingrese un monto valido para los viajes en esta ruta!","error")
        return false;
    }

    var data = {
        rdesde: rdesde.value,
        rhasta: rhasta.value,
        cap: capacidad.value,
        monto: monto.value
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
            }
            swal("¡Ruta creada!","Las ruta ha sido creada exitosamente.","success")
            .then(function(){window.location.assign('/viewsA/rutas/lruta.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/ruta/cruta");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}