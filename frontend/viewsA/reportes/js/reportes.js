const lreportes = document.getElementById("reportes")
const desde = document.getElementById("desde")
const hasta = document.getElementById("hasta")


async function reportesL(){
    let reportes = [];
    await fetch(api+'/charts/reportes')
    .then(response => response.json())
    .then((data) => reportes = data);
    html = `<table class="table table-bordered" id="tab">
    <tr><th>ID</th><th>Ruta</th><th>Hora Viaje</th><th>Fecha Viaje</th><th>Total Viaje</th><th>Cantidad de Pasajeros</th></tr>`
    reportes.forEach(reporte => {
      html += 
      `<tr>
        <td>${reporte.Ticket_Id}</td>
        <td>${reporte.Ruta}</td>
        <td>${reporte.Hora}</td>
        <td>${reporte.Fecha}</td>
        <td>$${reporte.Total}</td>
        <td>${reporte.Cant}</td>`
      html += `</tr>`

    });
    html += `</table>`
  
    lreportes.innerHTML = html;
}


function printDiv() {
    var divContents = document.getElementById("reportes").innerHTML;
    var a = window.open('', '', 'height=800, width=800');
    a.document.write('<html>');
    a.document.write('<body > <h1>Reporte de Venta de Tickets<br>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();}



    document.getElementById('generar').addEventListener('click',(e)=>{
      e.preventDefault();
      generar();
      console.log(desde.value)
      console.log(hasta.value)

  })
  
  async function generar(){
  
  
      if(desde.value == "" || desde.value == null || desde.value == undefined){
          swal("¡Error!","¡Ingrese una Fecha Correcta!","error")
          return false;
      }
      if(hasta.value == "" || hasta.value == null || hasta.value == undefined){
          swal("¡Error!","¡Ingrese una Fecha Correcta!","error")
          return false;
      }
  
      var data = {
          desde: desde.value,
          hasta: hasta.value,  
      }
      
  
      var xhr = new XMLHttpRequest();
         
  
      xhr.onerror = function(){
          alert("Ocurrio un problema, por favor intentelo mas tarde.")
      };
      

      xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
      };

      xhr.open("POST", api+"/charts/reportesG");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.send(JSON.stringify(data));
          
  }