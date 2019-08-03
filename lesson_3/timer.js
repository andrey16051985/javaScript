var rezultTimerLabel = document.getElementById("resultTimerLabel");

var timerStopId;
var timerId;
var selectViewTimer = false;
var suspendTimer = true;
var startStopTimer = true;
var audioTimer = new Audio("soundTimer.mp3");

function pauseTimer() {
    if (suspendTimer === true) {
        suspendTimer = false;
        document.getElementById("suspendTimer").setAttribute("value" , "Возобновить");
    } else {
        suspendTimer = true;
        document.getElementById("suspendTimer").setAttribute("value" , "Приостановить");
    }
}

function startTimer() {
    var minuteTimer = Number(document.getElementById("minutsTimerInput").value);
    var secondTimer = Number(document.getElementById("secondsTimerInput").value);
    var rezultTimer = (minuteTimer * 60) + secondTimer;

    if (rezultTimer >= 0) {
        viewTimer(rezultTimer);
        if (startStopTimer === true) {
            document.getElementById("startTimer").setAttribute("value" , "Стоп");
            startStopTimer = false;
    
            timerId = setInterval(function() {
                rezultTimerLabel.style.color = "green";
        
                if(rezultTimer === 0) {
                    audioTimer.play();
                    audioTimer.loop = true;
                    document.getElementById("suspendTimer").setAttribute("disabled" , "true");
                    rezultTimerLabel.style.color = "red";
                    clearInterval(timerId);
                    timerStopId = setInterval(function() {
                        if(selectViewTimer){
                            selectViewTimer = false;
                            viewTimer(rezultTimer);
                        }else{
                           selectViewTimer = true;
                           rezultTimerLabel.innerHTML = " ";
                            }
                    } , 500);
                }else {
                    if (suspendTimer === true) {
                        rezultTimer--;
                    }
                    document.getElementById("suspendTimer").removeAttribute("disabled");
                    viewTimer(rezultTimer);
                }
            } , 1000);
        } else {
            audioTimer.pause();
            audioTimer.currentTime = 0;
            document.getElementById("startTimer").setAttribute("value" , "Старт");
            clearInterval(timerId);
            clearInterval(timerStopId);
            startStopTimer = true;
            suspendTimer = true;
            document.getElementById("suspendTimer").setAttribute("disabled" , "true");
            document.getElementById("suspendTimer").setAttribute("value" , "Приостановить");
            viewTimer(rezultTimer = 0);
            rezultTimerLabel.style.color = "black";
        }
    } else {
        audioTimer.pause();
        audioTimer.currentTime = 0;
        rezultTimerLabel.style.color = "red";
        rezultTimerLabel.innerHTML = "Ошибка ввода!";
        clearInterval(timerId);
        clearInterval(timerStopId);
        document.getElementById("suspendTimer").setAttribute("disabled" , "true");
        document.getElementById("suspendTimer").setAttribute("value" , "Приостановить");
        document.getElementById("startTimer").setAttribute("value" , "Старт");
        startStopTimer = true;
        suspendTimer = true;
    }
}

function viewTimer(number) {
    number = +number;
    var stringTimer;
    if(Math.floor(number / 60) < 10) {
        stringTimer = "0" + Math.floor(number / 60);
    }else {
        stringTimer = Math.floor(number / 60);
    }

    stringTimer = stringTimer + ":";

    if((number % 60) < 10) {
        stringTimer = stringTimer + "0" + (number % 60);
    }else {
        stringTimer = stringTimer + (number % 60);
    }
    rezultTimerLabel.innerHTML = stringTimer;
}