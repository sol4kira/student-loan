export function validateName(name){
    if(!name) return {ok: false, msg:"Name is required."}
    if(name.length<5 || name.length>20) return {ok: false, msg:"Name must be not less than 5 and not more than 20 characters."}
    if(!/^[a-zA-Z ]+$/.test(name)) return {ok:false,msg:"Name can only contain letters and spaces."}
    return {ok:true}
}

export function validateEmail(email){
    if(!email)return {ok: false, msg:"Email is required."}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailPattern.test(email))return {ok:false,msg:"invalid email format."}
    return {ok: true};
}

export function validateDob(dob){
    if(!dob)return {ok: false, msg:"Date of Birth is required."}

    const birthDate = new Date(dob)
    const today = new Date()


    if(birthDate >= today)return {ok:false,msg:"Date of Birth must be in the past."}

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if(monthDiff < 0 || (monthDiff ===0 && today.getDate() <birthDate.getDate())){
        age--
    }
    if(age<16 || age>25) return {ok:false,msg:"Age must be between 16 and 25 years."}
    
    return {ok: true}
}

export function validateGpa(gpa){
if(!gpa) return{ok: false,msg: "GPA is required"}

const gpaValue = parseFloat(gpa)
const minGPA =2.5
if(isNaN(gpaValue)) return {ok:false, msg:"GPA must be a number."}
if(gpaValue <minGPA) return {ok:false, msg:`GPA must be at least ${minGPA}.`}

return {ok: true}
}

export function validateCreditScore(creditScore, hasCosigner,cosignerCreditScore){
    const minScore = hasCosigner? 600:500

    if(!creditScore) return {ok:false, msg:"Credit Score is Required."}
    if(hasCosigner && !cosignerCreditScore) return {ok: false, msg:"Cosigner's Credit Score is required."}
    const cosignerCreditScoreValue = parseInt(creditScore,10)
    const scoreValue = parseInt(cosignerCreditScore ,10)

    if(isNaN(scoreValue)) return {ok:false, msg:"Credit Score must be a number."}
    if(isNaN(cosignerCreditScoreValue)) return {ok:false, msg:"Credit Score must be a number."}

    const averageCreditScore = hasCosigner ? (scoreValue + cosignerCreditScoreValue) / 2 : scoreValue;

    if(averageCreditScore < minScore ) return {ok: false, msg:`Credit Score Must be higher than ${minScore} because ${hasCosigner? "you have cosigner": "you don't have cosigner"}`}

    return {ok:true}
}

export function validateIncome(income, hasCosigner, cosignerIncome, cosignerName,cosignerEmail, cosignerCreditScore) {
    if (hasCosigner) {
        const cosignerValidation = validateCosignerInfo(cosignerName, cosignerEmail, cosignerIncome)
        if (!cosignerValidation.ok) return cosignerValidation
        return { ok: true } 
    } 
    if (!income) return { ok: false, msg: "Income information is required" }
    return { ok: true }
}

function validateCosignerInfo(cosignerName, cosignerEmail, cosignerIncome) {
    const validatename = validateName(cosignerName)
    const validateemail = validateEmail(cosignerEmail)
    const validateincome = (function() {
        if(!cosignerIncome) return { ok: false, msg: "Cosigner Income information is required" }
        return { ok: true }
    })()

    if(validatename.ok && validateemail.ok && validateincome.ok) {
        return { ok: true }
    }
    else{
        return{
            ok:false, msg: `Cosigner information is invalid. ${validatename.msg || validateemail.msg|| validateincome.msg}`
        }
    }
}   
