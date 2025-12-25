import express from 'express'
import {
    validateName,
    validateEmail,
    validateDob,
    validateCreditScore,
    validateGpa,
    validateIncome,
} from 'Validators\validation.js'

import{
    gpaRisk,
    courseRisk,
    creditScoreRisk,
    getIncomeRisk
} from 'Risk\caluclateRisk.js'

import {determineFinalInterestRate} from 'Risk\CalculateIntrest.js'

const routes = express.Router()

routes.post('/apply', (req, res)=>{
    const studentData = req.body
    const errors =[]

    //valid name
    const nameValidation = validateName(studentData.name)
    if(!nameValidation.ok){
        errors.push({field:"name",msg:nameValidation.msg})
    }

    //valid email
    const emailValidation = validateEmail(studentData.email)
    if(!emailValidation.ok){
        errors.push({field:"email",msg:emailValidation.msg})
    }

    //valid dob
    const dobValidation = validateDob(studentData.dob)
    if(!dobValidation.ok){
        errors.push({field:"DOB",msg:dobValidation.msg})
    }

    // valid GPA
    const gpaValidation = validateGpa(studentData.gpa)
    if(!gpaValidation.ok){
        errors.push({field:"DOB",msg:gpaValidation.msg})
    }

    //valid credit score
    const creditScoreValidation = validateCreditScore(studentData.creditScore,studentData.hasCosigner, studentData.cosignerCreditScore)
    if(!creditScoreValidation.ok){
        errors.push({field:"Credit Score",msg:creditScoreValidation.msg})
    }
    //valid income
    const incomeValidation = validateIncome(studentData.income, studentData.hasCosigner, studentData.cosignerIncome, studentData.cosignerName, studentData.cosignerEmail, studentData.cosignerCreditScore)
    if(!incomeValidation.ok){
        errors.push({field:"Income",msg:incomeValidation.msg})
    }

    //calculate risk and decide loan risk value
    const gpaRiskValue = gpaRisk(studentData.gpa)
    const courseRiskValue = courseRisk(studentData.course)
    const creditScoreRiskValue = creditScoreRisk(studentData.creditScore)
    const incomeRiskValue = getIncomeRisk(studentData.income, studentData.hasCosigner)

    const totalRiskValue = gpaRiskValue + courseRiskValue + creditScoreRiskValue + incomeRiskValue

    const intrestRate = determineFinalInterestRate(totalRiskValue, studentData.paymentPlanMonths)


    if(errors.length > 0){
        return res.status(400).json({errors: validationResult.errors})
    }
    
    res.json({ok:true,message:"Loan application received successfully", data})
})
