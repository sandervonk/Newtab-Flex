function abbrState(input, to) {
  var states = [
    ["Arizona", "AZ"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  if (to == "abbr") {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return states[i][1];
      }
    }
  } else if (to == "name") {
    input = input.toUpperCase();
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
}
function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}
function check12(hours) {
  if (hours === 0) {
    hours = 12;
  }
  return hours;
}

function setTime() {
  time = new Date();
  document.getElementsByClassName("time-align")[0].textContent =
    check12(time.getHours() % 12) + ":" + pad2(time.getMinutes());
  var sheets = document.styleSheets;
  if (time.getHours() >= 12) {
    sheets[0].addRule(
      ".flex-box .time-align::after",
      "content: 'PM' !important;"
    );
  }
}

window.onload = setTime;
setTimeout(checkMinutes, 1000);

function checkMinutes() {
  var now = new Date().getMinutes();
  if (now > checkMinutes.prevTime) {
    // do something
    setTime();
  }
  checkMinutes.prevTime = now;
}

setTimeout(checkMinutes, 1000);
//location stuff:
function processWeatherData(response) {
  if (!response) {
    //1
    console.log("Empty response");
    return;
  }
  if (response.errorCode > 0) {
    //2
    console.log(
      "Error detected. errorCode=" +
        response.errorCode +
        ", message=" +
        response.message
    );
    return;
  }

  weather = response["days"][0];
  console.log(weather);
  temp = parseInt(weather.temp);
  highTemp = parseInt(weather.tempmax);
  lowTemp = parseInt(weather.tempmin);
  humidity = parseInt(weather.humidity);
  document.getElementsByClassName("weather-align")[0].textContent = temp;
  document.getElementsByClassName("humidity")[0].children[0].textContent =
    humidity;
  document.getElementsByClassName("high-temp")[0].children[0].textContent =
    highTemp;
  document.getElementsByClassName("low-temp")[0].children[0].textContent =
    lowTemp;
}
function requestjQuery() {
  $.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}?unitGroup=us&key=N7P5XWEE227HE3KDXM773XUM4&options=nonulls&include=current`
  )
    .done(function (rawResponse) {
      processWeatherData(rawResponse);
      console.log("processing??");
    })
    .fail(function () {
      console.log("jQuery Request failed");
    });
}
var city = "";
var state = "";
$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function (location) {
    console.log(location);
    state = abbrState(location.state, "abbr");
    city = location.city;
    document.getElementsByClassName("state")[0].innerHTML = state;

    document.getElementsByClassName("city")[0].innerHTML = location.city;
    requestjQuery();
  },
});
//news
var CNNurl =
  "https://newsapi.org/v2/top-headlines?" +
  "sources=cnn&" +
  "apiKey=98b027db923f4a1b982f4cfc22fb6707";
var BBCurl =
  "https://newsapi.org/v2/top-headlines?" +
  "sources=bbc-news&" +
  "apiKey=98b027db923f4a1b982f4cfc22fb6707";

$.ajax({
  url: CNNurl,
  jsonpCallback: "callback",
  dataType: "json",
  success: function (CNNstr) {
    console.log(CNNstr);
    console.log("hello");
    articleNum = parseInt(Math.random() * CNNstr["articles"].length) - 1;
    console.log("CNN-NUM:");
    console.log(articleNum);
    article = CNNstr["articles"][articleNum];
    title = article["title"];
    disc = article["description"];
    if (disc.length <= 10 || disc == undefined) {
      disc = article["content"];
    }
    if (disc.length > 250) {
      disc = disc.substr(0, 250);
    }
    document.getElementById("CNN-title").textContent = title;
    document.getElementById("CNN-disc").textContent = disc;
  },
});

$.ajax({
  url: BBCurl,
  jsonpCallback: "callback",
  dataType: "json",
  success: function (BBCstr) {
    console.log(BBCstr);
    console.log("hello");
    articleNum = parseInt(Math.random() * BBCstr["articles"].length) - 1;
    console.log("BBC-NUM:");
    console.log(articleNum);
    article = BBCstr["articles"][articleNum];
    title = article["title"];
    disc = article["description"];
    if (disc.length <= 10 || disc == undefined) {
      disc = article["content"];
    }
    if (disc.length > 250) {
      disc = disc.substr(0, 250);
    }
    document.getElementById("BBC-title").textContent = title;
    document.getElementById("BBC-disc").textContent = disc;
  },
});
