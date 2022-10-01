var arraytickets = [];
var tiks = 0;


async function tickets(){
    const ltickets = document.getElementById('ltickets');
    var tickets = [];
    var html = '';
    await fetch(api+`/ticket/inv/${localStorage.getItem('uid')}`)
    .then(response => response.json())
    .then((data) => tickets = data);
    html = `<div class="row">`
    tickets.datos.forEach(ticket=>{
        html += 
        `<div class="card-2 col-4"> 
            <div class="card-heading"><label class="title3">Tickets #${ticket.idticket}</label></div>
            <div style="padding: 15px;">
               <label class="titulo">Comprado el: </label><br>
               <label>${ticket.fechac} | ${ticket.horac}</label><br>
               <label class="titulo">Ruta: </label><br>
               <label>${ticket.rutadesde} - ${ticket.rutahasta}</label><br>
               <label class="titulo">Hora: </label><br><label>${ticket.horat}</label><br>
               <label class="titulo">Personas: </label><br><label>${ticket.personas}</label><br>
               <label class="titulo">Total: </label><br><label>RD$${ticket.total}</label><br><br>
               <button class="btn btn-primary" id="btnmodal" onclick="(qrticket(${tiks}))">Seleccionar</button><br>
            </div>
        </div>`
        arraytickets.push([ticket.idticket,ticket.fechac,ticket.horac,ticket.rutadesde,ticket.rutahasta,ticket.horat,ticket.personas,ticket.total,tickets.vkeys[tiks]])
        tiks = tiks + 1
    });
    html += `</div>`

    ltickets.innerHTML = html;
        
}

async function qrticket(tickt){

    modal.style.display = "block";
    const ticket = document.getElementById('ticketselected');
    const TI = document.getElementById('TI')
    TI.textContent = `Tickets #${arraytickets[tickt][0]}`
    var html = '';
    html += 
    `<div style="padding: 15px;">
        <label class="titulo">Comprado el: </label><br>
        <label>${arraytickets[tickt][1]} | ${arraytickets[tickt][2]}</label><br>
        <label class="titulo">Ruta: </label><br>
        <label>${arraytickets[tickt][3]} - ${arraytickets[tickt][4]}</label><br>
        <label class="titulo">Hora: </label><br><label>${arraytickets[tickt][5]}</label><br>
        <label class="titulo">Personas: </label><br><label>${arraytickets[tickt][6]}</label><br>
        <label class="titulo">Total: </label><br><label>RD$${arraytickets[tickt][7]}</label><br><br>
    </div>`
    ticket.innerHTML = html;

    if(document.querySelector('#qr-code').childElementCount <= 1){
        document.querySelector('#qr-code').innerHTML = "";
        QrCreator.render({
            text: arraytickets[tickt][8],
            radius: 0.5, // 0.0 to 0.5
            ecLevel: 'H', // L, M, Q, H
            fill: '#000000', // foreground color
            background: null, // color or null for transparent
            size: 500 // in pixels
        }, document.querySelector('#qr-code'));
    }
}