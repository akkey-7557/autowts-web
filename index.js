let running = true;

// Register onClick
document.getElementById("start").addEventListener("click", function() {
    start();
});

document.getElementById("stop").addEventListener("click", function() {
    stop();
});

// Main Functions
function start() {
    // Change Var
    running = true;
    document.getElementById("token").disabled = true;
    document.getElementById("channels").disabled = true;
    document.getElementById("message").disabled = true;
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    document.getElementById("status").textContent = "実行中";
    messageRequest(-1);
}

function stop() {
    // Change Var
    running = false;
    document.getElementById("token").disabled = false;
    document.getElementById("channels").disabled = false;
    document.getElementById("message").disabled = false;
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("status").textContent = "未実行";
}

// Process Functions
function messageRequest(currentLoop) {
    let currentCount = currentLoop + 1;

    let token = document.getElementById("token").value;
    let channel = document.getElementById("channels").value.split("\n")[currentCount];
    let message = document.getElementById("message").value;

    if(channel === undefined) {
        stop();
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://discord.com/api/v10/channels/${channel}/messages`, true);
    xhr.setRequestHeader("Authorization", token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            requestCallback(currentCount);
        }
    }
    xhr.send(JSON.stringify({content: message}));
}

function requestCallback(currentLoop) {
    if(running) {
        setTimeout(
            function() {
                messageRequest(currentLoop);
            },
            1.5 * 1000
        );
    }
}