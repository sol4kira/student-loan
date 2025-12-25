const interestConfig = {
    low: {
        riskMin: 9.5,
        riskMax: 14,
        rateMin: 5.2,
        rateMax: 7.3
    },
    medium: {
        riskMin: 14,
        riskMax: 19,
        rateMin: 8.3,
        rateMax: 10.5
    },
    high: {
        riskMin: 19,
        riskMax: 24,
        rateMin: 11.4,
        rateMax: 14.3
    }
}

function interpolate(value, min, max, outMin, outMax) {
    return outMin + ((value - min) / (max - min)) * (outMax - outMin)
}

function determineInterestRate(riskValue) {
    for (const level of Object.values(interestConfig)) {
        if (riskValue >= level.riskMin && riskValue <= level.riskMax) {
            return interpolate(
                riskValue,
                level.riskMin,
                level.riskMax,
                level.rateMin,
                level.rateMax
            )
        }
    }
    return null
}
