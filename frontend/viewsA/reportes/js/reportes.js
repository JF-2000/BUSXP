const lreportes = document.getElementById("reportes")

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