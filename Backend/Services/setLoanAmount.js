import interestConfig from 'Backend\Risk\CalculateIntrest.js';
import totalRiskValue from 'Backend\Routes\routes.js';
import courseRiskType from 'Backend\Risk\caluclateRisk.js';
import riskCategories from 'Backend\Risk\caluclateRisk.js';

const universityCOA = {
  tier1: { tuition: 12000, living: 6000, fees: 1000 },
  tier2: { tuition: 8000,  living: 5000, fees: 800  },
  tier3: { tuition: 5000,  living: 4000, fees: 600  }
}


function setRiskTier(riskLevel){
    if(riskLevel >= interestConfig.low.riskMin && riskLevel <= interestConfig.low.riskMax){
        return riskCategories.low;
    }else if(riskLevel > interestConfig.medium.riskMin && riskLevel <= interestConfig.medium.riskMax){
        return riskCategories.medium;
    }else if(riskLevel > interestConfig.high.riskMin && riskLevel <= interestConfig.high.riskMax){
        return riskCategories.high;
    }else{
        return null;
    }
}

function calculateCOA(universityTier, years) {
    const uni = universityCOA[universityTier]
    return (uni.tuition + uni.living + uni.fees) * years
}

function incomeBasedMax(income) {
    return income * 12 * 4
}

function creditMultiplier(score) {
  if (score >= 750) return 1
  if (score >= 650) return 0.8
  if (score >= 550) return 0.6
  return 0.4
}

function educationMultiplier(courseRisk, universityTier) {
  let multiplier = 1

  if (courseRisk === riskCategories.medium) multiplier -= 0.1
  if (courseRisk === riskCategories.high) multiplier -= 0.25

  if (universityTier === "tier1") multiplier += 0.1
  if (universityTier === "tier3") multiplier -= 0.1

  return Math.max(multiplier, 0.4)
}

function riskMultiplier(totalRisk) {
  if (totalRisk <= 6) return 1
  if (totalRisk <= 9) return 0.85
  if (totalRisk <= 12) return 0.65
  return 0
}

function calculateApprovedLoan({
  income,
  creditScore,
  courseRisk,
  universityTier,
  studyYears,
  totalRisk
}) {
  const coa = calculateCOA(universityTier, studyYears)

  const baseMax =
    incomeBasedMax(income) *
    creditMultiplier(creditScore) *
    educationMultiplier(courseRisk, universityTier)

  const riskAdjusted = baseMax * riskMultiplier(totalRisk)

  if (riskAdjusted === 0) {
    return { approved: false, amount: 0 }
  }

  return {
    approved: true,
    amount: Math.min(riskAdjusted, coa)
  }
}


const risk = setRiskTier(totalRiskValue);


