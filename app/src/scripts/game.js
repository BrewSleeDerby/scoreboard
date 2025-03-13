var intervalID  = null;
var seconds = 0;

onmessage = (e) => {
    if (e.data === 'start') {
        start();
    } else if (e.data === 'stop') {
        stop();
    }
};

function start() {
    if (intervalID === null) {
        intervalID = setInterval(tick, 1000);
    }
}

function stop() {
    clearInterval(intervalID);
    intervalID = null;
}

function tick() {
    seconds++;
    postMessage(seconds);
}