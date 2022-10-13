const url = window.location.search;
let searchParams = new URLSearchParams(url);
const ichofer = searchParams.get('r');

var Cemail = document.getElementById('email');
var Cnombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var direccion = document.getElementById('direccion');
var cedula = document.getElementById('cedula');
var telefono = document.getElementById('telefono');


async function choferselect(){
    var html = '';
    let choferes = [];
    
    await fetch(api+`/choferes/uchoferes`)
    .then(response => response.json())
    .then((data) => choferes = data)
        choferes.forEach(chofer => {
            html += `<option value="${chofer.iduser}">${chofer.email}</option>`
            
        })
        Cemail.innerHTML = html;
        console.log(Cemail.value)
} 

document.getElementById('guardar').addEventListener('click',(e)=>{
    e.preventDefault();
    guardar();
})


async function guardar(){


    if(Cnombre.value == "" || Cnombre.value == null || Cnombre.value == undefined){
        swal("¡Error!","¡Ingrese el lugar de salida de la ruta!","error")
        return false;
    }
    if(apellido.value == "" || apellido.value == null || apellido.value == undefined){
        swal("¡Error!","¡Ingrese el destino de la ruta!","error")
        return false;
    }
    if(direccion.value == "" || direccion.value == null || direccion.value == undefined){
        swal("¡Error!","¡Ingrese la cantidad de personas máxima en ls viajes de esta ruta!","error")
        return false;
    }
    if (cedula.value == "" || cedula.value == null || cedula.value == undefined ){
        swal("¡Error!","¡Ingrese un monto valido para los viajes en esta ruta!","error")
        return false;
    }
    if (telefono.value == "" || telefono.value == null || telefono.value == undefined ){
        swal("¡Error!","¡Ingrese un monto valido para los viajes en esta ruta!","error")
        return false;
    }


    var data = {
        iduser: Cemail.value,
        nombre: Cnombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        cedula: cedula.value,
        telefono: telefono.value,
        
        
    }
    console.log(data)
    

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "err"){
                return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
            }
            swal("¡Registrado!","Conductor Registrado Correctamente","success")
            .then(function(){window.location.assign('/viewsA/choferes/choferes.html')})
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/choferes/registrarchofer");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}