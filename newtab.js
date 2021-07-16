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
function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}
var onclickFunction = function (name, fn, href) {
  return new Function(
    "return function (call) { return function " +
      name +
      ` () {  window.location.href = "${href}"  }; };`
  )()(Function.apply.bind(fn));
};
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

sources = [
  ["cnn.com", "CNN"],
  ["bbc.com", "BBC"],
  ["engadget.com", "Engadget"],
  ["theverge.com", "Verge"],
  ["arstechnica.com", "Ars"],
];
function newNum(len) {
  nums = [];
  for (let i = 0; i < 5; i++) {
    newRandom = parseInt(Math.random() * len) - 1;
    runs = 0;
    while (nums.indexOf(newRandom) != -1 && runs <= 20) {
      newRandom = parseInt(Math.random() * len) - 1;
      console.log("was the same, changing");
      runs++;
    }
    if (newRandom < 0) {
      newRandom = 0;
    }
    nums.push(newRandom);
  }
  console.log("random things:");
  console.log(nums);
  return nums;
}
apiToken = "185e38cb8cc5ca66e97868ffaec92190";
tokens = [
  "185e38cb8cc5ca66e97868ffaec92190",
  "f136df2be140d33e4b9cc31693bb0440",
  "4da6332b1c7946c53125d2e669bf24e8",
];
tokenNum = 0;
function getNews(tokenNumber) {
  apiToken = tokens[tokenNumber];
  queryUrl = `https://gnews.io/api/v4/search?q=example&lang=en&token=${apiToken}`;
  $.ajax({
    url: queryUrl,
    jsonpCallback: "callback",
    dataType: "json",
    success: function (response) {
      console.log(response);
      articles = response["articles"];
      articlesNum = newNum(articles.length);
      for (let j = 1; j < 6; j++) {
        article = articles[articlesNum[j - 1]];
        console.log(`getting article ${articlesNum[j - 1]} for slot ${j}`);
        console.log(["img", article.image]);
        document.getElementById(`img${j}`).src = article.image;
        document.getElementById(`title${j}`).children[0].textContent =
          article.title;
        document.getElementById(`disc${j}`).textContent = article.description;
        document.getElementById(`title${j}`).children[0].href = article.url;
      }
    },
    error: function (response) {
      if (
        response.responseJSON["errors"][0].includes(
          "You have reached your query limit for today"
        )
      ) {
        console.log("Query Limit Error :(");
        tokenNum += 1;
        if (tokenNum < tokens.length) {
          console.log(`running with token number: ${tokenNum}`);
          getNews(tokenNum);
        }
      } else {
        console.log("errored :( RESPONSE:");
        console.log(response.responseJSON);
      }
    },
  });
}

function altNews() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://newscatcher.p.rapidapi.com/v1/search?q=news&sort_by=date&sources=engadget.com,cnn.com,nytimes.com,arstechnica.com,theverge.com,techcrunch.com&topic=tech&lang=en&media=True",
    method: "GET",
    headers: {
      "x-rapidapi-key": "dbcdb734a6msh0652ad6a4e3d952p1121c0jsnc4eba32a960f",
      "x-rapidapi-host": "newscatcher.p.rapidapi.com",
    },
  };
  random = Math.random();
  console.log("random:");
  console.log(random);
  if (random >= 0.5) {
    settings.url =
      "https://newscatcher.p.rapidapi.com/v1/search_free?q=tech&lang=en&media=True";
    console.log("changed url to free version");
    console.log(settings.url);
  } else {
    var articlesNum = shuffleArray([0, 1, 2, 3, 4]);
    console.log("created shuffled array?");
  }

  $.ajax(settings).done(function (response) {
    console.log("response:");
    console.log(response);
    articles = response["articles"];
    console.log("articles:");
    console.log(articles);
    if (settings.url.includes("search_free?q")) {
      articlesNum = newNum(articles.length);
    }

    if (settings.url.includes("search?q")) {
      articlesNum = shuffleArray([0, 1, 2, 3, 4]);
    }
    console.log(articlesNum);
    for (let j = 1; j < 6; j++) {
      console.log(articlesNum[j - 1]);
      article = articles[articlesNum[j - 1]];
      console.log(`getting article ${articlesNum[j - 1]} for slot ${j}`);
      try {
        console.log(["img", article.media]);
        document.getElementById(`img${j}`).src = article.media;
      } catch {}
      document.getElementById(`title${j}`).children[0].textContent =
        article.title;
      document.getElementById(`disc${j}`).textContent = article.summary;
      document.getElementById(`title${j}`).children[0].href = article.link;
    }
  });
}
//getNews(0);
altNews();
