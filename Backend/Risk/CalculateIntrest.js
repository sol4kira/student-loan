const lowestRate = 5.3 
const MediumRate = 10.5
const highRate = 13.7



function determineInterestRate(riskValue){
    //determine the intrest based on the risk value
    if(riskValue >= 9.5 && riskValue <=14){
        return lowestRate
    }
    else if(riskValue >= 14.1 && riskValue <=19){
        return MediumRate
    }
    else if(riskValue >= 19.1 && riskValue <=24){
        return lowestRate
    }else{
        return false
    }

}