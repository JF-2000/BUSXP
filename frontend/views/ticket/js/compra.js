const url = window.location.search;
let searchParams = new URLSearchParams(url);
const viaje = searchParams.get('r');
var personas = document.getElementById('personas');
var vpay = false;
var total;
var maxcap = 0;
var cantpersonas;

async function ticket(){
    if(sessionStorage.getItem('max') == '1'){
        swal("¡Lo sentimos!","No hay cupos disponibles para este viaje, capacidad máxima alcanzada...","error")
        sessionStorage.removeItem('max')
    }
    if(sessionStorage.getItem('maxp') == '1'){
        swal("¡Lo sentimos!","Se ha sobrepasado la capacidad máxima del viaje...","error")
        sessionStorage.removeItem('maxp')
    }
    if(sessionStorage.getItem('zero') == '1'){
        swal("¡Lo sentimos!","La cantidad de personas no puede ser menor o igual a 0","error")
        sessionStorage.removeItem('zero')
    }
    if(sessionStorage.getItem('nouser') == '1'){
        swal("¡Lo sentimos!","No se detecta el usuario...","error")
        sessionStorage.removeItem('nouser')
    }
    if(sessionStorage.getItem('noviaje') == '1'){
        swal("¡Lo sentimos!","No se detecta el viaje...","error")
        sessionStorage.removeItem('noviaje')
    }
    const tique = document.getElementById('tique');
    inftique = [];
    html = "";
    await fetch(api+`/viajes/${viaje}`)
    .then(response => response.json())
    .then((data) => inftique = data);
    html = `
    <div class="form-row2">
        <div class="name">Ruta:</div>
        <div class="value">${inftique.rutadesde} - ${inftique.rutahasta}</div>
    </div>
    <div class="form-row2">
        <div class="name">Hora:</div>
        <div class="value">${inftique.hora}</div>
    </div>
    <div class="form-row2">
        <div class="name">Capacidad:</div>
        <div class="value">${inftique.fcapacidad} / ${inftique.capacidad}</div>
    </div>
    <div class="form-row2">
        <div class="name">Monto:</div>
        <div class="value">RD$${inftique.monto}</div>
    </div>
    `
    personas.value = 1;
    tique.innerHTML = html;
    maxcap = inftique.capacidad;
    BPayPal(inftique.monto);
}

personas.addEventListener('keyup',()=>{
    if(personas.value > maxcap){
        swal("¡Lo sentimos!","La cantidad de personas ingresadas superan la capacidad máxima del viaje.","error")
        .then(function(){personas.value=1}) 
    }
})
personas.addEventListener('change',()=>{
    if(personas.value <= 0){
        swal("¡Lo sentimos!","La cantidad de personas no pueder ser menor o igual a 0.","error")
        .then(function(){personas.value=1}) 
    }
})

function valideKey(e){
			
    var code = (e.which) ? e.which : e.keyCode;
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}


function BPayPal(m) {
    
    paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
        
    },

    createOrder: function(data, actions) {
        total = Math.round((m*personas.value) / 54);
        vpay = true;
        var data = {
            viaje: viaje,
            personas: personas.value,
            iduser: localStorage.getItem('uid')
        }

        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(xhr.response == "max"){
                    vpay = false;
                    sessionStorage.setItem('max','1')
                    return window.location.reload()
                    
                }
                if(xhr.response == "maxp"){
                    vpay = false;
                    sessionStorage.setItem('maxp','1')
                    return window.location.reload()
                    
                }
                if(xhr.response == "zero"){
                    vpay = false;
                    sessionStorage.setItem('zero','1')
                    return window.location.reload()
                    
                }
                if(xhr.response == "noviaje"){
                    vpay = false;
                    sessionStorage.setItem('noviaje','1')
                    return window.location.reload()
                    
                }
                if(xhr.response == "nouser"){
                    vpay = false;
                    sessionStorage.setItem('nouser','1')
                    return window.location.reload()
                    
                }
                return true;
            }
        }

        xhr.onerror = function(){
            alert("Ocurrio un problema, por favor intentelo mas tarde.")
        };

        xhr.open("POST", api+"/viajes/max");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));
        
        return actions.order.create({
            purchase_units: [{
                description: `Compra de ticket con valor de ${personas.value} personas por el monto de RD$${m} cada persona.`,
                amount:{
                    value: total,
                    currency:  'USD'
                },
            }]
        });

    },

    onApprove: function(data, actions) {
        vpay = false;
        return actions.order.capture().then(function(orderData) {
        
        // Full available details
        // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        var dataspay = JSON.stringify(orderData)
        var datapay = JSON.parse(dataspay)

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';
        element.innerHTML = '<h3>Gracias por su compra!</h3>';

        // Or go to another URL:  actions.redirect('thank_you.html');

        var data = {
            idviaje: viaje,
            personas: personas.value,
            iduser: localStorage.getItem('uid'),
            idpay: datapay.id,
            total: m*personas.value
        }

        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                swal("¡Gracias por su compra!","Pago realizado!","success")
                .then(function(){window.location.assign('/views/rutas/rutas.html')}) 
            }
        }

        xhr.onerror = function(){
            alert("Ocurrio un problema, por favor intentelo mas tarde.")
        };

        xhr.open("POST", api+"/ticket/compra");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));

        });
        
    },

    onCancel: function(data){
        if(vpay == true){
            vpay = false;
            var data = {
                viaje: viaje,
                personas: personas.value
            }
    
            var xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    swal("¡Cancelado!","Ha cancelado la orden...","error")
                    .then(function(){window.location.assign('/views/rutas/rutas.html')}) 
                }
            }
    
            xhr.onerror = function(){
                alert("Ocurrio un problema, por favor intentelo mas tarde.")
            };
    
            xhr.open("POST", api+"/viajes/res");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
    
            xhr.send(JSON.stringify(data));
        }

    },

    onError: function(err) {
        if(vpay == true){
            eliminarpuesto();
            vpay = false;
            swal("¡Error!",`${err}`,"error")
        }
        swal("¡Error!",`${err}`,"error")
    }
    }).render('#paypal-button-container');
}


window.addEventListener("beforeunload", (evento) => {
    if (vpay == true) {
        vpay = false;
        evento.preventDefault();
        evento.returnValue = "";
        setTimeout(cerrarpag,2000);
        eliminarpuesto();
        return "";
    }
});

async function eliminarpuesto(){
    var data = {
        viaje: viaje,
        personas: personas.value
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", api+"/viajes/res");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function cerrarpag(){
    window.close(this.window)
}
