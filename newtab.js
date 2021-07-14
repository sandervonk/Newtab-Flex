function pad2(number) {
    return (number < 10 ? '0' : '') + number
}
function iframestyle() {
    var element = document.querySelector("#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div")
    element.style = "background: black !important;"
    var frm = document.getElementsByTagName('iframe')[0].document;
    var otherhead = frm.getElementsByTagName("head")[0];
    var link = frm.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "style.css");
    otherhead.appendChild(link);
}
function setIFrame() {
    document.getElementsByTagName("iframe")[0].onready = iframestyle
    document.getElementsByTagName("iframe")[0].onload = iframestyle
    setTimeout(iframestyle, 3000)
    console.log("setting onload")
}
function setTime() {
    time = new Date
    document.getElementsByClassName("time-align")[0].textContent = time.getHours() % 12 + ":"+pad2(time.getMinutes())
    var sheets = document.styleSheets
    if (time.getHours() >=12) {
        sheets[0].addRule(".flex-box .time-align::after", "content: 'PM' !important;")
    }
    setIFrame()
}
    
window.onload = setTime
setTimeout(checkMinutes,1000);

function checkMinutes(){
  var now = new Date().getMinutes();
  if (now > checkMinutes.prevTime){
    // do something
    setTime()
  }
  checkMinutes.prevTime = now;
}

  setTimeout(checkMinutes,1000);
