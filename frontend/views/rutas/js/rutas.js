const trutas = document.getElementById('trutas')
let viajes = [];

var hora = document.getElementById('lhoras')
hora.addEventListener('change',renderviajes)

async function lhoras(){
  let horario = [];
  var html = '';
  await fetch(api+'/hora/horariolist')
  .then(response => response.json())
  .then((data) => horario = data);
      html = '<option value="0">TODOS</option>'
      horario.forEach(hora =>{
          html += `<option value="${hora.idhorario}">${hora.hora}</option>`
      })
  hora.innerHTML = html;
}

async function pviajes(){
  await fetch(api+'/viajes/allviajes')
  .then(response => response.json())
  .then((data) => viajes = data);
    setTimeout(renderviajes,1000)
}

async function renderviajes(){
  var filtrado = [];
  switch(hora.value){
    case '0':
        filtrado = viajes
    break
    case hora.value:
        filtrado = viajes.filter(function(d){
            return d.idhorario == hora.value
        })
    break
  }

  var html = "";
  html = `<table class="table table-bordered" id="tab">
  <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Hora</th><th>Monto</th><th>Comprar</th></tr>`
  filtrado.forEach(viaje => {
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

  if(document.getElementById("loader")){
    document.getElementById("loader").style.display = "none";
  }
}

