if(document.getElementById('head')){

    var head = document.getElementById('head')
    var html = `
    <div class="wrapper">    
        <div class="logo">BUSXP</div>
        <nav>
            <a class="ab" href="/index.html">Inicio</a>
            <a class="ab" href="/views/rutas/viajes.html">Rutas</a>
            <a class="ab" href="">Contactos</a>
            <a class="ab" href="">Nosotros</a>
            <a class="ab" href="/views/users/login.html">Iniciar sesión</a>

        </nav>
    </div>
    `
    head.innerHTML = html;

    if(localStorage.getItem('uname')){
        var head = document.getElementById('head')
        var html = `
        <div class="wrapper">    
            <div class="logo">BUSXP</div>
            <nav>
                <a class="ab" href="/index.html">Inicio</a>
                <a class="ab" href="/views/rutas/rutas.html">Rutas</a>
                <a class="ab" href="">Contactos</a>
                <a class="ab" href="">Nosotros</a>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>${localStorage.getItem('uname')} <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
                            <li><a href="/views/users/ticketinv.html">Tickets</a></li>
                            <li><a href="" id="CS">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
        `
        head.innerHTML = html;

    }

    if(localStorage.getItem('uauth') == 'adm'){
        var head = document.getElementById('head')
        var html = `
        <div class="wrapper">    
            <div class="logo">BUSXP</div>
            <nav>
                <a class="ab" href="/index.html">Inicio</a>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>Rutas <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
                            <li><a href="/viewsA/rutas/lruta.html">Rutas</a></li>
                            <li><a href="/viewsA/horarios/lhorario.html">Horarios</a></li>
                            <li><a href="">Viajes</a></li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>${localStorage.getItem('uname')} <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
                            <li><a href="/views/users/ticketinv.html">Tickets</a></li>
                            <li><a href="" id="CS">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
        `
        head.innerHTML = html;

    }

}

document.addEventListener("click", e => {
    const isdropbutton = e.target.matches("[data-dropdown-button]");
    if(!isdropbutton && e.target.closest("[data-dropdown]") != null) return 

    let currentdrop
    if(isdropbutton){
        currentdrop = e.target.closest("[data-dropdown]")
        currentdrop.classList.toggle("active")
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if(dropdown === currentdrop) return
        dropdown.classList.remove("active")
    })
})

if(document.getElementById('CS')){
    document.getElementById('CS').addEventListener('click', e =>{
        localStorage.clear();
    })
}

