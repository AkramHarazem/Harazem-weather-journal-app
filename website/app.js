// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=f5f0efebf5d77212cebbfd399a58fccf&units=metric';
// the URL of server 
const server = 'http://localhost:8080';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element


/* Function called by event listener */
async function performAction(e) {
  e.preventDefault();
  // get input values
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const data =  await getWeather(zip)
      // add data
      await postData(server + '/add', { newDate, cityName: data.name ,temp: Math.round(data.main.temp), feelings });
      // call retrieveData to update browser content
      retrieveData();
    
}
document.getElementById('generate').addEventListener('click', performAction);

/* Function to GET Web API Data*/
async function getWeather(zip) {
  try {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + zip + apiKey);
    // Data equals to the result of fetch function
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
  
  /* Function to POST data */
  async function postData(url = '', data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await res.json();
    return newData;
  }
  catch (error) {
    console.log('error', error);
  }
}

  
  async function retrieveData() {
  const res = await fetch(server + '/all');
  try {
    const allData = await res.json();
    console.log(allData);

    document.getElementById('name').innerHTML = allData.cityName;
    document.getElementById('temp').innerHTML = allData.temp + ' degrees';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById("date").innerHTML = allData.newDate;
  }
  catch (error) {
    console.log("error", error);
  }
}