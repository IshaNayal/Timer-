let countdownInterval;
let remainingTime = 0;
let isPaused = false;

function updateCountdown() {
  if (remainingTime <= 0) {
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.querySelector('.countdown').innerHTML += "<h2>Time's up!</h2>";
    clearInterval(countdownInterval);
    // Play alarm sound
    const alarm = document.getElementById('alarm-audio');
    if (alarm) {
      alarm.currentTime = 0;
      alarm.play();
    }
    return;
  }

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

  remainingTime--;
}

document.getElementById('start-timer').addEventListener('click', function() {
  if (isPaused && remainingTime > 0) {
    // Resume
    isPaused = false;
    countdownInterval = setInterval(updateCountdown, 1000);
    return;
  }
  const hours = parseInt(document.getElementById('input-hours').value) || 0;
  const minutes = parseInt(document.getElementById('input-minutes').value) || 0;
  const seconds = parseInt(document.getElementById('input-seconds').value) || 0;
  remainingTime = hours * 3600 + minutes * 60 + seconds;
  if (remainingTime > 0) {
    clearInterval(countdownInterval);
    document.querySelector('.countdown').innerHTML = `
      <div><span id="hours">00</span><p>Hours</p></div>
      <div><span id="minutes">00</span><p>Minutes</p></div>
      <div><span id="seconds">00</span><p>Seconds</p></div>
    `;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }
});

document.getElementById('stop-timer').addEventListener('click', function() {
  clearInterval(countdownInterval);
  isPaused = true;
  // Stop and reset alarm audio
  const alarm = document.getElementById('alarm-audio');
  if (alarm) {
    alarm.pause();
    alarm.currentTime = 0;
  }
});
