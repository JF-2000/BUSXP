if(document.getElementById('head')){

    var head = document.getElementById('head')
    var html = `
    <div class="wrapper">    
        <div class="logo">BUSXP</div>
        <nav>
            <a class="ab" href="/index.html">Inicio</a>
            <a class="ab" href="/views/rutas/rutas.html">Rutas</a>
            <a class="ab" href="">Contactos</a>
            <a class="ab" href="">Nosotros</a>
            <a class="ab2" href="/views/users/login.html">Iniciar sesión</a>

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
                <a class="ab2" id="" href="">${localStorage.getItem('uname')}</a>
            </nav>
        </div>
        `
        head.innerHTML = html;
    }

}

