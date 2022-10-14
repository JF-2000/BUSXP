


async function initMap(){
    // var locateChofer = [];
    // await fetch(api+`/choferes/ubicacion/${idC}`)
    // .then(response => response.json())
    // .then((data) => locateChofer = data)

    var coord = {lat:19.2307807 ,lng:-70.544498};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}