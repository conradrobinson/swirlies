class Arc {
    constructor(num, total) {
        this.num = num
        this.total = total
    }
    generate(bias1, bias2) {

        this.radius = random(settings.minRadius, settings.maxRadius)
        let awayFromCenterBias = 1;
        if (bias1){
            awayFromCenterBias =  Math.max(Math.sin((Math.PI / 180) * ((this.radius/(Math.max(dims[0], dims[1])/2))*90))*settings.awayFromCenterBiasMult, settings.awayFromCenterBiasMinBound) //sin curve of value from center and caps
        //at a min of 0.4 so 40% of the way out
        }
        let firstElementsAreLargestBias = 1
        if (bias2) {
         firstElementsAreLargestBias = Math.sin((Math.PI / 180) * ((this.total-this.num)/this.total) * 90) * settings.firstDrawnBiasMult
        }
        this.weight = firstElementsAreLargestBias * awayFromCenterBias * random(settings.minWeightBeforeBias, settings.maxWeightBeforeBias)
        this.rads = random(settings.minRadians, settings.maxRadians)
        this.start = random(0, 2*Math.PI - this.rads)
        this.speed = (random(settings.speedMin, settings.speedMax)/settings.speedDivisor)
        this.biasspeed = Math.min((random(settings.speedMin, settings.speedMax)/settings.speedDivisor)*(1/firstElementsAreLargestBias), this.speed)
        this.colour = hslToHex(wrap(random(settings.hslHueMin, settings.hslHueMax), 0, 360), random(80, 100), random(0, Math.min(firstElementsAreLargestBias*settings.hslLightnessMax, settings.hslLightnessMax)))
        //basically the first elements to be added to the array (the behind ones) are the largest, darkest, and slowest - the firstElementsAreLargestBias
        //and the elements closest to the center are the smallest - the awayFromCenterBias
        //this sums up to the first elements to be added to the outside are the largest, slowest and darkest, and the middle ones tend towards being smaller
        //everything with a heavy degree of randomness with parameters like (5, 30) for weight as an example. That's nearly all random.
        this.clockwise = true
        if (random(0, 1) > 1-settings.antiClockWiseProbability) {
            this.clockwise = false
        }
    }
    display(canvas) {
        canvas.beginPath()
        canvas.lineWidth = this.weight
        canvas.strokeStyle = this.colour
        canvas.arc(center[0], center[1], this.radius, this.start, this.rads+this.start, false)
        canvas.stroke()
    }
    move() { 
        let acIt = 1
        if (!this.clockwise) {
            acIt = -1
        }
        this.start += this.biasspeed * acIt
    }
}

stuff()

function stuff() {
    console.log(settings)
dims = []
let cId = ""
if (!isSettingsPage) {
    cId = "cnvs"
    dims = [window.innerWidth, window.innerHeight]

} else {
    cId = "previewCnvs"
    dims = [document.getElementById("previewCnvs").scrollWidth, document.getElementById("previewCnvs").scrollHeight]
}
center = [dims[0]/2, dims[1]/2]
c = document.getElementById(cId);
c.width = dims[0];
c.height = dims[1];
canvas = c.getContext("2d")
canvas.lineCap = "round"




arcs = []
let a = settings.numberOfArcs
for (let i = 0; i < a; i++) {
    arcs.push(new Arc(i, a));
}
for (let i = 0; i < arcs.length; i++) {
    arcs[i].generate(settings.awayFromCenterBiasEnabled, settings.firstDrawnBiasEnabled);
    arcs[i].display(canvas)

}
intervals.push(setInterval(function() {
    canvas.clearRect(0, 0, c.width, c.height)
    for (let j = 0; j < arcs.length; j++) {
        arcs[j].display(canvas)
        arcs[j].move();
    }  
}, 10))
}




function random (min, max) {
    return (Math.random() * (max-min)) + min
}

//not my code
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  //not my code
  function wrap(x, x_min,x_max) {
    return (((x - x_min) % (x_max - x_min)) + (x_max - x_min)) % (x_max - x_min) + x_min
  }
