import { calculateMainEmployeeWorkingHour, findMaxExpFromFullMain, calculateAssistEmployeeWorkingHour, calculateTotalCostValue, calculateTotalParttimeWagePerMonthValue } from '../HumanResourceProvider/HumanResorceProvider'
import { getProductByObjectID, isProductObjectPass, isSomeProductPass } from '../ProductProvider/ProductProvider'
import { calculateAllCostOfMarketing } from '../MarketingProvider/MarketingProvider'
import { calculateTotalStoreOperatingHours, calculateElectricity, calculateMaintainace, calculateSignateAndLandTax, calculateTotalDept } from '../StoreProvider/StoreProvider'
import { calculateDecorationDepreciation } from '../DecorationProvider/DecorationProvider'

export const calculateTotalPopulation = (location, numberOfYear) => {
    let totalPop = []
    if (location === undefined || numberOfYear === undefined) {
        if (location === undefined) {
            location = { LocationID: "", LocationName: "", TotalPopulation: 0, TradingPopulationRatio: 0, TotalPopulationGrowUpRate: 0 }
        }
        if (numberOfYear === undefined) {
            numberOfYear = 10
        }
    }
    for (var i = 0; i <= numberOfYear; i++) {
        let yearAgo = 0
        if (i == 0) {
            yearAgo = location.TotalPopulation
        } else {
            yearAgo = totalPop[i - 1] + (totalPop[i - 1] * (location.TotalPopulationGrowUpRate / 100))
        }
        totalPop.push(Math.round(yearAgo))
    }
    return totalPop
}
export const calculateTotalPopulationWithTradingPop = (stateLocation, numberOfYear) => {
    let totalTradingPop = []
    if (stateLocation === undefined || numberOfYear === undefined) {
        if (stateLocation === undefined) {
            stateLocation = { LocationID: "", LocationName: "", TotalPopulation: 0, TradingPopulationRatio: 0, TotalPopulationGrowUpRate: 0 }
        }
        if (numberOfYear === undefined) {
            numberOfYear = 10
        }
    }
    totalTradingPop = calculateTotalPopulation(stateLocation, numberOfYear).map((e, index) => {
        return Math.round(e * (stateLocation.TradingPopulationRatio / 100))
    })
    return totalTradingPop
}
export const calculateGrossDemand = (scenario, numberOfYear) => {
    let grossDemand = []
    if (numberOfYear === undefined) {
        numberOfYear = 10
    }
    if (scenario !== undefined) {
        for (var i = 0; i <= numberOfYear; i++) {
            let demand = 0
            if (i == 0) {
                demand = scenario.BusinessGrossDemand
            } else {
                if(scenario.economic){
                    demand = grossDemand[i - 1] + scenario.BusinessEconomicEvent + scenario.BusinessGrossDemandGrowUpRate + scenario.economic[i]
                }else{
                    demand = grossDemand[i - 1] + scenario.BusinessEconomicEvent + scenario.BusinessGrossDemandGrowUpRate
                }
            }
            grossDemand.push(Math.round(demand))
        }
    } else {
        for (var i = 0; i <= numberOfYear; i++) {
            grossDemand.push(0)
        }
    }
    return grossDemand
}
export const calculateTotalPopulationNeedProduct = (scenario, stateLocation, numberOfYear) => {
    let totalPopNeedPro = []
    let gross = calculateGrossDemand(scenario, numberOfYear)
    totalPopNeedPro = calculateTotalPopulationWithTradingPop(stateLocation, numberOfYear).map((e, index) => {
        return Math.round(e * (gross[index] / 100))
    })
    return totalPopNeedPro
}
export const calculatePopNeedProductWithMarketShared = (scenario, stateLocation, marketShared, numberOfYear) => {
    let totalNeedProInYourStore = []
    if (marketShared === undefined) {
        marketShared = 0
    }
    let totalNeedPro = calculateTotalPopulationNeedProduct(scenario, stateLocation, numberOfYear)
    totalNeedProInYourStore = totalNeedPro.map((e, index) => {
        return Math.round(e * (marketShared / 100))
    })
    return totalNeedProInYourStore
}
export const calculateCustomerAllTargetGroupWithOperatingDay = (stateDay, scenario, stateLocation, marketShared, numberOfYear) => {
    let customer = []
    if (stateDay === undefined) {
        stateDay = 0
    }
    let totalNeedProInYourStore = calculatePopNeedProductWithMarketShared(scenario, stateLocation, marketShared, numberOfYear)
    customer = totalNeedProInYourStore.map((e, index) => {
        return Math.round((((stateDay / 7) * 365) / 365) * e)
    })
    return customer
}
export const calculateCustomerAllTargetGroupWithOperatingHour = (hour, stateDay, scenario, stateLocation, marketShared, numberOfYear) => {
    let customer = []
    if (hour === undefined) {
        hour = 0
    }
    let customerOnDay = calculateCustomerAllTargetGroupWithOperatingDay(stateDay, scenario, stateLocation, marketShared, numberOfYear)
    customer = customerOnDay.map((e, index) => {
        return Math.round((hour / 24) * e)
    })
    return customer
}
export const calculateCustomerWithEmployeeTimeService = (stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear) => {
    let customer = []
    let customerOnHour = calculateCustomerAllTargetGroupWithOperatingHour(hour, stateDay, scenario, stateLocation, marketShared, numberOfYear)
    if (calculateMainEmployeeWorkingHour(stateMainEmployee, statePartEmp) >= calculateTotalStoreOperatingHours(stateDay, hour)) {
        customer = customerOnHour
    } else {
        customer = customerOnHour.map((e, index) => {
            return Math.round((calculateMainEmployeeWorkingHour(stateMainEmployee, statePartEmp) / calculateTotalStoreOperatingHours(stateDay, hour)) * e)
        })
    }
    return customer
}
export const calculateCustomerWithMainEmployeeExp = (stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear) => {
    let customer = []
    let maxExp = 0
    let customerOnService = calculateCustomerWithEmployeeTimeService(stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear)
    maxExp = findMaxExpFromFullMain(stateMainEmployee, statePartEmp)
    switch (maxExp) {
        case 1:
        case 2: customer = customerOnService.map((e, index) => { return Math.round(e * (50 / 100)) })
            break;
        case 3:
        case 4: customer = customerOnService.map((e, index) => { return Math.round(e * (60 / 100)) })
            break;
        case 5:
        case 6: customer = customerOnService.map((e, index) => { return Math.round(e * (70 / 100)) })
            break;
        case 7:
        case 8: customer = customerOnService.map((e, index) => { return Math.round(e * (80 / 100)) })
            break;
        case 9: customer = customerOnService.map((e, index) => { return Math.round(e * (90 / 100)) })
            break;
        case 10: customer = customerOnService.map((e, index) => { return e })
            break;
        default: customer = customerOnService.map((e, index) => { return Math.round(e * (40 / 100)) })
    }
    return customer
}
export const calculateCustomerByAssistant = (stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear) => {
    let customer = []
    customer = calculateCustomerWithMainEmployeeExp(stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear)
    let timeOfAssist = calculateAssistEmployeeWorkingHour(stateMainEmployee, statePartEmp)
    let timeOfMain = calculateMainEmployeeWorkingHour(stateMainEmployee, statePartEmp)
    if (timeOfAssist >= timeOfMain) {
        customer = customer.map((e, index) => {
            return Math.round(e * (120 / 100))
        })
    }
    return customer
}
export const calculateCustomerWithTargetGroup = (stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let customer = []
    if (stateTargetGroup === undefined) {
        stateTargetGroup = { TargetGroupID: "", TargetGroupName: "", TargetGroupGrowUpRatio: 0, TargetGroupQuantityRatio: 0 }
    }
    let oldCustomer = calculateCustomerByAssistant(stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear)
    let quantityRatio = stateTargetGroup.TargetGroupQuantityRatio
    customer = oldCustomer.map((e, index) => {
        if (index > 1) {
            quantityRatio += stateTargetGroup.TargetGroupGrowUpRatio
        }
        return Math.round(e * (quantityRatio / 100))
    })
    return customer
}
export const calculateProductCustomerNeed = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let customerInEachProduct = []
    let customerOnTarget = calculateCustomerWithTargetGroup(stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let acceptRatio = 0
    if (isSomeProductPass(stateProductSelected) === true) {
        stateProductSelected = stateProductSelected.filter(e => {
            return isProductObjectPass(e)
        })

        if (productTypeAcceptSelected === undefined) {
            productTypeAcceptSelected = stateProductSelected.map(e => {
                return { AcceptRatio: 0, AcceptRatioGrowUpRate: 0, MaximumPriceRate: 0, ProductID: e.ProductID }
            })
        }
        customerInEachProduct = customerOnTarget.map((element, index) => {
            let tmpProductCust = productTypeAcceptSelected.map(e => {
                let match = getProductByObjectID(e, stateProductSelected)
                acceptRatio = e.AcceptRatio
                if (match !== undefined) {
                    if (index >= 1) {
                        acceptRatio = acceptRatio + (e.AcceptRatioGrowUpRate * index)
                    }
                    return { populationNeedProduct: Math.round((acceptRatio / 100) * element), ...match, MaximumPriceRate: e.MaximumPriceRate, productSellingPricePercentage: 0, amountBeforeSell: 0, amountAfterSell: 0, revenue: 0, costOfGoodSold: 0, productLoss: 0, amountAfterDepreciation: 0, sellingPricePerYear: 0, BasePricePerUnitPerYear: 0, currentInventoryValue: 0 }
                }
            })
            return tmpProductCust.filter(e => {
                return e !== undefined
            })
        })
    } else {
        customerOnTarget.map((e, index) => {
            customerInEachProduct.push([
                {
                    populationNeedProduct: 0, MaximumPriceRate: 0, ProductID: "", amount: 0, sellingPrice: 0, productDetail: {
                        BasePricePerUnit: 0, BusinessID: "", BusinessProductSellerID: "", MarketSharedScore: 0, ProductDepreciationRatio: 10,
                        ProductID: "", ProductName: "", ProductQualityID: "", ProductType: "", QualityID: "", QualityName: ""
                    },
                    productSellingPricePercentage: 0, amountBeforeSell: 0, amountAfterSell: 0, revenue: 0, costOfGoodSold: 0, productLoss: 0, amountAfterDepreciation: 0, sellingPricePerYear: 0, BasePricePerUnitPerYear: 0, currentInventoryValue: 0
                }
            ])
        })
    }
    return customerInEachProduct
}
export const calculateProductSellingPricePercentage = (sellingPricePerYear, BasePricePerUnitPerYear) => {
    let percent = undefined
    if (sellingPricePerYear !== undefined && BasePricePerUnitPerYear) {
        percent = Math.round((((sellingPricePerYear - BasePricePerUnitPerYear) / BasePricePerUnitPerYear) * 100) * 100) / 100
    }
    return percent
}
export const caseChecking = (e, groupID) => {
    if (groupID === 3) {
        if (e.productSellingPricePercentage <= e.MaximumPriceRate) {
            if (e.productSellingPricePercentage < 10) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (0 / 100)))
            }
            if (e.productSellingPricePercentage >= 10 && e.productSellingPricePercentage <= 30) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-5 / 100)))
            }
            if (e.productSellingPricePercentage >= 31 && e.productSellingPricePercentage <= 60) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-10 / 100)))
            }
            if (e.productSellingPricePercentage >= 61 && e.productSellingPricePercentage <= 90) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-20 / 100)))
            }
            if (e.productSellingPricePercentage >= 91 && e.productSellingPricePercentage <= 150) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-40 / 100)))
            }
            if (e.productSellingPricePercentage >= 151 && e.productSellingPricePercentage <= 300) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-60 / 100)))
            }
            if (e.productSellingPricePercentage >= 301 && e.productSellingPricePercentage <= 600) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
            }
            if (e.productSellingPricePercentage >= 601 && e.productSellingPricePercentage <= 1000) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
            }
            if (e.productSellingPricePercentage > 1000) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
            }
        } else {
            e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
        }
    }
    if (groupID === 2) {
        if (e.productSellingPricePercentage <= e.MaximumPriceRate) {
            if (e.productSellingPricePercentage < 10) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (0 / 100)))
            }
            if (e.productSellingPricePercentage >= 10 && e.productSellingPricePercentage <= 30) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (0 / 100)))
            }
            if (e.productSellingPricePercentage >= 31 && e.productSellingPricePercentage <= 60) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-5 / 100)))
            }
            if (e.productSellingPricePercentage >= 61 && e.productSellingPricePercentage <= 90) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-10 / 100)))
            }
            if (e.productSellingPricePercentage >= 91 && e.productSellingPricePercentage <= 150) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-20 / 100)))
            }
            if (e.productSellingPricePercentage >= 151 && e.productSellingPricePercentage <= 300) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-40 / 100)))
            }
            if (e.productSellingPricePercentage >= 301 && e.productSellingPricePercentage <= 600) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-80 / 100)))
            }
            if (e.productSellingPricePercentage >= 601 && e.productSellingPricePercentage <= 1000) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
            }
            if (e.productSellingPricePercentage > 1000) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
            }
        } else {
            e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
        }
    }
    if (groupID === 1) {
        if (e.productSellingPricePercentage <= e.MaximumPriceRate) {
            if (e.productSellingPricePercentage < 10) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (0 / 100)))
            }
            if (e.productSellingPricePercentage >= 10 && e.productSellingPricePercentage <= 30) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (0 / 100)))
            }
            if (e.productSellingPricePercentage >= 31 && e.productSellingPricePercentage <= 60) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (0 / 100)))
            }
            if (e.productSellingPricePercentage >= 61 && e.productSellingPricePercentage <= 90) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-5 / 100)))
            }
            if (e.productSellingPricePercentage >= 91 && e.productSellingPricePercentage <= 150) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-10 / 100)))
            }
            if (e.productSellingPricePercentage >= 151 && e.productSellingPricePercentage <= 300) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-30 / 100)))
            }
            if (e.productSellingPricePercentage >= 301 && e.productSellingPricePercentage <= 600) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-60 / 100)))
            }
            if (e.productSellingPricePercentage >= 601 && e.productSellingPricePercentage <= 1000) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-90 / 100)))
            }
            if (e.productSellingPricePercentage > 1000) {
                e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
            }
        } else {
            e.populationNeedProduct = Math.round(e.populationNeedProduct * (1 + (-100 / 100)))
        }
    }
    return e
}
export const calculateProductCase = (arrayCustNeedObj, TargetGroupID) => {
    let productForSell = {
        populationNeedProduct: 0, MaximumPriceRate: 0, ProductID: "", amount: 0, sellingPrice: 0, productDetail: {
            BasePricePerUnit: 0, BusinessID: "", BusinessProductSellerID: "", MarketSharedScore: 0, ProductDepreciationRatio: 10,
            ProductID: "", ProductName: "", ProductQualityID: "", ProductType: "", QualityID: "", QualityName: ""
        },
        productSellingPricePercentage: 0, amountBeforeSell: 0, amountAfterSell: 0, revenue: 0, costOfGoodSold: 0, productLoss: 0, amountAfterDepreciation: 0, sellingPricePerYear: 0, BasePricePerUnitPerYear: 0, currentInventoryValue: 0
    }
    switch (TargetGroupID) {
        case 1: productForSell = caseChecking(arrayCustNeedObj, 1)
            break;
        case 2: productForSell = caseChecking(arrayCustNeedObj, 2)
            break;
        case 3: productForSell = caseChecking(arrayCustNeedObj, 3)
            break;
    }
    return productForSell
}
export const calculateProductSelling = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let productForSell = []
    let productCasePassing = calculateProductCustomerNeed(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    if (stateTargetGroup === undefined) {
        stateTargetGroup = { TargetGroupID: "", TargetGroupName: "", TargetGroupGrowUpRatio: 0, TargetGroupQuantityRatio: 0 }
    }
    productForSell = productCasePassing.map((element, indexYear) => {
        return element.map((e, indexProduct) => {
            if (indexYear >= 1) {
                e.amountBeforeSell = (e.amount * 12)
                if (indexYear === 1) {
                    e.sellingPricePerYear = e.sellingPrice
                    e.BasePricePerUnitPerYear = e.productDetail.BasePricePerUnit
                }
                if (indexYear > 1) {
                    let lastYearSelling = productCasePassing[indexYear - 1][indexProduct].sellingPricePerYear
                    let lastYearBasePrice = productCasePassing[indexYear - 1][indexProduct].BasePricePerUnitPerYear
                    e.sellingPricePerYear = Math.round((lastYearSelling + (lastYearSelling * (scenario.BusinessPriceGrowthPolicy / 100))) * 100) / 100
                    e.BasePricePerUnitPerYear = Math.round((lastYearBasePrice + (lastYearBasePrice * (scenario.BusinessInflation / 100))) * 100) / 100
                    e.amountBeforeSell = e.amountBeforeSell + productCasePassing[indexYear - 1][indexProduct].amountAfterDepreciation
                }
                e.productSellingPricePercentage = calculateProductSellingPricePercentage(e.sellingPricePerYear, e.BasePricePerUnitPerYear)
                e = calculateProductCase(e, stateTargetGroup.TargetGroupID)
                if (e.populationNeedProduct > e.amountBeforeSell) {
                    e.populationNeedProduct = e.amountBeforeSell
                }
                e.amountAfterSell = e.amountBeforeSell - e.populationNeedProduct
                e.revenue = Math.round((e.sellingPricePerYear * e.populationNeedProduct) * 100) / 100
                e.costOfGoodSold = Math.round((e.BasePricePerUnitPerYear * e.populationNeedProduct) * 100) / 100
                e.productLoss = Math.round(e.amountAfterSell * (productCasePassing[indexYear][indexProduct].productDetail.ProductDepreciationRatio / 100))
                e.amountAfterDepreciation = e.amountAfterSell - e.productLoss
                e.currentInventoryValue = e.amountAfterDepreciation * e.BasePricePerUnitPerYear
            } else {
                e.sellingPricePerYear = e.sellingPrice
                e.BasePricePerUnitPerYear = e.productDetail.BasePricePerUnit
                e.currentInventoryValue = (e.amount * 12) * e.BasePricePerUnitPerYear
            }
            return { ...e }
        })
    })
    return productForSell
}
export const calculateTotalRevenue = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let totalRevenue = []
    let productSelling = calculateProductSelling(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    totalRevenue = productSelling.map((element, index) => {
        let total = 0
        element.map(e => {
            total += e.revenue
        })
        return Math.round(total * 100) / 100
    })
    return totalRevenue
}
export const calculateTotalCostOfGoodSold = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let totalCost = []
    let productSelling = calculateProductSelling(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    totalCost = productSelling.map((element, index) => {
        let total = 0
        element.map(e => {
            total += e.costOfGoodSold
        })
        return Math.round(total * 100) / 100
    })
    return totalCost
}
export const calculateGrossProfit = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let grossProfit = []
    let revenue = calculateTotalRevenue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let cost = calculateTotalCostOfGoodSold(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    grossProfit = revenue.map((element, index) => {
        return Math.round((element - cost[index]) * 100) / 100
    })
    return grossProfit
}
export const turnArray = (array2D) => {
    let array = new Array(array2D.length)
    array2D.map((outArr, i) => {
        outArr.map((o, k) => {
            if (!array[k]) {
                array[k] = new Array(o.length)
            }
            array[k][i] = o
        })
    })
    array = array.filter(e => { return e })
    return array
}

export const calculateRental = (scenario, numberOfYear) => {
    let rentalCost = []
    let rentalPerYear = 0
    for (let i = 0; i <= numberOfYear; i++) {
        if (scenario.RentalCost !== undefined) {
            if (i > 1) {
                rentalPerYear = Math.round((rentalCost[i - 1] + (rentalCost[i - 1] * (scenario.BusinessInflation / 100))) * 100) / 100
            } else {
                if (i === 1) {
                    rentalPerYear = (scenario.RentalCost * 12)
                } else {
                    rentalPerYear = 0
                }
            }
        }
        rentalCost.push(rentalPerYear)
    }
    return rentalCost
}

export const calculateFulltimeWage = (employeeObject, bonus, allowance, numberOfYear) => {
    let wageEachJobPerYear = []
    let wagePerYear = 0
    let baseEachYear = []
    for (let i = 0; i <= numberOfYear; i++) {
        if (i > 1) {
            baseEachYear[i] = baseEachYear[i - 1] + (baseEachYear[i - 1] * (employeeObject.BaseSalaryGrowUpRate / 100))
            wagePerYear = calculateTotalCostValue(employeeObject.AdditionPayPerExp, employeeObject.exp, baseEachYear[i - 1], employeeObject.BaseSalaryGrowUpRate, employeeObject.numberOfEmployee, bonus, allowance) * 12
        } else {
            if (i === 1) {
                baseEachYear[i] = employeeObject.BaseSalaryPerMonth
                wagePerYear = calculateTotalCostValue(employeeObject.AdditionPayPerExp, employeeObject.exp, employeeObject.BaseSalaryPerMonth, 0, employeeObject.numberOfEmployee, bonus, allowance) * 12
            } else {
                wagePerYear = 0
            }
        }
        wageEachJobPerYear.push({ ...employeeObject, currentSalary: Math.round(wagePerYear) })
    }
    return wageEachJobPerYear
}

export const calculateParttimeWage = (objectPart, numberOfYear) => {
    let payEachYear = []
    let basePerYear = []
    let payPerYear = 0
    for (let i = 0; i <= numberOfYear; i++) {
        if (i > 1) {
            basePerYear[i] = basePerYear[i - 1] + ((basePerYear[i - 1]) * (objectPart.BaseSalaryGrowUpRate / 100))
            payPerYear = calculateTotalParttimeWagePerMonthValue(basePerYear[i], objectPart.exp, objectPart.AdditionPayPerExp, objectPart.workHourPerDay, objectPart.workDayPerWeek, objectPart.numberOfEmployee) * 12
        } else {
            if (i === 1) {
                basePerYear[i] = objectPart.BasePayPerHour
                payPerYear = calculateTotalParttimeWagePerMonthValue(objectPart.BasePayPerHour, objectPart.exp, objectPart.AdditionPayPerExp, objectPart.workHourPerDay, objectPart.workDayPerWeek, objectPart.numberOfEmployee) * 12
            } else {
                payPerYear = 0
            }
        }
        payEachYear.push({ ...objectPart, currentSalary: Math.round(payPerYear) })
    }
    return payEachYear
}

export const calculateAllOfFulltimeWage = (stateFull, numberOfYear) => {
    let resultPerYear = []
    let result = []
    if (stateFull !== undefined && stateFull.length !== 0) {
        result = stateFull.employeeSelected.map((e, indexJob) => {
            let tmpFullWage = calculateFulltimeWage(e, stateFull.bonus, stateFull.allowance, numberOfYear)
            return tmpFullWage
        })
        result = turnArray(result)
        resultPerYear = result.map((e, current) => {
            return e.reduce((elementNext, current) =>
                elementNext + current.currentSalary, 0
            )
        })
    } else {
        for (let i = 0; i <= numberOfYear; i++) {
            resultPerYear.push(0)
        }
    }
    return resultPerYear
}
export const calculateAllOfParttimeWage = (statePart, numberOfYear) => {
    let resultPerYear = []
    let result = []
    if (statePart !== undefined && statePart.length !== 0) {
        result = statePart.map((e, indexJob) => {
            let tmpFullWage = calculateParttimeWage(e, numberOfYear)
            return tmpFullWage
        })
        result = turnArray(result)
        resultPerYear = result.map((e, current) => {
            return e.reduce((elementNext, current) =>
                elementNext + current.currentSalary, 0
            )
        })
    } else {
        for (let i = 0; i <= numberOfYear; i++) {
            resultPerYear.push(0)
        }
    }
    return resultPerYear
}
export const calculateTotalWage = (stateFull, statePart, numberOfYear) => {
    let resultFull = [], resultPart = [], result = []
    resultFull = calculateAllOfFulltimeWage(stateFull, numberOfYear)
    resultPart = calculateAllOfParttimeWage(statePart, numberOfYear)
    if (resultFull.length === 0 || resultPart.length === 0) {
        if (resultFull.length === 0) {
            result = resultPart.map((e, index) => {
                return e
            })
        }
        if (resultPart.length === 0) {
            result = resultFull.map((e, index) => {
                return e
            })
        }
    } else {
        result = resultFull.map((e, index) => {
            return e + resultPart[index]
        })
    }
    return result
}
export const calculateUtility = (stateDecoration, stateOwnership, hour, stateSize, numberOfYear) => {
    let utility = []
    if (stateOwnership === undefined || stateOwnership.OwnershipID === undefined) {
        stateOwnership = {...stateOwnership, OwnershipID: "", OwnershipName: "", MaintainCost: 0, LandTaxCost: 0, OtherCost: 0, OwnerBaseElectricityPerUnit: 0, OwnerDepreciationAging: 10 }
    }
    if(stateSize === undefined || stateSize.SizeID === undefined){
        stateSize = {...stateSize, SizeID: "", Size: "", Storage: 0, BaseElectricityUnitOnSize: 0, MarketSharedScore: 0 }
    }
    for (let i = 0; i <= numberOfYear; i++) {
        if (i === 0) {
            utility.push(0)
        } else {
            utility.push(calculateElectricity(stateDecoration, stateOwnership, hour, stateSize) * 12)
        }
    }
    return utility
}
export const calculateOperatingLicense = (scenario, numberOfYear) => {
    let operatingLicese = []
    for (let i = 0; i <= numberOfYear; i++) {
        if (i === 0) {
            operatingLicese.push(0)
        } else {
            if (i === 1) {
                operatingLicese.push(scenario.BusinessLicenseCost * 12)
            } else {
                operatingLicese.push(Math.round(
                    (
                        operatingLicese[i - 1] +
                        (operatingLicese[i - 1] * (scenario.BusinessInflation / 100))
                    )
                )
                )
            }
        }
    }
    return operatingLicese
}
export const calculateAccounttingFee = (scenario, numberOfYear) => {
    let accFee = []
    for (let i = 0; i <= numberOfYear; i++) {
        if (i === 0) {
            accFee.push(0)
        } else {
            if (i === 1) {
                if (scenario.AccountingFee !== undefined) {
                    accFee.push(scenario.AccountingFee)
                } else {
                    accFee.push(0)
                }
            } else {
                accFee.push(Math.round(
                    (
                        accFee[i - 1] +
                        (accFee[i - 1] * (scenario.BusinessInflation / 100))
                    )
                )
                )
            }
        }
    }
    return accFee
}

export const calculateAllMaintainance = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateOwnership) => {
    let maintainEachYear = []
    if (stateOwnership === undefined || stateOwnership.OwnershipID === undefined) {
        stateOwnership = {...stateOwnership, OwnershipID: "", OwnershipName: "", MaintainCost: 0, LandTaxCost: 0, OtherCost: 0, OwnerBaseElectricityPerUnit: 0, OwnerDepreciationAging: 10 }
    }
    let revenue = calculateTotalRevenue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    maintainEachYear = revenue.map((e, index) => {
        return Math.round(calculateMaintainace(e, stateOwnership))
    })
    return maintainEachYear
}

export const calculateAllLandTax = (stateOwnership, scenario, numberOfYear) => {
    let landtax = []
    for (let i = 0; i <= numberOfYear; i++) {
        if (i === 0) {
            landtax.push(0)
        } else {
            landtax.push(
                calculateSignateAndLandTax(stateOwnership, scenario)
            )
        }
    }
    return landtax
}
export const calculateAllofMarketing = (stateMarketing, scenario, numberOfYear) => {
    let marketing = []
    for (let i = 0; i <= numberOfYear; i++) {
        if (i === 0) {
            marketing.push(0)
        } else {
            if (i === 1) {
                marketing.push(calculateAllCostOfMarketing(stateMarketing))
            } else {
                marketing.push(Math.round(
                    (
                        marketing[i - 1] +
                        (marketing[i - 1] * (scenario.BusinessInflation / 100))
                    )
                )
                )
            }
        }
    }
    return marketing
}
export const calculateLossProduct = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let totalProductLossValue = 0
    let totalProductLossValueEachYear = []
    let productSelling = turnArray(calculateProductSelling(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup))
    if (productSelling.length !== 0) {
        for (let j = 0; j <= numberOfYear; j++) {
            totalProductLossValue = 0
            for (let i = 0; i < productSelling.length; i++) {
                totalProductLossValue += productSelling[i][j].BasePricePerUnitPerYear * productSelling[i][j].productLoss
            }
            totalProductLossValueEachYear.push(Math.round(totalProductLossValue))
        }
    }
    return totalProductLossValueEachYear
}
export const calculateAllStorageCost = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let totalStorageCost = 0
    let totalStorageEachYear = []
    let totalStorageCostEachYear = []
    let productSelling = turnArray(calculateProductSelling(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup))
    if (productSelling.length !== 0) {
        for (let j = 0; j <= numberOfYear; j++) {
            totalStorageCost = 0
            for (let i = 0; i < productSelling.length; i++) {
                totalStorageCost += productSelling[i][j].amountAfterDepreciation
            }
            totalStorageEachYear.push(Math.round(totalStorageCost))
        }
        totalStorageCostEachYear = totalStorageEachYear.map((e, index) => {
            if (e > scenario.Storage) {
                return (e - scenario.Storage) * 1
            } else {
                return 0
            }
        })
    }
    return totalStorageCostEachYear
}
export const calculateAllOtherCost = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) => {
    let totalRevenueEachYear = []
    let totalRevenue = calculateTotalRevenue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    totalRevenueEachYear = totalRevenue.map((e, index) => {
        if (scenario.OtherCost === undefined) {
            return 0
        }
        return Math.round((e * (scenario.OtherCost / 100)) * 100) / 100
    })
    return totalRevenueEachYear
}
export const calculateSellingAdminiStration = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let storage = calculateAllStorageCost(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let loss = calculateLossProduct(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let marketing = calculateAllofMarketing(stateMarketing, scenario, numberOfYear)
    let landtax = calculateAllLandTax(scenario, scenario, numberOfYear)
    let maintain = calculateAllMaintainance(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, scenario)
    let accountingFee = calculateAccounttingFee(scenario, numberOfYear)
    let operatingLicese = calculateOperatingLicense(scenario, numberOfYear)
    let utility = calculateUtility(stateDecoration, scenario, hour, scenario, numberOfYear)
    let result = []
    result = storage.map((e, index) => {
        return Math.round((e + loss[index] + marketing[index] + landtax[index] + maintain[index] + accountingFee[index] + operatingLicese[index] + utility[index]) * 100) / 100
    })
    return result
}
export const calculateAllExpense = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let sellingNAdmin = calculateSellingAdminiStration(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    let wage = calculateTotalWage(stateMainEmployee, statePartEmp, numberOfYear)
    let OtherCost = calculateAllOtherCost(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let result = []
    result = sellingNAdmin.map((e, index) => {
        return Math.round((e + wage[index] + OtherCost[index]) * 100) / 100
    })
    return result
}
export const calculateEbitda = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let expense = calculateAllExpense(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    let grossProfit = calculateGrossProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let result = []
    result = grossProfit.map((e, index) => {
        return Math.round((e - expense[index]) * 100) / 100
    })
    return result
}
export const calculateAllDepreciation = (stateOwnership, decorationArray, numberOfYear) => {
    let ownerDepreciation = 0
    let totalDepreciation = 0
    let decorateValue = 0
    let result = []
    let totalDecorateValue = []
    if (stateOwnership.OwnershipName !== undefined) {
        if (stateOwnership.OwnershipName !== 'Rent') {
            ownerDepreciation = calculateOwnerShipDepreciationAndAmortisation(stateOwnership)
        }
    }
    for (let i = 0; i <= numberOfYear; i++) {
        if (i !== 0) {
            totalDepreciation = 0
            if (decorationArray !== undefined) {
                totalDecorateValue = decorationArray.map((e, index) => {
                    if (i > e.DecorateDepreciationAging) {
                        return 0
                    } else {
                        return calculateDecorationDepreciation(e)
                    }
                })
            }
            decorateValue = Math.round(totalDecorateValue.reduce((a, b) => a + b, 0))
            if (i > stateOwnership.OwnerDepreciationAging) {
                totalDepreciation = decorateValue
            } else {
                totalDepreciation = decorateValue + ownerDepreciation
            }
            if (stateOwnership.OwnershipName === 'Lease') {
                totalDepreciation -= ownerDepreciation
            }
            result.push(totalDepreciation)
        } else {
            result.push(0)
        }
    }
    return result
}
export const calculateAllAmortisation = (stateOwnership, numberOfYear) => {
    let ownerDepreciation = 0
    let result = []
    if (stateOwnership.OwnershipName === 'Lease') {
        ownerDepreciation = calculateOwnerShipDepreciationAndAmortisation(stateOwnership)
    }
    for (let i = 0; i <= numberOfYear; i++) {
        if (i !== 0) {
            if (i <= stateOwnership.OwnerDepreciationAging) {
                result.push(ownerDepreciation)
            } else {
                result.push(0)
            }
        } else {
            result.push(0)
        }
    }
    return result
}
export const calculateOwnerShipDepreciationAndAmortisation = (stateOwnership) => {
    let ownerDepreciation = 0
    if (stateOwnership.PrivillageCost === undefined || stateOwnership.OwnerDepreciationAging === undefined || stateOwnership.OwnerDepreciationAging === 0) {
        if (stateOwnership.PrivillageCost === undefined) {
            stateOwnership.PrivillageCost = 0
        }
        if (stateOwnership.OwnerDepreciationAging === undefined || stateOwnership.OwnerDepreciationAging === 0) {
            return 0
        }
    }
    ownerDepreciation = Math.round((stateOwnership.PrivillageCost / stateOwnership.OwnerDepreciationAging) * 100) / 100
    return ownerDepreciation
}
export const calculateEbit = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let result = 0
    let ebitda = calculateEbitda(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    let depre = calculateAllDepreciation(scenario, stateDecoration, numberOfYear)
    let amor = calculateAllAmortisation(scenario, numberOfYear)
    result = ebitda.map((e, index) => {
        return Math.round((e - (depre[index] + amor[index])) * 100) / 100
    })
    return result
}

export const calculateInterest = (stateDecoration, stateProductSelected, scenario, numberOfYear) => {
    let result = []
    let object = null
    let dept = calculateTotalDept(stateDecoration, stateProductSelected, scenario)
    if (dept >= 0) {
        for (let i = 0; i <= numberOfYear; i++) {
            result.push({ interest: 0, base: 0 , plan : 0})
        }
    } else {
        dept = dept * (-1)
        let base = Math.round((dept / numberOfYear) * 100) / 100
        let plan = base
        let baseBefore = 0
        for (let i = 0; i <= numberOfYear; i++) {
            if (i !== 0) {
                if (i === 1) {
                    object = { interest: Math.round((((result[i - 1].base * scenario.BusinessLoanInterestRate) / 100)) * 100) / 100, base: result[i - 1].base - base, plan: plan }
                } else {
                    baseBefore = result[i - 1].base - base
                    object = { interest: Math.round((((baseBefore * scenario.BusinessLoanInterestRate) / 100)) * 100) / 100, base: baseBefore, plan: plan }
                }
            } else {
                object = { interest: 0, base: dept, plan: 0 }
            }
            result.push(object)
        }
    }
    return result
}

export const calculateNewEbit = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let ebit = 0
    let interest = 0
    let result = []
    ebit = calculateEbit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    interest = calculateInterest(stateDecoration, stateProductSelected, scenario, numberOfYear)
    result = ebit.map((e, index) => {
        return Math.round((e - interest[index].interest) * 100) / 100
    })
    return result
}

export const calculateTax = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let newEbit = 0
    let result = []
    newEbit = calculateNewEbit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    result = newEbit.map((e, index) => {
        if (e > 300000) {
            return Math.round(((e - 300000) * (20 / 100)) * 100) / 100
        } else {
            return 0
        }
    })
    return result
}

export const calculateNetProfit = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration) => {
    let newEbit = 0
    let tax = 0
    let result = []
    tax = calculateTax(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    newEbit = calculateNewEbit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup, stateMarketing, stateDecoration)
    result = newEbit.map((e, index) => {
        return Math.round((e - tax[index]) * 100) / 100
    })
    return result
}

