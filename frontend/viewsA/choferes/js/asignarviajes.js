const url = window.location.search;
let searchParams = new URLSearchParams(url);
const ichofer = searchParams.get('c');

var arrayviaje = [];
var basignar = document.getElementById('asiviajes');

async function viajes(){
    const lviajes = document.getElementById('lviajes')
    let viajes = [];
    var html = '';
    await fetch(api+`/choferes/viajeschofer/${ichofer}`)
    .then(response => response.json())
    .then((data) => viajes = data)
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Hora</th><th>Asignar</th></tr>`
    viajes.forEach(viaje => {
        html += 
        `<tr>
          <td>${viaje.idviaje}</td>
          <td>${viaje.rutadesde} - ${viaje.rutahasta}</td>
          <td>${viaje.capacidad}</td>
          <td>${viaje.hora}</td>`
          if(viaje.idchofer != ichofer){
            html +=`<td style="width: 20px;"><i onclick="asignar(${viaje.idviaje})" class="bsv btn btn-success fas fa-user-plus"></i></td>
            </tr>`
          }
          if(viaje.idchofer == ichofer){
            html +=`<td style="width: 20px"><i onclick="asignar(${viaje.idviaje})" class="bsv btn btn-danger fas fa-user-minus"></i></td>
            </tr>`
            arrayviaje.push(viaje.idviaje)
          }
      });
    html += '</table>'
    lviajes.innerHTML = html;



    document.querySelectorAll(".bsv").forEach(el => {
        el.addEventListener("click", e => {
            var clas = e.target.getAttribute("class");
            if(clas == 'bsv btn btn-success fas fa-user-plus'){
                e.target.setAttribute("class",'bsv btn btn-danger fas fa-user-minus');
            }
            if(clas == 'bsv btn btn-danger fas fa-user-minus'){
                e.target.setAttribute("class",'bsv btn btn-success fas fa-user-plus');
            }
        });
      
    });
}

function botonasi(){
    if(arrayviaje.length <= 0){
        basignar.style.display = 'none'
    }
    if(arrayviaje.length > 0){
        basignar.style.display = 'inline-block'
    }
}

function asignar(v){    
    if(arrayviaje.includes(v) != true){
        arrayviaje.push(v)
    }
    else if(arrayviaje.includes(v) == true){
        var indice = arrayviaje.indexOf(v);
        arrayviaje.splice(indice, 1);
    }
    botonasi();
}

basignar.addEventListener('click', ()=>{
    Asignarviajes();
})

async function Asignarviajes(){
    var data = {
        id: ichofer,
        viajes: arrayviaje
    }

    var xhr = new XMLHttpRequest();
       
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            swal("¡Registrado!","Verifique el mensaje de validación enviado a su correo.","success")
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/choferes/asignarviaje");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
        
}
