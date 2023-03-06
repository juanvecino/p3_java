var historial = [];

(function initialize(){
    actualizarPreciosBitcoin();
    setInterval(actualizarPreciosBitcoin, 120000); // Recarga cada 2 minutos    
})();

window.onload


function opciondivisas(){
    var opcion = document.getElementById("divisa").value;
    if(opcion == "USD"){
        document.getElementById("row-usd").style.display = "block";
        document.getElementById("row-eur").style.display = "none";
        document.getElementById("row-gbp").style.display = "none";
    }else if(opcion == "EUR"){
        document.getElementById("row-usd").style.display = "none";
        document.getElementById("row-eur").style.display = "block";
        document.getElementById("row-gbp").style.display = "none";
    }else if(opcion == "GBP"){
        document.getElementById("row-usd").style.display = "none";
        document.getElementById("row-eur").style.display = "none";
        document.getElementById("row-gbp").style.display = "block";
    }

}



function actualizarPreciosBitcoin() {
    // Hacer una solicitud a la API de Bitcoin para obtener los precios actuales
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => response.json())
    .then(data => {
        // Actualizar el precio actual de Bitcoin en el DOM
        document.getElementById('usd').innerHTML = data.bpi.USD.symbol+ ' '+ data.bpi.USD.rate ;
        document.getElementById('eur').innerHTML = data.bpi.EUR.rate + data.bpi.EUR.symbol;
        document.getElementById('gbp').innerHTML = data.bpi.GBP.symbol+ ' '+ data.bpi.GBP.rate ;
    })
    .catch(error => {
        console.log("Error en el current price: " + error);
    });

    historicoBitcoin();
}

function historicoBitcoin(){
    fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=USD&days=10&interval=hourly')
    .then(response => response.json())
    .then(data => {
        for(var i = 0; i < data.prices.length; i++){
           
            const date = new Date(data.prices[i][0]); // convert to milliseconds
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
            const day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

            historial.push({
                "date": `${year}-${month}-${day}`,
                "price": data.prices[i][1].toString()
            });
        }
        creargrafico();
    })
    .catch(error => {
        console.log("Error en el current price: " + error);
    });
}




function creargrafico(){
    var dates = historial.map(function(item) {
        return item.date;
      });
      var prices = historial.map(function(item) {
        return item.price;
      });
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Precio del Bitcoin en USD",
              data: prices,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1
            }
          ]}
    });
}