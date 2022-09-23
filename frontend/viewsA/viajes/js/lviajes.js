const tviajes = document.getElementById('tviajes')

async function pviajes(){
  await fetch(api+'/viajes/allgenerar')
}

async function pviajes(){
  let viajes = [];
  var html = "";
  await fetch(api+'/viajes/allviajesA')
  .then(response => response.json())
  .then((data) => viajes = data);
  html = `<table class="table table-bordered" id="tab">
  <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Hora</th><th>Monto</th><th>Modificar</th><th>Activar/Desactivar</th></tr>`
  viajes.forEach(viaje => {
    html += 
    `<tr>
      <td>${viaje.idviaje}</td>
      <td>${viaje.rutadesde} - ${viaje.rutahasta}</td>
      <td>${viaje.fcapacidad} / ${viaje.capacidad}</td>
      <td>${viaje.hora}</td>
      <td>RD$${viaje.monto}</td>
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

