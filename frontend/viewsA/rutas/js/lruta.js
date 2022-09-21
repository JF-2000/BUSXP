const lrutas = document.getElementById("lrutas")

async function rutasL(){
    let rutas = [];
    await fetch(api+'/ruta/allrutas')
    .then(response => response.json())
    .then((data) => rutas = data);
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Ruta</th><th>Capacidad</th><th>Monto</th><th>Modificar</th><th>Activar/Desactivar</th></tr>`
    rutas.forEach(ruta => {
      html += 
      `<tr>
        <td>${ruta.idruta}</td>
        <td>${ruta.rutadesde} - ${ruta.rutahasta}</td>
        <td>${ruta.capacidad}</td>
        <td>RD$${ruta.monto}</td>
        <td style="width: 50px"><a href="/viewsA/rutas/mruta.html?r=${ruta.idruta}" class="btn btn3 btn-warning"><i class="fas fa-edit icofont"></i></a></td>`
        if(ruta.activo === 1){
          html += `<td style="width: 50px"><a href="#" onclick="activeruta(${ruta.idruta})" class="btn btn3 btn-danger"><i class="fas fa-trash-alt icofont"></i></a></td>`
        }
        if(ruta.activo === 0){
          html += `<td style="width: 50px"><a href="#" onclick="activeruta(${ruta.idruta})" class="btn btn3 btn-success"><i class="fas fa-check icofont"></i></a></td>`
        }
        
      html += `</tr>`
    });
    html += `</table>`
  
    lrutas.innerHTML = html;
}