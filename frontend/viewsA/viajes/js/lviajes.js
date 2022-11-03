const tviajes = document.getElementById('tviajes');
const mensaje = document.getElementById('msg');
var iviaje = 0;


async function Gviajes(){
  await fetch(api+'/viajes/allgenerar')
}

async function lviajes(){
  let viajes = [];
  var html = "";
  await fetch(api+'/viajes/allviajesA')
  .then(response => response.json())
  .then((data) => viajes = data);
  html = `<table class="table table-bordered" id="tab">
  <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Hora</th><th>Monto</th><th>Reportar</th><th>Modificar</th><th>Activar/Desactivar</th></tr>`
  viajes.forEach(viaje => {
    html += 
    `<tr>
      <td>${viaje.idviaje}</td>
      <td>${viaje.rutadesde} - ${viaje.rutahasta}</td>
      <td>${viaje.fcapacidad} / ${viaje.capacidad}</td>
      <td>${viaje.hora}</td>
      <td>RD$${viaje.monto}</td>
      <td style="width: 50px"><button class="btn btn3 btn-secondary" id="btnmodal" onclick="(msg(${viaje.idviaje}))"><i class="fas fa-exclamation-triangle"></i></button></td>
      <td style="width: 50px"><a href="/viewsA/viajes/mviajes.html?r=${viaje.idviaje}" class="btn btn3 btn-warning"><i class="fas fa-edit icofont"></i></a></td>`
      if(viaje.activo === 1){
        html += `<td style="width: 50px"><a href="#" onclick="activeviaje(${viaje.idviaje})" class="btn btn3 btn-danger"><i class="fas fa-trash-alt icofont"></i></a></td>`
      }
      if(viaje.activo === 0){
        html += `<td style="width: 50px"><a href="#" onclick="activeviaje(${viaje.idviaje})" class="btn btn3 btn-success"><i class="fas fa-check icofont"></i></a></td>`
      }
    html += `</tr>`
        
  });
  html += `</table>`

  tviajes.innerHTML = html;
        
}

function msg(id){
  
  document.getElementById('TI').textContent = 'Viaje ID#'+id;
  modal.style.display = "block";
  iviaje = id;
  mensaje.value = '';
}

document.getElementById('send').addEventListener('click',()=>{
  reporte()
})

async function reporte(){

  if(mensaje.value == '' || mensaje.value == null || mensaje.value == undefined || mensaje.value == 0){
    swal("¡Error!","¡El mensaje esta vacío!","error")
    return false;
  }

  var data = {
    viaje: iviaje,
    msg: mensaje.value
  }

  var xhr = new XMLHttpRequest();
     
  xhr.onreadystatechange = async function() {
    if (this.readyState == 4 && this.status == 200) {
      if(xhr.response == "err"){
        return swal("¡Error!","Ocurrio un problema con el mensaje","error") 
      }
      swal("¡Enviado!","El mensaje ha sido enviado a los usuarios programados para este viaje","success")
      .then(function(){modal.style.display = "none";})
    } 
  }

  xhr.onerror = function(){
    alert("Ocurrio un problema, por favor intentelo mas tarde.")
  };

  xhr.open("POST", api+"/correspondencia/reporteviaje");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
      
}
