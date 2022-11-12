const lhorarios = document.getElementById("lhorarios")

async function horariosL(){
    let horario = [];
    await fetch(api+'/hora/allhorario')
    .then(response => response.json())
    .then((data) => horario = data);
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Horario</th><th>Modificar</th><th>Activar/Desactivar</th></tr>`
    horario.forEach(hora => {

      html += 
      
      `<tr>
        <td>${hora.idhorario}</td>
        <td>${hora.hora}</td>
        <td style="width: 50px"><a href="/viewsA/horarios/mhorario.html?r=${hora.idhorario}" class="btn btn3 btn-warning"><i class="fas fa-edit icofont"></i></a></td>`
        if(hora.activo === 1){
          html += `<td style="width: 50px"><a href="#" onclick="activehora(${hora.idhorario})" class="btn btn3 btn-danger"><i class="fas fa-trash-alt icofont"></i></a></td>`
        }
        if(hora.activo === 0){
          html += `<td style="width: 50px"><a href="#" onclick="activehora(${hora.idhorario})" class="btn btn3 btn-success"><i class="fas fa-check icofont"></i></a></td>`
        }
        
      html += `</tr>`
    });
    html += `</table>`
    
    lhorarios.innerHTML = html;
}