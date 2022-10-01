import QrScanner from "../../js/node_modules/qr-scanner/qr-scanner.min.js";

const video = document.getElementById('qr-video');
const ticket = document.getElementById('ticket')

async function setResult(result) {

    var data = {
        iduser: localStorage.getItem('uid'),
        code: result.data
    }

    scanner.stop();

    var xhr = new XMLHttpRequest();
        
    xhr.onreadystatechange = function() {
        var dato = "";
        var arrticket = "";
        var infticket = "";

        if (this.readyState == 4 && this.status == 200) {
            if(xhr.response == "noexist"){  
                return swal("¡Error!","Este ticket no exite...","error")
                .then(function(){
                    ticket.innerHTML = "";
                    scanner.start()
                }) 
            }
            if(xhr.response == "used"){  
                return swal("¡Disculpa!","Este ticket ya ha sido utilizado...","warning")
                .then(function(){
                    ticket.innerHTML = "";
                    scanner.start()
                }) 
            }
            if(xhr.response == "nochofer"){  
                return swal("¡Disculpa!","No estas registrado como chofer!","warning")
                .then(function(){
                    ticket.innerHTML = "";
                    localStorage.clear();
                    window.location.assign('/views/users/login.html')
                }) 
            }

            dato = xhr.response
            arrticket = JSON.parse(dato)
            infticket = arrticket[0]
            let html = "";

            swal('¡Verificado!',
            `\n Comprado el: ${infticket.fechac} | ${infticket.horac}.
            \n Ruta: ${infticket.rutadesde} - ${infticket.rutahasta}.
            \n Hora: ${infticket.horat}.
            \n Personas: ${infticket.personas}.
            \n Total: RD$${infticket.total}. `
            ,'success')
            .then(function(){
                html = `<div class="card-2 col-4"> 
                        <div class="card-heading"><label class="title3">Ticket</label></div>
                        <div style="padding: 15px;">
                        <label class="titulo">Comprado el: </label><br>
                        <label>${infticket.fechac} | ${infticket.horac}</label><br>
                        <label class="titulo">Ruta: </label><br>
                        <label>${infticket.rutadesde} - ${infticket.rutahasta}</label><br>
                        <label class="titulo">Hora: </label><br><label>${infticket.horat}</label><br>
                        <label class="titulo">Personas: </label><br><label>${infticket.personas}</label><br>
                        <label class="titulo">Total: </label><br><label>RD$${infticket.total}</label><br><br>
                        <button class="btn btn-success""><i class="fas fa-check" icofont></i></button><br>
                        </div>
                    </div>`
                ticket.innerHTML = html;
                scanner.start()
            }) 
        }
    }

    xhr.onerror = function(){
        alert("Ocurrio un problema, por favor intentelo mas tarde.")
    };

    xhr.open("POST", api+"/verificar/verificarticket");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));

}

// ####### Web Cam Scanning #######

const scanner = new QrScanner(video, result => setResult(result), {
    highlightScanRegion: true,
    highlightCodeOutline: true,
});

scanner.start()
// for debugging
window.scanner = scanner;



