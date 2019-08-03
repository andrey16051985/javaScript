
var currTimeLabel = document.getElementById("currTime");
const intervalTime = 100;
var compareTime = false;
var flagActive = false;
var flagReplay = false;
var timeStopWatch = 0;
var realTime = 0;
var audioAlarm = new Audio("alarm_1.mp3");

viewCurrentTime();

//главный таймер
setInterval(() => {
    viewCurrentTime();

    let timeAlarm = document.getElementById("timeAlarmInput").value;
    let actionAlarmCheckBox = document.getElementById("actionAlarmInput");

    //парсим время сработки будильника
    if (timeAlarm.length === 5) {
        actionAlarmCheckBox.removeAttribute("disabled");

        let realDate = new Date();
        let realHours = realDate.getHours();
        let realMinuts = realDate.getMinutes();
        let realSeconds = realDate.getSeconds();
        realTime = (realHours * 3600) + (realMinuts * 60) + realSeconds;//получаем текущее время в секундах
    
        let arrayTime = timeAlarm.split(":");
        let hours = parseInt(arrayTime[0]);//часы сработки
        let minuts = parseInt(arrayTime[1]);//минуты сработки
        //если флаг повтора неактивен - срабатывание будильника по input
        if (flagReplay === false) {
            timeStopWatch = (hours * 3600) + (minuts * 60);//получаем время сработки в секундах
        }
        
        //сравниваем
        if (realTime === timeStopWatch) {
            compareTime = true//если время совпало - ставим флаг сработки будильника
        }
    } else {
        actionAlarmCheckBox.checked = false;
        actionAlarmCheckBox.setAttribute("disabled" , "false"); 
    }

    //если будильник активен - активируем боковую панель
    if (actionAlarmCheckBox.checked) {
        document.getElementById("viewAlarmDiv").style.display = "inherit";
    } else {
        if (document.getElementById("viewAlarmDiv").style.display === "inherit") {
            turnOffAlarm();
        }
        document.getElementById("viewAlarmDiv").style.display = "none";
    }

    //если будильник сработал - активируем кнопки управления и звуковой сигнал
    if (compareTime) {
        if (flagActive === false) {
            document.getElementById("beforTimeLabel").innerHTML = "Подъём!!!";
            document.getElementById("turnOffAlarmBtn").removeAttribute("disabled" , "false");
            if (document.getElementById("replayAlarmInput").value != "0") {
                document.getElementById("replayAlarmBtn").removeAttribute("disabled" , "false");
            }
            selectSound();
            flagActive = true;
        }
        audioAlarm.play();
    } else {
        restTime(realTime , timeStopWatch);//вывод времени до сработки будильника
    }
}, intervalTime);

function replayAlarm() {
    audioAlarm.pause();
    audioAlarm.currentTime = 0;
    compareTime = false;
    flagActive = false;
    document.getElementById("replayAlarmBtn").setAttribute("disabled" , "false");

    let replay = document.getElementById("replayAlarmInput").value;
    let plusTime = 0;
    switch (replay) {
        case "0":
            plusTime = 0;
            break;
        case "5":
            plusTime = 5 * 60;
            break;
        case "10":
            plusTime = 10 * 60;
            break;
        case "15":
            plusTime = 15 * 60;
            break;
        case "20":
            plusTime = 20 * 60;
            break;
    }
    timeStopWatch = realTime + plusTime;
    flagReplay = true;
}

function turnOffAlarm() {
    audioAlarm.pause();
    audioAlarm.currentTime = 0;
    compareTime = false;
    flagActive = false;
    flagReplay = false;
    document.getElementById("turnOffAlarmBtn").setAttribute("disabled" , "false");
    document.getElementById("replayAlarmBtn").setAttribute("disabled" , "false");
}

function checkSound() {
    let selectBtn = document.getElementById("checkSoundBtn").value;
    if (selectBtn === "Проверить") {
        selectSound();
        audioAlarm.play();
        document.getElementById("checkSoundBtn").value = "Стоп";
    } else {
        audioAlarm.pause();
        audioAlarm.currentTime = 0;
        document.getElementById("checkSoundBtn").value = "Проверить";
    }



}

function selectSound() {
    let sound = document.getElementById("selectSoundInput").value;
    switch (sound) {
        case "sound_1":
            audioAlarm.src = "alarm_1.mp3";
            break;
        case "sound_2":
            audioAlarm.src = "alarm_2.mp3";
            break;
        case "sound_3":
            audioAlarm.src = "alarm_3.mp3";
            break;
        case "sound_4":
            audioAlarm.src = "alarm_4.mp3";
            break;
    }
}

function restTime(currTime , stopWatchTime) {
    currTime = +currTime;
    stopWatchTime = +stopWatchTime;
    let deltaTime = 0;

    if (stopWatchTime > currTime) {
        deltaTime = stopWatchTime - currTime;
    } else {
        deltaTime = (86400 - currTime) + stopWatchTime;
    }
    

    let hours = Math.floor(deltaTime / 3600);
    let minuts = Math.floor((deltaTime - (hours * 3600)) / 60);
    let seconds = deltaTime - (((hours * 60) + minuts) * 60);

    document.getElementById("beforTimeLabel").innerHTML = "Осталось " + viewNumber(hours) + ":" + viewNumber(minuts) + ":" + viewNumber(seconds);
}

function viewCurrentTime() {
    let date = new Date();
    let str = viewNumber(date.getHours()) + ":" + viewNumber(date.getMinutes()) + ":" + viewNumber(date.getSeconds());
    currTimeLabel.innerHTML = str;
}

function viewNumber(params) {
    params = +params;
    let str = "";

    if (params < 10) {
        str = "0" + params;
    } else {
        str = params;
    }
    return str;
}












