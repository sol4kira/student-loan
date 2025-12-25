// check if every input is in proper risk category

const riskCategories ={
    low:1,
    medium:2,
    high:3,
}

const inputWeightValue={
    lowWeight:1,
    mediumWeight:2,
    highWeight:3
}

const inputWeightCategory={
    gpaWeight:inputWeightValue.mediumWeight,
    courseWeight:inputWeightValue.lowWeight,
    incomeWeight:inputWeightValue.highWeight,
    creditScoreWeight:inputWeightValue.highWeight,
    cosignerWeight:inputWeightValue.mediumWeight,
    paymentPlanWeight:inputWeightValue.mediumWeight
}

const courseRiskType = {

        "Data Science": riskCategories.low,
        "Software Engineering": riskCategories.low,
        "Cyber Security": riskCategories.low,
        "Artificial Intelligence": riskCategories.low,
        "Cloud Computing": riskCategories.low,
        "Accounting": riskCategories.low,  
        "DevOps Engineering": riskCategories.low,          
        "Data Engineering": riskCategories.low,            
        "Machine Learning": riskCategories.low,            
        "Blockchain Development": riskCategories.medium,    
        "UX/UI Design": riskCategories.low, 

        "Business Administration": riskCategories.medium,
        "Graphic Design": riskCategories.medium,
        "Marketing": riskCategories.medium,
        "Healthcare Administration": riskCategories.medium,
        "Project Management": riskCategories.medium,
        "Digital Marketing": riskCategories.medium,         
        "Human Resources": riskCategories.medium,            
        "Supply Chain Management": riskCategories.medium,   
        "Data Analytics": riskCategories.medium,             
        "Technical Writing": riskCategories.medium,         
        "Public Relations": riskCategories.medium,  

        "History": riskCategories.high,
        "Philosophy": riskCategories.high,
        "Fine Arts": riskCategories.high,
        "Classical Literature": riskCategories.high,
        "Anthropology": riskCategories.high,                
        "Archaeology": riskCategories.high,                 
        "Museum Studies": riskCategories.high,              
        "Theater Arts": riskCategories.high,                
        "Creative Writing": riskCategories.high,            
        "Medieval Studies": riskCategories.high,            
        "Linguistics (Theoretical)": riskCategories.high,   
        "Music Theory": riskCategories.high,                
}

export function gpaRisk(gpa){
    let gpaRiskValue =0;

    if(gpa >=3.5){
        gpaRiskValue = riskCategories.low*inputWeightCategory.gpaWeight
    }
    else if(gpa >=2.5){
        gpaRiskValue = riskCategories.medium*inputWeightCategory.gpaWeight
    }
    else{
        gpaRiskValue = riskCategories.high*inputWeightCategory.gpaWeight
    }

    return gpaRiskValue
}

export function courseRisk(course){
    let courseRiskValue = 0
    courseRiskValue  = (courseRiskType[course] || riskCategories.medium) * inputWeightCategory.courseWeight
    return courseRiskValue
}

export function creditScoreRisk(creditScore){
    let creditScoreRiskValue =0;
    if(creditScore >= 650){
        creditScoreRiskValue = riskCategories.low*inputWeightCategory.creditScoreWeight
    }
    else if(creditScore >= 550 && creditScore < 649){
        creditScoreRiskValue = riskCategories.medium*inputWeightCategory.creditScoreWeight
    }
    else{
        creditScoreRiskValue = riskCategories.high*inputWeightCategory.creditScoreWeight
    }
    return creditScoreRiskValue
}

export function getIncomeRisk(income, hasCosigner) {
    if (hasCosigner) {
        return riskCategories.low*inputWeightCategory.cosignerWeight
    }

    if (income >= 1500) {
        return riskCategories.low*inputWeightCategory.incomeWeight
    }

    if (income >= 800) {
        return riskCategories.medium*inputWeightCategory.cosignerWeight
    }

    return riskCategories.high*inputWeightCategory.cosignerWeight
}








