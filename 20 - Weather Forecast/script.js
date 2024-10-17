let city = "Tokyo";
const apiKey = "369717c5efa251123ef4ef094005e3e5"; // ต้องแทนที่ด้วย API key ที่ถูกต้อง

const form = document.getElementById('form');
const search = document.getElementById('search');

function setData() {
    showWeather();
}

async function showWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        showDataToUI(data);
    } catch (error) {
        console.log("There was a problem with the fetch operation:", error.message);
        alert("ไม่สามารถดึงข้อมูลสภาพอากาศได้ กรุณาลองใหม่อีกครั้ง");
    }
}

function showDataToUI(data) {
    const cityElement = document.getElementById('city');
    const stateElement = document.getElementById('state');
    const weatherElement = document.getElementById('weather');
    const statusElement = document.getElementById('status');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');

    cityElement.innerText = data.name || "N/A";
    stateElement.innerText = data.sys?.country || "N/A";
    
    const temp = calculate(data.main?.temp);
    const tempMin = calculate(data.main?.temp_min);
    const tempMax = calculate(data.main?.temp_max);
    
    weatherElement.innerHTML = `
        <h1>${temp.toFixed(1)} C&deg;</h1>
        <p class="small">min: ${tempMin.toFixed(1)} C&deg; max: ${tempMax.toFixed(1)} C&deg;</p>
    `;

    statusElement.innerText = data.weather?.[0]?.main || "N/A";
    humidityElement.innerText = `Humidity: ${data.main?.humidity || "N/A"}%`;
    windElement.innerText = `Wind: ${data.wind?.speed || "N/A"} m/s`;
}

function calculate(kelvin) {
    return kelvin ? kelvin - 273.15 : 0;
}

function callDataAPI(e) {
    e.preventDefault();
    city = search.value;
    showWeather();
}

form.addEventListener('submit', callDataAPI);
setData();