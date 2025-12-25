const monthlyPlan ={
    low:0.25,
    medium:0.30,
    high:0.40
}

function getPayBackRule(riskLevel, loanAmount, monthlyIncome){
    const planPercentage = monthlyPlan[riskLevel];
    const monthlyPayment = monthlyIncome * planPercentage;
    const payBackPeriodMonths = Math.ceil(loanAmount / monthlyPayment);
    return payBackPeriodMonths;
}