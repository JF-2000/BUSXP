const url = window.location.search;
let searchParams = new URLSearchParams(url);
const ihora = searchParams.get('r');

var hora = document.getElementById('hora');


async function datahorario(){
    
    let horario = [];

    await fetch(api+`/hora/idhora`)
    .then(response => response.json())
    .then((data) => horario = data[0])
        titulo.textContent += horario.idhorario;
        hora.value = horario.hora;

}


document.getElementById('guardar').addEventListener('click',(e)=>{
    e.preventDefault();
    guardar();
})

async function guardar(){


    if(hora.value == "" || hora.value == null || hora.value == undefined){
        swal("¡Error!","¡Ingrese la hora de salida!","error")
        return false;
    }

    var data = {
        idhorario: ihora,
        hora: hora.value,

    }
    
    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
            }
            swal("¡Horario modificada!","La hora ha sido modificada exitosamente.","success")
            .then(function(){window.location.assign('/viewsA/horarios/lhorario.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/hora/mhorario");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}