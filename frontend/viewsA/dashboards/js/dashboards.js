const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Ganancias x Rutas', 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        
    }


});
let url ='http://localhost:3000/charts/totalxruta'
fetch(url)
    .then(response => response.json())
    .then(datos => mostrar (datos))
    .catch(error => console.log(error))

const mostrar = (totales) =>{
    totales.forEach(element => {
        myChart.data['labels'].push(element.ruta)
        myChart.data['datasets'][0].data.push(element.Total)
    });


}

const ctx2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Ganancias Mensuales', 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        
    }


});
let url2 ='http://localhost:3000/charts/totales'
fetch(url2)
    .then(response => response.json())
    .then(datos => mostrar2 (datos))
    .catch(error => console.log(error))

const mostrar2 = (totales) =>{
    totales.forEach(element => {
        myChart2.data['labels'].push(element.Fecha)
        myChart2.data['datasets'][0].data.push(element.Total)
    });


}