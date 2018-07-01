(() =>{
    "use strict";

    let timer = document.getElementById("timer");
    let start = document.getElementById("start");
    let stop = document.getElementById("stop");
    let reset = document.getElementById("reset");

    let startTime;
    let elapsedTime = 0;
    let timerId;
    let timeToAdd  =0;
    let isRunning = false;

    function updateTimerText(){
        let m = Math.floor(elapsedTime / 60000);
        let s = Math.floor(elapsedTime % 60000 /1000);
        let ms = elapsedTime % 1000;
        m = ("0" + m).slice(-2);        
        s = ("0" + s).slice(-2);        
        ms = ("00" + ms).slice(-3);        
        timer.textContent = `${m}:${s}.${ms}`;
    }

    function countUp() {
        timerId = setTimeout(function() {
            elapsedTime = Date.now() - startTime + timeToAdd;
            updateTimerText();
            countUp();
        },10);
    }

    function updateButtonState(startButtonState, stopButtonState, resetButtonState){
        start.className = startButtonState ? "btn" : "btn inactive";
        stop.className = stopButtonState ? "btn" : "btn inactive";
        reset.className = resetButtonState ? "btn" : "btn inactive";
    }
    updateButtonState(true, false, false);

    start.addEventListener("click", function() {
        if(isRunning === true){
            return;
        }
        isRunning = true;
        startTime = Date.now();
        countUp();
        updateButtonState(false, true, false);
    })

    stop.addEventListener("click",function() {
        if (isRunning === false){
            return;
        }
        isRunning = false;
        clearTimeout(timerId);
        timeToAdd += Date.now() - startTime;
        updateButtonState(true, false, true);
    })

    reset.addEventListener("click",function() {
        if (isRunning === true){
            return;
        }
        elapsedTime = 0;
        updateTimerText();
        timeToAdd = 0;
        updateButtonState(true, false, false);
    })
})();