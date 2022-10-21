async function listchoferes(){
    const lchoferes = document.getElementById('lchoferes')
    let choferes = [];
    var html = '';
    await fetch(api+`/choferes/allchoferes`)
    .then(response => response.json())
    .then((data) => choferes = data)
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Nombre/Apellido</th><th>Dirección</th><th>Identificación</th><th>Teléfono</th><th>Modificar</th><th>Asignar viajes</th><th>Activar/Desactivar</th></tr>`
    choferes.forEach(chofer => {
        html += 
        `<tr>
          <td>${chofer.idchofer}</td>
          <td>${chofer.nombre} ${chofer.apellido}</td>
          <td>${chofer.direccion}</td>
          <td>${chofer.identificacion}</td>
          <td>${chofer.telefono}</td>
          <td style="width: 50px"><a href="/viewsA/choferes/modificarC.html?c=${chofer.idchofer}" class="btn btn3 btn-warning"><i class="fas fa-edit icofont"></i></a>
          <td style="width: 50px"><a href="/viewsA/choferes/asignarviajes.html?c=${chofer.idchofer}" class="btn btn-primary"><i class="fas fa-clipboard-list icofont"></i></a>`
          if(chofer.activo === 1){
            html += `<td style="width: 50px"><a href="#" onclick="activechofer(${chofer.idchofer})" class="btn btn3 btn-danger"><i class="fas fa-trash-alt icofont"></i></a></td>`
          }
          if(chofer.activo === 0){
            html += `<td style="width: 50px"><a href="#" onclick="activechofer(${chofer.idchofer})" class="btn btn3 btn-success"><i class="fas fa-check icofont"></i></a></td>`
          }
          
          html += `</tr>`
      });
    html += '</table>'
    lchoferes.innerHTML = html;
}