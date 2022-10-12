const url = window.location.search;
let searchParams = new URLSearchParams(url);
const ichofer = searchParams.get('r');

var emailc = document.getElementById('emailc');
var nombreC = document.getElementById('nombre');

let names = [];


async function choferselect(){
    var html = '';
    let choferes = [];
    
    await fetch(api+`/choferes/uchoferes`)
    .then(response => response.json())
    .then((data) => choferes = data)
        choferes.forEach(chofer => {
            html += `<option value="${chofer.iduser}">${chofer.email}</option>`
            names.push(chofer.iduser, chofer.nombre)
        })
        emailc.innerHTML = html;
        nombreC.value = choferes[0].nombre

} 

