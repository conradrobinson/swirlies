intervals = []
document.onkeydown = function (e) {
    e = e || window.event
    if (e.code == "KeyR") {
        reload()
    }
    if (e.code == "KeyS") {
        end(document.getElementById("audio2"))
        console.log("skipped")
    }
}

function reload() {
    stuff()
    clearInterval(intervals[0])
    intervals = [intervals[1]]
}