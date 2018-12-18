import { calculateTotalCurrentInventoryValue, calculateEndingCF, calculateAccountPayable } from "../CashFlowProvider/CashFlowProvider";
import { calculateTotalSpent } from "../StoreProvider/StoreProvider";
import { calculateOwnerShipDepreciationAndAmortisation, calculateInterest, calculateNetProfit } from "../ProductSellingReportProvider/ProductSellingReportProvider";
import { calculateDecorationDepreciation } from "../DecorationProvider/DecorationProvider";

export const calculateTotalCurrentAsset = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let result = []
    let cash = calculateEndingCF(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    let currentInventory = calculateTotalCurrentInventoryValue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    result = cash.map((e, index) => {
        return Math.round((e + currentInventory[index]) * 100) / 100
    })
    return result
}

export const calculateAllTotalSpent = (decorationSelected, scenario) => {
    let totalSpentEachYear = []
    let totalSpent = calculateTotalSpent(decorationSelected, scenario)
    for (let i = 0; i <= scenario.BusinessPlayingYear; i++) {
        if (scenario.OwnershipName !== undefined) {
            if (scenario.OwnershipName !== "Buy") {
                totalSpentEachYear.push(totalSpent - scenario.PrivillageCost)
            } else {
                totalSpentEachYear.push(totalSpent)
            }
        } else {
            totalSpentEachYear.push(0)
        }
    }
    return totalSpentEachYear
}
export const calculateIntangible = (scenario) => {
    let totalIntangible = []
    for (let i = 0; i <= scenario.BusinessPlayingYear; i++) {
        if (scenario.OwnershipName !== undefined) {
            if (scenario.OwnershipName !== "Buy") {
                totalIntangible.push(scenario.PrivillageCost)
            } else {
                totalIntangible.push(0)
            }
        } else {
            totalIntangible.push(0)
        }
    }
    return totalIntangible
}
export const calculateAccumulatedDepre = (scenario, stateDecoration) => {
    let accumulated = []
    let total = 0
    if (stateDecoration !== undefined && stateDecoration.length !== 0) {
        stateDecoration.map((e, index) => {
            total += calculateDecorationDepreciation(e)
        })
    }
    for (let i = 0; i <= scenario.BusinessPlayingYear; i++) {
        accumulated.push(((total * i) + (calculateOwnerShipDepreciationAndAmortisation(scenario) * i)) * -1)
    }
    return accumulated
}
export const calculateNonCurrentAssest = (scenario, stateDecoration) => {
    let nonCurrentAssest = []
    let buildingEquipment = calculateAllTotalSpent(stateDecoration, scenario)
    let intangible = calculateIntangible(scenario)
    let accumulated = calculateAccumulatedDepre(scenario, stateDecoration)
    nonCurrentAssest = buildingEquipment.map((e, index) => {
        return e + intangible[index] + accumulated[index]
    })
    return nonCurrentAssest
}
export const calculateTotalAssest = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let totalAssest = []
    let nonAssest = calculateNonCurrentAssest(scenario, decorationSelected)
    let currestAsset = calculateTotalCurrentAsset(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    totalAssest = nonAssest.map((e, index) => {
        return e + currestAsset[index]
    })
    return totalAssest
}
export const calculateTotalCurrentLiability = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let liability = []
    let accountPayable = calculateAccountPayable(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    let interest = calculateInterest(decorationSelected, stateProductSelected, scenario, numberOfYear)
    liability = accountPayable.map((e, index) => {
        return e + interest[index].plan
    })
    return liability
}
export const calculateTotalLiability = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let totalLiability = []
    let liability = calculateTotalCurrentLiability(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    let interest = calculateInterest(decorationSelected, stateProductSelected, scenario, numberOfYear)
    totalLiability = interest.map((e, index) => {
        return e.base + liability[index]
    })
    return totalLiability
}
export const calculateRegister = (scenario) => {
    let register = []
    for (let i = 0; i <= scenario.BusinessPlayingYear; i++) {
        register.push(scenario.BusinessStartMoney)
    }
    return register
}
export const calculateReserve = (scenario) => {
    let reserve = []
    for (let i = 0; i <= scenario.BusinessPlayingYear; i++) {
        if (i !== 0) {
            reserve.push(Math.round((scenario.BusinessStartMoney * (10 / 100)) * 100) / 100)
        } else {
            reserve.push(0)
        }
    }
    return reserve
}
export const calculateUnappropriated = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let unappropriated = []
    let netProfit = calculateNetProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    let reserve = calculateReserve(scenario)
    netProfit.map((e, index) => {
        if (index !== 0) {
            if (index === 1) {
                unappropriated.push(Math.round(((unappropriated[index - 1] + e) - reserve[index]) * 100) / 100)
            } else {
                unappropriated.push(Math.round((unappropriated[index - 1] + e) * 100) / 100)
            }
        } else {
            unappropriated.push(0)
        }
    })
    return unappropriated
}
export const calculateTotalEquity = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let equity = []
    let register = calculateRegister(scenario)
    let reserve = calculateReserve(scenario)
    let unappropriated = calculateUnappropriated(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    equity = register.map((e, index) => {
        return Math.round((e + reserve[index] + unappropriated[index]) * 100) / 100
    })
    return equity
}
export const calculateTotalEquityNLiability = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let total = []
    let equilty = calculateTotalEquity(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    let liability = calculateTotalLiability(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    total = equilty.map((e, index) => {
        return Math.round((e + liability[index]) * 100) / 100
    })
    return total
}
export const check = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected) => {
    let check = []
    let equilty = calculateTotalEquityNLiability(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    let asset = calculateTotalAssest(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, decorationSelected)
    check = equilty.map((e, index) => {
        return Math.round((asset[index] - e) * 100) / 100
    })
    return check
}