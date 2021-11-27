
if (isSettingsPage) {
button = document.getElementById("button")
button.addEventListener("click", function() {
    window.location = "?" +serialize(settings)
})


document.getElementsByName('arcnum')[0].value = settings.numberOfArcs
document.getElementsByName('anticlockwise')[0].value = settings.antiClockWiseProbability
document.getElementsByName('minspeed')[0].value = settings.speedMin
document.getElementsByName('maxspeed')[0].value = settings.speedMax
document.getElementsByName('mindegrees')[0].value = settings.minRadians
document.getElementsByName('maxdegrees')[0].value = settings.maxRadians
document.getElementsByName('minweight')[0].value = settings.minWeightBeforeBias
document.getElementsByName('maxweight')[0].value = settings.maxWeightBeforeBias
document.getElementsByName('minhue')[0].value = settings.hslHueMin
document.getElementsByName('maxhue')[0].value = settings.hslHueMax
document.getElementsByName('fdb')[0].checked = settings.firstDrawnBiasEnabled
document.getElementsByName('fdbm')[0].value = settings.firstDrawnBiasMult
document.getElementsByName('afcb')[0].checked = settings.awayFromCenterBiasEnabled
document.getElementsByName('afcbm')[0].value = settings.awayFromCenterBiasMult

inputs = document.getElementsByClassName("settingsPage")
for (let i = 0; i < inputs.length; i++) {
inputs[i].addEventListener('change', (e) => {
    let element = e.target
    switch (element.name) {
        case "arcnum":
            settings.numberOfArcs = parseFloat(element.value)
            break;
        case "anticlockwise":
            settings.antiClockWiseProbability = parseFloat(element.value/100)
            break;
        case "minspeed":
            settings.speedMin = parseFloat(element.value)
            break;
        case "maxspeed":
            settings.speedMax = parseFloat(element.value)
            break;
        case "mindegrees":
            settings.minRadians = parseFloat(element.value * (Math.PI/180))
            break;
        case "maxdegrees":
            settings.maxRadians = parseFloat(element.value * (Math.PI/180))
            break;
        case "minweight":
            settings.minWeightBeforeBias = parseFloat(element.value)
            break;
        case "maxweight":
            settings.maxWeightBeforeBias = parseFloat(element.value)
            break;
        case "fdb":
            settings.firstDrawnBiasEnabled = element.checked
            break;
        case "fdbm":
            settings.firstDrawnBiasMult = parseFloat(element.value)
            break;
        case "afcb":
            settings.awayFromCenterBiasEnabled = element.checked
            break;
        case "afcbm":
            settings.awayFromCenterBiasMult = parseFloat(element.value)
            break;
    } 
    settings.hslHueMin = document.getElementsByName('minhue')[0].value
    settings.hslHueMax = document.getElementsByName('maxhue')[0].value 
})
}
}
function serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }