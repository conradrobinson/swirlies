intervals = []
document.onkeydown = function (e) {
    e = e || window.event
    if (e.code == "KeyR") {
        reload()
    }
}

function reload() {
    stuff()
    clearInterval(intervals[0])
    intervals = [intervals[1]]
}