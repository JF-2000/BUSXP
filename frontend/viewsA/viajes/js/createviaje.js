var lrutas = document.getElementById('rutas');
var lhorario = document.getElementById('horarios');
var capacidad = document.getElementById('capacidad');
var monto = document.getElementById('monto');



async function crearselect(){
    var html = '';
    var html2 = '';
    let horarios = [];
    let rutas = [];

    
    await fetch(api+`/hora/allhorario`)
    .then(response => response.json())
    .then((data) => horarios = data)
        horarios.forEach(horario => {
            html += `<option value="${horario.idhorario}">${horario.hora}</option>`
        })
        lhorario.innerHTML = html;
        

    await fetch(api+`/ruta/allrutas`)
    .then(response => response.json())
    .then((data) => rutas = data)
        rutas.forEach(ruta => {
            html2 += `<option value="${ruta.idruta}">${ruta.rutadesde}-${ruta.rutahasta}</option>`
        })
        lrutas.innerHTML = html2;
} 


document.getElementById('guardar').addEventListener('click',(e)=>{
    e.preventDefault();
    guardar();
})

async function guardar(){


    if(lrutas.value == "" || lrutas.value == null || lrutas.value == undefined){
        swal("¡Error!","¡Ingrese el lugar de salida de la ruta!","error")
        return false;
    }
    if(lhorario.value == "" || lhorario.value == null || lhorario.value == undefined){
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
        idruta: lrutas.value,
        idhorario: lhorario.value,
        cap: capacidad.value,
        monto: monto.value,
        

    }
    

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
            }
            swal("¡Ruta modificada!","El viaje ha sido modificada exitosamente.","success")
            .then(function(){window.location.assign('/viewsA/viajes/lviajes.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/viajes/createviaje");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}