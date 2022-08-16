const url = window.location.search;
let searchParams = new URLSearchParams(url);
const viaje = searchParams.get('r');

async function ticket(){
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
        <div class="name">Horario:</div>
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
    tique.innerHTML = html;
    BPayPal(inftique.monto);
}

function BPayPal(m) {
    var precio = m / 54
    paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
        
    },

    createOrder: function(data, actions) {
        return actions.order.create({
        purchase_units: [{
            amount:{
                value: precio
            }
        }]
        });
    },

    onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
        
        // Full available details
        // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';
        element.innerHTML = '<h3>Gracias por su compra!</h3>';

        // Or go to another URL:  actions.redirect('thank_you.html');
        
        });
    },

    onCancel: function(data){

    },

    onError: function(err) {
        console.log(err);
    }
    }).render('#paypal-button-container');
}



function pago(){

}