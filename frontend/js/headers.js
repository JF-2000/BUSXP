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
            
            <a href="/views/users/login.html"">Login</a>
            <a href="/views/users/registrar.html"">Register</a>

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
                <a class="ab" href="">${localStorage.getItem('uname')}</a>
            </nav>
        </div>
        `
        head.innerHTML = html;
    }

}

