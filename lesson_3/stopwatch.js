var currentTime = document.getElementById("stopWatchLabel");

var timer_Id;
const interval = 10;
var time = 0;
var counterPointTime = [];
var selectDoBtn = true;

function start() {
    if (selectDoBtn) {
        timer_Id = setInterval(() => {
            time += 10;
            currentTime.innerHTML = parseTime(time);
        }, interval);
        document.getElementById("startStopWatch").setAttribute("value" , "Пауза");
        document.getElementById("pointStopWatch").removeAttribute("disabled");
        document.getElementById("resetStopWatch").removeAttribute("disabled");
        selectDoBtn = false;
    } else {
        document.getElementById("startStopWatch").setAttribute("value" , "Продолжить");
        stop();
        selectDoBtn = true;
    }
}

function stop() {
    clearInterval(timer_Id);
    document.getElementById("pointStopWatch").setAttribute("disabled" , "false");
}

function reset() {
    clearInterval(timer_Id);
    currentTime.innerHTML = parseTime(time = 0);
    document.getElementById("startStopWatch").setAttribute("value" , "Старт");
    document.getElementById("pointStopWatch").setAttribute("disabled" , "false");
    document.getElementById("resetStopWatch").setAttribute("disabled" , "false");
    document.getElementById("pointTimeLabel").innerHTML = "";
    selectDoBtn = true;

    var index = counterPointTime.length;
    for (let i = 0; i < index; i++) {
      counterPointTime.pop();
    }
}

function pointTime() {
    let str = "";
    counterPointTime.push(parseTime(time));
    counterPointTime.forEach((value , index) => {
        str = str + ++index + ") " + "&nbsp;&nbsp;" + value + "<br>";
    });
    document.getElementById("pointTimeLabel").innerHTML = str;
}

function parseTime(params) {
    params = +params;
    var stringTime;

    var minuts = Math.floor((params / 1000) / 60);
    var seconds = Math.floor(((params / 1000) % 60));
    var miliseconds = (params - (Math.floor((params / 1000))) * 1000) / 10;
    
    if(minuts < 10) {
        stringTime = "0" + minuts;
    }else {
        stringTime = minuts;
    }

    stringTime = stringTime + ":";

    if(seconds < 10) {
        stringTime = stringTime + "0" + seconds;
    }else {
        stringTime = stringTime + seconds;
    }

    stringTime = stringTime + ":";

    if(miliseconds < 10) {
        stringTime = stringTime + "0" + miliseconds;
    }else {
        stringTime = stringTime + miliseconds;
    }
    return stringTime;
}