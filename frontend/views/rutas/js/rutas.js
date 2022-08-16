const trutas = document.getElementById('trutas')

async function prutas(){
    await fetch(api+'/viajes/allgenerar')
}

async function pviajes(){
    let viajes = [];
    var html = "";
    await fetch(api+'/viajes/allviajes')
    .then(response => response.json())
    .then((data) => viajes = data);
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Hora</th><th>Monto</th><th>Comprar</th></tr>`
    viajes.forEach(viaje => {
      html += 
      `<tr>
        <td>${viaje.idviaje}</td>
        <td>${viaje.rutadesde} - ${viaje.rutahasta}</td>
        <td>${viaje.fcapacidad} / ${viaje.capacidad}</td>
        <td>${viaje.hora}</td>
        <td>RD$${viaje.monto}</td>
        <td style="width: 50px"><a href="/views/ticket/ticket.html?r=${viaje.idviaje}" class="btn btn-success"><i class="fas fa-dollar-sign icofont"></i></a>
      </tr>`
    });
    html += `</table>`
  
    trutas.innerHTML = html;
        
}
