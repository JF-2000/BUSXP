const funcionInit = () => {
    
	if (!"geolocation" in navigator) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
	}

	const onUbicacionConcedida = async ubicacion => {
        var data = {
            id: localStorage.getItem('uid'),
            latitude: ubicacion.coords.latitude,
            longitude: ubicacion.coords.longitude
        }
    
        var xhr = new XMLHttpRequest();
           
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(xhr.response == "err"){
                    return swal("¡Error!","Al guardar las coordenadas","error") 
                }
            }
        }
    
        xhr.onerror = function(){
            alert("Ocurrio un problema, por favor intentelo mas tarde.")
        };
    
        xhr.open("POST", api+"/choferes/ubicacion");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(JSON.stringify(data));
	}
  
	const onErrorDeUbicacion = err => {
		console.log("Error obteniendo ubicación: ", err);
	}

	const opcionesDeSolicitud = {
		enableHighAccuracy: true, // Alta precisión
		maximumAge: 0, // No queremos caché
		timeout: 2000 // Esperar solo 2 segundos
	};
	// Solicitar

	navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);


};
funcionInit()
// setInterval(funcionInit,15000) 