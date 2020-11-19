const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

function displayChart() {
  let dateRange = ""
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const currency = document.getElementById("currencySelect").value;
  if(startDate && endDate) {
    dateRange += `?currency=${currency}&start=${startDate}&end=${endDate}`;
  }

  axios
  .get(apiUrl + dateRange)
  .then(response => {
    const xAxis = Object.keys(response.data.bpi);
    const yAxis = xAxis.map(day => response.data.bpi[day]);

    displayMinMax(Math.min(...yAxis), Math.max(...yAxis));
    
    const ctx = document.getElementById('myCanvas').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [
          {
            label: "BTC Price",
            data: yAxis
          }
        ]
      }
    });
  })
  .catch(e => console.log(`Error: ${e}`));
}

function displayMinMax(min, max) {
  const minMax = `Min: ${min}, Max: ${max}`;
  document.getElementById("minMax").innerHTML = minMax;
}

document.getElementById("searchButton").onclick = function() {
  displayChart();
}

displayChart();
