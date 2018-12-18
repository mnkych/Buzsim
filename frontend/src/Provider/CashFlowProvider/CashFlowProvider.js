import {
    calculateProductSelling,
    calculateTotalCostOfGoodSold,
    calculateRental,
    calculateTotalWage,
    calculateUtility,
    calculateOperatingLicense,
    calculateAllofMarketing,
    calculateAllStorageCost,
    calculateAllOtherCost,
    calculateInterest,
    calculateNetProfit,
    calculateAllDepreciation,
    calculateAllAmortisation
} from '../ProductSellingReportProvider/ProductSellingReportProvider'
import { calculateTotalDept } from '../StoreProvider/StoreProvider';

export const calculateTotalCurrentInventoryValue = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let totalValue = []
    let productSelling = calculateProductSelling(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    totalValue = productSelling.map((element, index) => {
        let total = 0
        element.map(e => {
            total += e.currentInventoryValue
        })
        return Math.round(total * 100) / 100
    })

    return totalValue
}

export const calculateAccountPayable = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let totalPayable = []
    let totalCostOfGoodSold = [], rental = [], totalWage = [], utility = [], operatingLicense = [], allofMarketing = [], allStorageCost = [], allOtherCost = []
    totalCostOfGoodSold = calculateTotalCostOfGoodSold(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    rental = calculateRental(scenario, numberOfYear)
    totalWage = calculateTotalWage(stateMainEmployee, statePartEmp, numberOfYear)
    utility = calculateUtility(decorationSelected, scenario, hour, scenario, numberOfYear)
    operatingLicense = calculateOperatingLicense(scenario, numberOfYear)
    allofMarketing = calculateAllofMarketing(stateMarketing, scenario, numberOfYear)
    allStorageCost = calculateAllStorageCost(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    allOtherCost = calculateAllOtherCost(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    totalPayable = totalCostOfGoodSold.map((e, index) => {
        return Math.round((((e + rental[index] + totalWage[index] + utility[index] + operatingLicense[index] + allofMarketing[index] + allStorageCost[index] + allOtherCost[index]) / 365) * 30) * 100) / 100
    })
    return totalPayable
}

export const calculateNetWorkingCapital = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let networkingCapital = [], totalCurrentInventoryValue = [], accountPayable = [], interest = []
    totalCurrentInventoryValue = calculateTotalCurrentInventoryValue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    accountPayable = calculateAccountPayable(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    interest = calculateInterest(decorationSelected, stateProductSelected, scenario, numberOfYear)
    networkingCapital = totalCurrentInventoryValue.map((e, index) => {
        return Math.round((e - accountPayable[index] - interest[index].plan) * 100) / 100
    })
    return networkingCapital
}

export const calculateChangeInNetWorkingCapital = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let changeInNetworkCapital = [], networkingCapital = []
    networkingCapital = calculateNetWorkingCapital(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    changeInNetworkCapital = networkingCapital.map((e, index) => {
        if (index !== 0) {
            return Math.round(((e - networkingCapital[index - 1]) * -1) * 100) / 100
        } else {
            return 0
        }
    })
    return changeInNetworkCapital
}

export const calculateTotalOperatingCashFlow = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let totalOperatingCashFlow = [], operatingProfit = [], depreciation = [], amortisation = [], interest = [], change = []
    operatingProfit = calculateNetProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    depreciation = calculateAllDepreciation(scenario, decorationSelected, numberOfYear)
    amortisation = calculateAllAmortisation(scenario, numberOfYear)
    interest = calculateInterest(decorationSelected, stateProductSelected, scenario, numberOfYear)
    change = calculateChangeInNetWorkingCapital(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    totalOperatingCashFlow = operatingProfit.map((e, index) => {
        return Math.round((e + depreciation[index] + amortisation[index] + interest[index].interest + change[index]) * 100) / 100
    })
    return totalOperatingCashFlow
}

export const calculateTotalFinancialCashFlow = (stateDecoration, stateProductSelected, scenario, numberOfYear) => {
    let totalOperatingCashFlow = [], loan = []
    loan = calculateInterest(stateDecoration, stateProductSelected, scenario, numberOfYear)
    totalOperatingCashFlow = loan.map((e, index) => {
        if (index === 0) {
            if (calculateTotalDept(stateDecoration, stateProductSelected, scenario) < 0) {
                return scenario.BusinessStartMoney + (calculateTotalDept(stateDecoration, stateProductSelected, scenario) * (-1))
            } else {
                return scenario.BusinessStartMoney
            }
        } else {
            return (e.plan * (-1)) + (e.interest * (-1))
        }
    })
    return totalOperatingCashFlow
}

export const calcualateNetCashFlow = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let totalOperatingCashFlow = [], totalFinancialCashFlow = [], netCashFlow = [], investment = 0
    totalOperatingCashFlow = calculateTotalOperatingCashFlow(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    totalFinancialCashFlow = calculateTotalFinancialCashFlow(decorationSelected, stateProductSelected, scenario, numberOfYear)
    investment = Math.round(((scenario.BusinessStartMoney - calculateTotalDept(decorationSelected, stateProductSelected, scenario)) * (-1)) * 100) / 100
    netCashFlow = totalOperatingCashFlow.map((e, index) => {
        if (index === 0) {
            return Math.round((e + totalFinancialCashFlow[index] + investment) * 100) / 100
        } else {
            return Math.round((e + totalFinancialCashFlow[index]) * 100) / 100
        }
    })
    return netCashFlow
}
export const calculateBeginningCF = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let beginningCF = [], endingCF = []
    endingCF = calculateEndingCF(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    beginningCF = endingCF.map((e, index) => {
        if (index === 0) {
            return 0
        } else {
            return endingCF[index - 1]
        }
    })
    return beginningCF
}
export const calculateEndingCF = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let netCF = [], endingCF = []
    netCF = calcualateNetCashFlow(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    netCF.map((e, index) => {
        if (index === 0) {
            endingCF.push(e)
        } else {
            endingCF.push(Math.round((e + endingCF[index - 1]) * 100) / 100)
        }
    })
    return endingCF
}

export const calculateIRR = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let netCF = [], irr = 0, investment = 0
    netCF = calcualateNetCashFlow(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    investment = Math.round(((scenario.BusinessStartMoney - calculateTotalDept(decorationSelected, stateProductSelected, scenario)) * (-1)) * 100) / 100
    netCF = netCF.map((e, index) => {
        if (index === 0) {
            return investment
        } else {
            return e
        }
    })
    irr = IRRCalc(netCF)
    return irr
}

export const IRRCalc = (CArray) => {
    let min = -1.0;
    let max = 1.0;
    let guess = (min + max) / 2;
    let lastGuess = 1.0
    let notSame = true
    let NPV = 0;
    do {
        NPV = 0;
        guess = (min + max) / 2;
        if (Math.abs(lastGuess - guess) < 0.0000000000000000001) notSame = false
        lastGuess = guess
        for (let j = 0; j < CArray.length; j++) {
            NPV += PVCalc(CArray[j], guess, j);
        }
        if (NPV > 0) {
            min = guess;
        } else {
            max = guess;
        }
    } while (notSame && (Math.abs(NPV) > 0.0000000000000000001));
    let raw = parseFloat(guess * 100).toFixed(2);
    return parseFloat(raw);
}

export const PVCalc = (money, interest, n) => {
    return money / (Math.pow(1 + interest, n))
}