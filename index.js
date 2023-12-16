async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    const apiKey = 'e79d7ccef583435bb8dea8de86b314a4';
    const apiUrl = 'https://api.twelvedata.com';
    const endpoint = '/time_series';
    const symbol = 'GME,MSFT,DIS,BNTX';
    const interval = '1day';
    // const url = `${apiUrl}${endpoint}?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    
    // try {
    //   const response = await fetch(url);
  
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
  
    //   const data = await response.json();
    //   let GME = data.GME;
    //   let MSFT = data.MSFT;
    //   let DIS = data.DIS;
    //   let BNTX = data.BNTX;
    //   const stocks = [GME, MSFT, DIS, BNTX];
  
    //   console.log(data);
  
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  
// Using mockData here instead of API
    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    function getColor(stock){
        if(stock === 'GME'){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === 'MSFT'){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === 'DIS'){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === 'BNTX'){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    stocks.forEach( stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: stocks.map(stock => stock.meta.symbol),
          datasets: [{
            label: 'Highest',
            data: stocks.map(stock => Math.max(...stock.values.map(value => parseFloat(value.high)))),
            backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
            borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
          }],
        },
      });
      
      
    


    console.log(stocks[0].values); 

  }
  
  main();
  

  

// API key: e79d7ccef583435bb8dea8de86b314a4