async function mrutas(){
    const lviajes = document.getElementById('lviajes')

    var misviajes = [];
    await fetch(api+`/choferes/misviajes/${localStorage.getItem('uid')}`)
    .then(response => response.json())
    .then((data) => misviajes = data)
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Hora</th><th>Monto</th></tr>`
    misviajes.forEach(viaje => {
      html += 
      `<tr>
        <td>${viaje.idviaje}</td>
        <td>${viaje.rutadesde} - ${viaje.rutahasta}</td>
        <td>${viaje.fcapacidad} / ${viaje.capacidad}</td>
        <td>${viaje.hora}</td>
        <td>RD$${viaje.monto}</td>
      </tr>`
    });
    html += `</table>`
  
    lviajes.innerHTML = html;
}