async function listchoferes(){
    const lchoferes = document.getElementById('lchoferes')
    let choferes = [];
    var html = '';
    await fetch(api+`/choferes/allchoferes`)
    .then(response => response.json())
    .then((data) => choferes = data)
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Nombre/Apellido</th><th>Dirección</th><th>Identificación</th><th>Teléfono</th><th>Asignar viajes</th></tr>`
    choferes.forEach(chofer => {
        html += 
        `<tr>
          <td>${chofer.idchofer}</td>
          <td>${chofer.nombre} ${chofer.apellido}</td>
          <td>${chofer.direccion}</td>
          <td>${chofer.identificacion}</td>
          <td>${chofer.telefono}</td>
          <td style="width: 50px"><a href="/viewsA/choferes/asignarviajes.html?c=${chofer.idchofer}" class="btn btn-primary"><i class="fas fa-clipboard-list icofont"></i></a>
        </tr>`
      });
    html += '</table>'
    lchoferes.innerHTML = html;
}