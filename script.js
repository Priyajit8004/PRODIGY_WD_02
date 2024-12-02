let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const laps = document.getElementById("laps");

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 100);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    laps.innerHTML = ""; 
}
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement("li");
        li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(li);
    }
}
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
updateDisplay();
