async function tickets(){
    const ltickets = document.getElementById('ltickets');
    var tickets = [];
    var html = '';
    await fetch(api+`/ticket/inv/${localStorage.getItem('uid')}`)
    .then(response => response.json())
    .then((data) => tickets = data);
    html = `<div class="row">`
    tickets.forEach(ticket=>{
        html += 
        `<div class="card-2 col-4"> 
            <div class="card-heading"><label class="title3">Tickets #${ticket.idticket}</label></div>
            <div style="padding: 15px;">
               <label class="titulo">Comprado en: </label><br>
               <label>${ticket.fechac} | ${ticket.horac}</label><br>
               <label class="titulo">Ruta: </label><br>
               <label>${ticket.rutadesde} - ${ticket.rutahasta}</label><br>
               <label class="titulo">Hora: </label><br><label>${ticket.horat}</label><br>
               <label class="titulo">Personas: </label><br><label>${ticket.personas}</label><br>
               <label class="titulo">Total: </label><br><label>RD$${ticket.total}</label><br>
            </div>
        </div>`
    });
    html += `</div>`

    ltickets.innerHTML = html;
        
}