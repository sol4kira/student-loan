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

const paymentPlanInterestAdjustment = {
    300: -0.8,
    240: 0.0,
    180: 1.2
}

const MAX_INTEREST_CAP = 16.5

function interpolate(value, min, max, outMin, outMax) {
    return outMin + ((value - min) / (max - min)) * (outMax - outMin)
}

function determineFinalInterestRate(riskValue, paymentMonths) {
    let baseInterest = null

    for (const level of Object.values(interestConfig)) {
        if (riskValue >= level.riskMin && riskValue <= level.riskMax) {
            baseInterest = interpolate(
                riskValue,
                level.riskMin,
                level.riskMax,
                level.rateMin,
                level.rateMax
            )
            break
        }
    }

    if (baseInterest === null) return null

    const planAdjustment = paymentPlanInterestAdjustment[paymentMonths] ?? 0
    let finalInterest = baseInterest + planAdjustment

    if (finalInterest > MAX_INTEREST_CAP) {
        finalInterest = MAX_INTEREST_CAP
    }

    return +finalInterest.toFixed(2)
}


