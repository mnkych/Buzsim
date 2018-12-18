import { optionsTime } from './TimeData';
import { calculateDecorationScore, calculateTotolCostOfDecoration, calculateTotalDecorationHourElectricity } from '../DecorationProvider/DecorationProvider';
import { calculateAssistEmployeeWorkingHourScore, calculateMainEmployeeWorkingHourScore } from '../HumanResourceProvider/HumanResorceProvider';
import { calculatePromotionChannelScore, calculateViewerScore } from '../MarketingProvider/MarketingProvider';
import { calculateProductTypeVariety, calculateQualityProductScore, calculateTotalPurchased } from '../ProductProvider/ProductProvider';
import { calculateProductSelling } from '../ProductSellingReportProvider/ProductSellingReportProvider'

export const redirectPage = (path) => {
    window.location.pathname = path;
}
export const calculateTotalCompetitorScore = (stateArray) => {
    let result = 0
    if (stateArray !== undefined && stateArray.length > 0) {
        stateArray.map(element => {
            result += (element.DecorationScore +
                element.ProductVarietyScore +
                element.ProductQualityScore +
                element.SizeScore +
                element.DayScore +
                element.TimeScore +
                element.NumberOfEmployeeScore +
                element.NumberOfAssistanceScore +
                element.MarketingFrequencyScore +
                element.MarketingVarietyScore
            )
        })   
    } 
    return result
}
export const getNumberOptions = (initial,end) =>{
    let options = []
    for(let i = initial ; i <= end ; i++){
        options.push(
                { key: i, text: i, value: i },
        )
    }
    return options
}
export const getTimeChoices = () => {
    return optionsTime
}
export const calculateStoreOperatingTime = (timeOpen, timeClose) => {
    return timeClose - timeOpen
}
export const calculatePopulationNeedProd = (scenario, location) => {
    const result = calculateEffectPopulation(scenario) * calculatePopulationInArea(location)
    return result
}
export const calculatePopulationInArea = (location) => {
    let result = 0
    if (location !== undefined) {
        result = location.TotalPopulation * (location.TradingPopulationRatio / 100)
    }
    return result
}
export const calculateEffectPopulation = (scenario) => {
    let result = 0
    if (scenario !== undefined) {
        result = (scenario.BusinessGrossDemand + scenario.BusinessEconomicEvent) / 100
    }
    return result
}
export const calculateOperatingDayScore = (day) => {
    let result = 0
    if (day !== undefined && day !== 0) {
        result = (day / 7) * 10
    }
    return result
}
export const calculateOperatingHourScore = (hour) => {
    let result = 0
    if (hour !== undefined && hour !== 0) {
        result = (hour / 24) * 10
    }
    return result
}
export const calculateTotalStoreOperatingHours = (day, hour) => {
    if (day !== undefined && hour !== undefined) {
        return day * hour
    } else {
        return 0
    }
}
export const calculateMarketShare = (stateCompetitor, stateDec, stateDecChoice, sizeState, day, hour, stateFull, statePart, stateProduct, stateMarket, stateMarketChoice, scenario, location, stateProductChoice, stateProductChoiceOption) => {
    let sizeScore = 0
    if (sizeState !== undefined) {
        sizeScore = sizeState.MarketSharedScore
    }
    const myTotal = calculateDecorationScore(stateDec, stateDecChoice) +
        sizeScore +
        calculateOperatingDayScore(day) +
        calculateOperatingHourScore(hour) +
        calculateMainEmployeeWorkingHourScore(stateFull, statePart, day, hour) +
        calculateQualityProductScore(stateProduct, stateProductChoiceOption) +
        calculateProductTypeVariety(stateProduct, stateProductChoice) +
        calculateAssistEmployeeWorkingHourScore(stateFull, statePart, day, hour) +
        calculatePromotionChannelScore(stateMarket, stateMarketChoice) +
        calculateViewerScore(stateMarket, scenario, location)
    const allCompetitor = calculateTotalCompetitorScore(stateCompetitor)
    let sum = myTotal + allCompetitor
    if(sum === 0){
        sum = 1
    }
    const result = (myTotal / sum) * 100
    return Math.round(result * 100) / 100
}
export const calculateTotalDept = (decoration, product, privilege) => {
    let result = 0
    if (decoration !== undefined) {
        result += calculateTotolCostOfDecoration(decoration)
    }
    if (product !== undefined) {
        result += calculateTotalPurchased(product) * 12
    }
    if (privilege !== undefined) {
        if (privilege.PrivillageCost !== undefined) {
            result += privilege.PrivillageCost
        }
        result = privilege.BusinessStartMoney - result
    }
    return result
}

export const calculateTotalSpent = (decoration, privilege) => {
    let result = 0
    if (decoration !== undefined) {
        result += calculateTotolCostOfDecoration(decoration)
    }
    if (privilege !== undefined) {
        if (privilege.PrivillageCost !== undefined) {
            result += privilege.PrivillageCost
        }
    }
    return result
}
export const calculateElectricity = (stateDecoration, stateOwnership, hour, stateSize) => {
    let totalElectricity = 0
    if (stateOwnership.OwnerBaseElectricityPerUnit === undefined) {
        stateOwnership = { OwnerBaseElectricityPerUnit: 0 }      
    }
    if (stateSize.BaseElectricityUnitOnSize === undefined) {
        stateSize = { BaseElectricityUnitOnSize: 0 }
    }
    if (hour === undefined) {
        hour = 1
    }
    totalElectricity = (calculateTotalDecorationHourElectricity(stateDecoration) + stateSize.BaseElectricityUnitOnSize) * stateOwnership.OwnerBaseElectricityPerUnit * hour * 30
    return Math.round(totalElectricity * 100) / 100
}
export const calculateSignateAndLandTax = (stateOwnership, scenario) => {
    let totalSignateLandTax = 0
    if (stateOwnership !== undefined || scenario !== undefined) {
        if (stateOwnership.OwnershipName != undefined) {
            if (stateOwnership.OwnershipName === 'Buy') {
                if (scenario.PrivillageCost !== undefined) {
                    totalSignateLandTax = scenario.PrivillageCost * (stateOwnership.LandTaxCost / 100)
                }
            } else {
                totalSignateLandTax = stateOwnership.LandTaxCost
            }
        }
    }
    return totalSignateLandTax
}
export const calculateTotalCost = (decoration, privilege, stateArrayProduct) => {
    return calculateTotalSpent(decoration, privilege) + calculateTotalPurchased(stateArrayProduct)
}
export const calculateEstimateSale = (productSelected, productTypeAcceptSelected, employeeSelected, parttimeEmployeeSelected, totalTimeSelected, daySelected, businessScenarioData, locationSelected, marketShared, numberYearOfPlaying, targetGroupSelected) => {
    let estimated = []
    estimated = calculateProductSelling(productSelected, productTypeAcceptSelected, employeeSelected, parttimeEmployeeSelected, totalTimeSelected, daySelected, businessScenarioData, locationSelected, marketShared, numberYearOfPlaying, targetGroupSelected)
    return estimated
}
export const calculateMaintainace = (revenue, stateOwnership) => {
    return revenue * (stateOwnership.MaintainCost / 100)
}