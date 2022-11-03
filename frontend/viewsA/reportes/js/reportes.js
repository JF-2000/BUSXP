const lreportes = document.getElementById("reportes")
const desde = document.getElementById("desde")
const hasta = document.getElementById("hasta")
const intcoma = new Intl.NumberFormat('en-US');
var tprint = [];
var totalsum = 0;

function fecha(){
  var mespass = new Date()
  desde.value = new Date(mespass.setMonth(mespass.getMonth()-1)).toISOString().slice(0,10);
  hasta.value = new Date().toISOString().slice(0,10);
  generar()
}

desde.addEventListener('change', ()=>{
  generar()
});
hasta.addEventListener('change', ()=>{
  generar()
});

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
    hasta: hasta.value  
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(xhr.response == "err"){
        return swal("¡Error!","Ha sucedido un problema con los datos...","error") 
      }
      let reportes = [];
      tprint = [];
      totalsum = 0;
      var html = '';
      reportes = JSON.parse(xhr.response)
      html = `<table class="table table-bordered" id="tab">
      <tr><th>ID</th><th>Ruta</th><th>Hora del viaje</th><th>Fecha de compra</th><th>Personas</th><th>Total</th></tr>`
      reportes.forEach(reporte => {
        html += 
        `<tr>
          <td>${reporte.Ticket_Id}</td>
          <td>${reporte.Ruta}</td>
          <td>${reporte.Hora}</td>
          <td>${reporte.Fecha}</td>
          <td>${reporte.Cant}</td>
          <td>RD$${intcoma.format(reporte.Total)}</td>
        </tr>`
        tprint.push([reporte.Ticket_Id,reporte.Ruta,reporte.Hora,reporte.Fecha,reporte.Cant,intcoma.format(reporte.Total)])
        totalsum = totalsum + reporte.Total
      });
      html += `<tr>
      <th colspan="3">Total ventas de este período:</th>
      <th colspan="3">RD$${intcoma.format(totalsum)}</th>
      </tr>
      </table>`
      lreportes.innerHTML = html;
    }
  }

  xhr.onerror = function(){
    alert("Ocurrio un problema, por favor intentelo mas tarde.")
  };

  xhr.open("POST", api+"/charts/reportesG");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
        
}

function printDiv() {
  var hoy = new Date();
  var a = window.open('', '', 'height=800, width=800');
  a.document.write('<html>');
  a.document.write(`<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="/style/style.css">`);
  a.document.write('</head><body>');
  a.document.write(`<div class="row">
    <div class="col-10">
      <h3>Reporte de venta de tickets del ${desde.value} al ${hasta.value}</h3>
    </div>
    <div class="col-2">
      <div>${hoy.toLocaleDateString('en-US')}</div>
      <div>${hoy.toLocaleTimeString('en-US')}</div>
    </div>
    </div><br>`)
  a.document.write(`<table class="table table-bordered" id="tab">
  <tr><th>ID</th><th>Ruta</th><th>Hora del viaje</th><th>Fecha de compra</th><th>Personas</th><th>Total</th></tr>`);
  for(var i = 0; i < tprint.length; i++){
    a.document.write(`<tr>
    <td>${tprint[i][0]}</td>
    <td>${tprint[i][1]}</td>
    <td>${tprint[i][2]}</td>
    <td>${tprint[i][3]}</td>
    <td>${tprint[i][4]}</td>
    <td>RD$${tprint[i][5]}</td>
    </tr>`)
  }
  a.document.write(`
  <tr>
    <th COLSPAN=3>Total ventas de este período:</th>
    <th COLSPAN=3>RD$${intcoma.format(totalsum)}</th>
  </tr>
  </table>`);
  a.document.write('</body></html>');
  a.focus();
  a.print();
  a.close();
  return true;
}
  