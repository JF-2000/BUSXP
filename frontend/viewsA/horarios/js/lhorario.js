const lhorarios = document.getElementById("lhorarios")

async function horariosL(){
    let horario = [];
    await fetch(api+'/hora/allhorario')
    .then(response => response.json())
    .then((data) => horario = data);
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Horario</th></tr>`
    horario.forEach(hora => {

      html += 
      
      `<tr>
        <td>${hora.idhorario}</td>
        <td>${hora.hora}</td>

      </tr>`
        // if(ruta.activo === 1){
        //   html += `<td style="width: 50px"><a href="#" onclick="activeruta(${ruta.idruta})" class="btn btn3 btn-danger"><i class="fas fa-trash-alt icofont"></i></a></td>`
        // }
        // if(ruta.activo === 0){
        //   html += `<td style="width: 50px"><a href="#" onclick="activeruta(${ruta.idruta})" class="btn btn3 btn-success"><i class="fas fa-check icofont"></i></a></td>`
        // }
        
      html += `</tr>`
    });
    html += `</table>`
  
    lhorarios.innerHTML = html;
}