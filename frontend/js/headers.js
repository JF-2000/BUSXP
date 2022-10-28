if(document.getElementById('head')){

    var head = document.getElementById('head')
    var html = `
    <div class="wrapper">    
        <div class="logo">BUSXP</div>
        <nav>
            <a class="ab" href="/index.html">Inicio</a>
            <a class="ab" href="/views/rutas/viajes.html">Rutas</a>
            <a class="ab" href="/contacto.html">Contactos</a>
            <a class="ab" href="/nosotros.html">Nosotros</a>
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
                <a class="ab" href="/contacto.html">Contactos</a>
                <a class="ab" href="/nosotros.html">Nosotros</a>
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

    var _0xe990=["\x75\x61\x75\x74\x68","\x67\x65\x74\x49\x74\x65\x6D","\x61\x64\x6D"];if(localStorage[_0xe990[1]](_0xe990[0])== _0xe990[2]){
        var head = document.getElementById('head')
        var html = `
        <div class="wrapper">    
            <div class="logo">BUSXP</div>
            <nav>
                <a class="ab" href="/viewsA/dashboards/dashboards.html">Graficos</a>
                <a class="ab" href="/viewsA/reportes/reportes.html">Reportes</a>
                <a class="ab" href="/viewsA/usuarios/usuarios.html">Usuarios</a>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>Choferes <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
                            <li><a href="/viewsA/choferes/choferes.html">Choferes</a></li>
                            <li><a href="/viewsA/choferes/ubichoferes.html">Ubicación choferes</a></li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>Rutas <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
                            <li><a href="/viewsA/rutas/lruta.html">Rutas</a></li>
                            <li><a href="/viewsA/horarios/lhorario.html">Horarios</a></li>
                            <li><a href="/viewsA/viajes/lviajes.html">Viajes</a></li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>${localStorage.getItem('uname')} <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
                            <li><a href="" id="CS">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
        `
        head.innerHTML = html;
    }

    var _0xc02f=["\x75\x61\x75\x74\x68","\x67\x65\x74\x49\x74\x65\x6D","\x63\x68\x6F\x66"];if(localStorage[_0xc02f[1]](_0xc02f[0])== _0xc02f[2]){
        var head = document.getElementById('head')
        var html = `
        <div class="wrapper">    
            <div class="logo">BUSXP</div>
            <nav>
                <a class="ab" href="/viewsC//misviajes.html">Mis viajes</a>
                <a class="ab" href="/viewsC/validacion.html">Verificar tickets</a>
                <div class="dropdown" data-dropdown>
                    <a class="dropmenu link" data-dropdown-button>${localStorage.getItem('uname')} <i class="fas fa-caret-square-down"></i></a>
                    <div class="dropdown-menu">
                        <ul>
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

