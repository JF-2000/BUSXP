const lusuarios = document.getElementById("lusuarios")

async function usuariosL(){
    let usuarios = [];
    await fetch(api+'/Allusuarios')
    .then(response => response.json())
    .then((data) => usuarios = data);
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Usuarios</th><th>Email</th><th>Auth</th><th>Activar/Desactivar</th></tr>`
    usuarios.forEach(usuario => {

      html += 
      
      `<tr>
        <td>${usuario.iduser}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td style="width: 50px"><a href="/viewsA/horarios/mhorario.html?r=${usuario.iduser}" class="btn btn3 btn-warning"><i class="fas fa-edit icofont"></i></a></td>`
        if(usuario.activo === 1){
          html += `<td style="width: 50px"><a href="#" onclick="activeuser(${usuario.iduser})" class="btn btn3 btn-danger"><i class="fas fa-trash-alt icofont"></i></a></td>`
        }
        if(usuario.activo === 0){
          html += `<td style="width: 50px"><a href="#" onclick="activeuser(${usuario.iduser})" class="btn btn3 btn-success"><i class="fas fa-check icofont"></i></a></td>`
        }
        
      html += `</tr>`
    });
    html += `</table>`
    
    lusuarios.innerHTML = html;
}