
// set the dom from html
const body = document.querySelector("body");
const generate = document.getElementById("generate");
let dateNow = document.getElementById("date");
let temp = document.getElementById("temp");
let city = document.getElementById("city");
let descrip = document.getElementById("descrip");
let textInputed = document.getElementById("inputed-text");
const zip = document.getElementById("zip");
const textData = document.getElementById("text-data");

// The URL to retrieve weather information from his API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// // Personal API Key for OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const apiKey = "&appid=de85480fc66cffbe3b1eaafa278ccdda";
const celTemp = "&units=metric";

// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();



//function to go to api that belongs to openweathermap site
//and get the data from object that has the zip that user inputed in page
const getApiData = async ()=>{
    let res = await fetch(baseUrl + zip.value + apiKey + celTemp);
    const data = await res.json();
    try{
        if (data.cod != 200) {
            //alert the enduser there is an error 
            window.alert(data.message)
            console.log(data.message)
        }
        return data;
    }catch(error){
        console.log(error)
    }
}

//create an object named as info from the data which come from api
//and the value of the data what the user want
const createDataInfo = async (data)=>{
    try{
        const info = {
            date:newDate,
            temp:data.main.temp,
            name:data.name,
            des:data.weather[0].description,
            text_1:textData.value,
        }
        console.log(info);
        return info;
    }
    catch(error){
        console.log(error)
    }
}

//function to POST data into server
const postDataAll = async ( url = '', data = {})=>{
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },       
        body: JSON.stringify(data), 
    });
    try {
        const newData = await res.json();
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
}
//function to GET all data fom server
const getDataAll = async (url)=>{
    const response =await fetch(url);
    try{
        const savedData = await response.json();
        return savedData;
    }catch(error){
        console.log(error)
    }
}

//function to input the data what i saved in response to the html 
//display the the data to the enduser
const updateData =async (savedData)=>{
    try{
        dateNow.innerHTML = savedData.date;
        temp.innerHTML = savedData.temp;
        city.innerHTML = savedData.name;
        descrip.innerHTML = savedData.des;
        textInputed.innerHTML = savedData.text_1;
        let desValue = descrip.innerHTML;
        return desValue;
    }catch(e){
        console.log(e)
    }
}
const display = ()=>{
    const output = document.querySelector(".output");
    output.style.display = "flex";
}

//function to start the javascript in the time that the user click on generate botton
const startProject = async ()=>{
    getApiData().then((data)=>{
        createDataInfo(data).then((info)=>{
            postDataAll("/postData",info).then((newData)=>{
                getDataAll("/getData").then((savedData)=>{
                    updateData(savedData)
                });
            });
        });
    })
    setTimeout(display,1000);
}

generate.addEventListener("click" ,startProject)
