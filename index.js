//selecting elements from DOM
const searchLocation = document.querySelector(".searchLoaction");
const temp = document.querySelector(".weather-1 p");
const place = document.querySelector(".weather-1 span");
const date = document.querySelector(".weather-2 p");
const day = document.querySelector(".weather-2 span");
const type = document.querySelector(".weather-3 span");
const image = document.querySelector(".weather-3 img");

//setting a default target location
let target= "shimla";

//taking target location from user
const setTarget = () => {
    target =(searchLocation.value);
    fetchData();
}

//function to make changes in the DOM according to given location
function manipulateDOM(temprature,loc,dates,days,types,img)
{
    temp.innerText = `${temprature}°C`;
    place.innerText= `${loc},`;
    date.innerText= `${dates}`;
    day.innerText=`${days},  `;
    type.innerText=`${types}`;
    image.src=img ;
}


//function to fetch data from a weather API for the given location
async function fetchData()
{
    //api url
    const url =`https://api.weatherapi.com/v1/current.json?key=caf3403e0adc4652bba172921232604&q=${target}`;

    //fetching data from url
    const response = await fetch(url);

    //coverting the fetched data to object
    const data = await response.json();

    //extracting current time and date for the particular location
    const currDate = data.location.localtime.split(" ")[0];
    const currTime = data.location.localtime.split(" ")[1];

    //getting the current date for the date given
    const currDay = getDay(new Date(currDate).getDay());
    
    //sending data from api to change the DOM
    manipulateDOM(data.current.temp_c,data.location.name,currDate,currDay,data.current.condition.text,data.current.condition.icon)
}

//function that returns day for the given value
function getDay(n)
{
    switch (n) {
        case 0:
            return  `Sunday`;
            break;
        case 1:
            return  `Monday`;
            break;
        case 2:
            return  `Tuesday`;
            break;
        case 3:
            return  `Wednesday`;
            break;
        case 4:
            return  `Thursday`;
            break;
        case 5:
            return  `Friday`;
            break;
        case 6:
            return  `Saturday`;
            break;
    
        default:
            break;
    }
}
fetchData();