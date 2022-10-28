

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [

        ],
        datasets: [{
            data: [
                
            ],
            label: 'Ganancias x Rutas', 
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
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
        }, plugins: {
            title: {
                display: true,
                text: 'Ganancias por Rutas'
            }
        } 
        
    }


});
let url ='http://localhost:3000/charts/totalxruta'
fetch(url)
    .then(response => response.json())
    .then(datos => mostrar (datos))
    .catch(error => console.log(error))

const mostrar = (totales) =>{
    totales.forEach(element => {
        myChart.data['labels'].push(element.Ruta)
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
                'rgba(250, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
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
        plugins: {
            title: {
                display: true,
                text: 'Ventas Mensuales'
            }
        } 
        
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


};

const ctx3 = document.getElementById('myChart3').getContext('2d');
const myChart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['Rutas'],
        datasets: [{
            data: ['Rutas'], 
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
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
        plugins: {
            title: {
                display: true,
                text: 'Rutas Más Solicitadas'
            }
        } 
    }


});
let url3 ='http://localhost:3000/charts/rutasmv'
fetch(url3)
    .then(response => response.json())
    .then(datos => mostrar3 (datos))
    .catch(error => console.log(error))

const mostrar3 = (totales) =>{
    totales.forEach(element => {
        myChart3.data['labels'].push(element.Ruta)
        myChart3.data['datasets'][0].data.push(element.Cant)
    });
    

};

const ctx4 = document.getElementById('myChart4').getContext('2d');
const myChart4 = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: [0],
        datasets: [{
            data: [0],
            label: 'Rutas Mas Vendidas', 
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 4
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Horarios Más Transcurridas'
            }
        }  
    }


});
let url4 ='http://localhost:3000/charts/horasmc'
fetch(url4)
    .then(response => response.json())
    .then(datos => mostrar4 (datos))
    .catch(error => console.log(error))

const mostrar4 = (totales) =>{
    totales.forEach(element => {
        myChart4.data['labels'].push(element.Hora)
        myChart4.data['datasets'][0].data.push(element.Cant)
    });
    

}

const ctx5 = document.getElementById('myChart5').getContext('2d');
const myChart5 = new Chart(ctx5, {
    type: 'pie',
    data: {
        labels: ['Conductores Activos', 'Conductores Inactivos'],
        datasets: [{
            data: [],
            label: 'Rutas Mas Vendidas', 
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
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
        plugins: {
            title: {
                display: true,
                text: 'Conductores'
            }
        }  
    }


});
let url5 ='http://localhost:3000/charts/choferesA'
fetch(url5)
    .then(response => response.json())
    .then(datos => mostrar5 (datos))
    .catch(error => console.log(error))

const mostrar5 = (totales) =>{
    totales.forEach(element => {
        // myChart5.data['labels'].push(element.Conductores)
        myChart5.data['datasets'][0].data.push(element.Cant)
    });
    

}

const ctx6 = document.getElementById('myChart6').getContext('2d');
const myChart6 = new Chart(ctx6, {
    type: 'pie',
    data: {
        labels: ['Usuarios Activos', 'Usuarios Inactivos'],
        datasets: [{
            data: [],
            label: 'Rutas Mas Vendidas', 
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
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
        plugins: {
            title: {
                display: true,
                text: 'Usuarios'
            }
        }  
    }


});
let url6 ='http://localhost:3000/charts/usuariosA'
fetch(url6)
    .then(response => response.json())
    .then(datos => mostrar6 (datos))
    .catch(error => console.log(error))

const mostrar6 = (totales) =>{
    totales.forEach(element => {
        // myChart5.data['labels'].push(element.Conductores)
        myChart6.data['datasets'][0].data.push(element.Cant)
    });
    

}
const ctx7 = document.getElementById('myChart7').getContext('2d');
const myChart7 = new Chart(ctx7, {
    type: 'bar',
    data: {
        datasets: [{
            label: '', 
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
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
        }, plugins: {
            title: {
                display: true,
                text: 'Validaciones x Conductor'
            }
        } 
        
    }


});
let url7 ='http://localhost:3000/charts/ticketsV'
fetch(url7)
    .then(response => response.json())
    .then(datos => mostrar7 (datos))
    .catch(error => console.log(error))

const mostrar7 = (totales) =>{
    totales.forEach(element => {
        myChart7.data['labels'].push(element.Chofer)
        myChart7.data['datasets'][0].data.push(element.Validaciones)
    });


}