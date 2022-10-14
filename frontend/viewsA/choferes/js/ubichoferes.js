const choferes = document.getElementById('Choferes');
const numbc = document.getElementById('numbc');

var coord = {};
var locateChofer = [];

async function loadchoferes(){
  var html = '';
  await fetch(api+`/choferes/coordenadas`)
  .then(response => response.json())
  .then((data) => locateChofer = data)
    locateChofer.forEach(chofer => {
      html += `<option value="${chofer.idchofer}">${chofer.nombre} ${chofer.apellido}</option>`
    })
    choferes.innerHTML = html;

    coord = {lat:locateChofer[0].latitude, lng:locateChofer[0].longitude};
    numbc.textContent = locateChofer[0].telefono
    cviajes(locateChofer[0].idchofer);
    initMap();
    
}

async function cviajes(id){
  const lviajes = document.getElementById('lviajes')

  var misviajes = [];
  await fetch(api+`/choferes/misviajes/${id}`)
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

choferes.addEventListener('change', ()=>{
  var indx = choferes.value
  for(x=0; x < locateChofer.length; x++){
    if(locateChofer[x].idchofer == indx){
      coord = {lat:locateChofer[x].latitude, lng:locateChofer[x].longitude};
      numbc.textContent = locateChofer[x].telefono
      cviajes(indx);
      initMap();
    }
  }
})

async function initMap(){
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}

loadchoferes();