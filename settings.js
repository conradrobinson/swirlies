

settings = {
    awayFromCenterBiasEnabled: true, //bool
    firstDrawnBiasEnabled: true, //bool
    minRadius: 10, //number in px
    maxRadius: (Math.max(window.innerWidth, window.innerHeight)/2)+50, //number
    awayFromCenterBiasMinBound: 0.7, //number
    awayFromCenterBiasMult: 1.3, //number - AFCB gives a value between 0 and 1 so this increases it so the ones on the outside actually get bigger
    firstDrawnBiasMult: 8, //number - same as above
    minWeightBeforeBias: 5, //number - in px
    maxWeightBeforeBias: 30, //number - in px
    minRadians: 0, //how many radians of the arc are visible at min
    maxRadians: Math.PI, //how many radians of the arc are visible at max
    speedMin: 0.1,
    speedMax: 10,
    speedDivisor: 500, //otherwise its reaaaallly fast
    hslHueMin: 230, //if it goes from 300 to 60 for example, just count it as 420 not 60
    hslHueMax: 285,
    hslLightnessMax: 60, //no min, min is black and I like that
    antiClockWiseProbability: 0.3


}
