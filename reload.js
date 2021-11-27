document.onkeydown = function (e) {
    e = e || window.event
    if (e.code == "KeyR") {
        stuff()
        console.log("reloaded")
    }
}