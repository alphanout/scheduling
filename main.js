let microBtn = document.getElementById("Micro");
let setIntervalBtn = document.getElementById("SetInterval");
let rafBtn = document.getElementById("RAF");
let setTimeoutBtn = document.getElementById("SetTimeout");
let clearBtn = document.getElementById("clear");

let print = document.getElementById("result");

microBtn.addEventListener("click", startMicro);
rafBtn.addEventListener("click", startRaf);
clearBtn.addEventListener("click", startCLear);
setIntervalBtn.addEventListener("click", startSetInterval);
setTimeoutBtn.addEventListener("click", startSetTimeOut);
let id = null;

function task(scheduler, res, name = "") {
    let i = 0;
    let start = Date.now();

    function complexTask() {
        do {
            i++;
        } while (i % 1e6 != 0);

        if (i === 1e8) {
            if (name === "setInterval") {
                clearInterval(id);
            }
            res.time = (Date.now() - start) / 1000;
            print.innerHTML += `${scheduler.name + name + " " + id} completed in ${res.time} seconds` + "<br>";
        } else {
            if (name !== "setInterval")
                scheduler(complexTask);
        }
    }
    console.log("started");
    if (scheduler !== "setInterval") {
        scheduler(complexTask);
    }
}

function startMicro() {
    task(queueMicrotask, {});
}

function startRaf() {
    for (let j = 0; j < 1; j++) {
        task(requestAnimationFrame, {});
    }
}

function startSetInterval() {
    task((run) => {
        id = setInterval(() => {
            run();
        });
    }, {}, "setInterval");
}

function startSetTimeOut() {
    task((run) => {
        id = setTimeout(() => {
            run();
        });
    }, {}, "setTimeout");
}

function startCLear() {
    print.innerHTML = "";
}