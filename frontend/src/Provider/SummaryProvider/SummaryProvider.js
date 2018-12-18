import { calculateTotalRevenue, calculateGrossProfit, calculateEbitda, calculateNetProfit, calculateTotalPopulationNeedProduct } from "../ProductSellingReportProvider/ProductSellingReportProvider";
import { calculateRegister, calculateTotalEquity, calculateTotalAssest, calculateTotalLiability } from "../BalanceSheetProvider/BalanceSheetProvider";
import { calculateTotalViewer } from "../MarketingProvider/MarketingProvider";

export const calculateGrossProfitRatio = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup) =>{
    let gross = []
    let grossProfit = calculateGrossProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    let revenue = calculateTotalRevenue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    gross = grossProfit.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(revenue[index] === 0){
                revenue[index] = 1
            }
            return parseFloat(((e / revenue[index])*100).toFixed(1))
        }
    })
    return gross
}
export const calculateEditdaToRevenueRatio = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) =>{
    let ebitdaToRevenue = []
    let ebitda = calculateEbitda(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let revenue = calculateTotalRevenue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    ebitdaToRevenue = ebitda.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(revenue[index] === 0){
                return 0
            }
            return parseFloat(((e / revenue[index])*100).toFixed(1))
        }
    })
    return ebitdaToRevenue
}
export const calculateNetprofitToRevenueRatio = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) =>{
    let netprofitToRevenue = []
    let netprofit = calculateNetProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let revenue = calculateTotalRevenue(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup)
    netprofitToRevenue = netprofit.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(revenue[index] === 0){
                return 0
            }
            return parseFloat(((e / revenue[index])*100).toFixed(1))
        }
    })
    return netprofitToRevenue
}
export const calculateEPS = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) =>{
    let eps = []
    let netprofit = calculateNetProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let register = calculateRegister(scenario)
    eps = netprofit.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(register[index] === 0){
                return 0
            }
            return parseFloat((e / register[index]).toFixed(1))
        }
    })
    return eps
}
export const calculateROE = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) => {
    let roe = []
    let netprofit = calculateNetProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let equity = calculateTotalEquity(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    roe = netprofit.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(equity[index] === 0){
                return 0
            }
            return parseFloat(((e / equity[index])*100).toFixed(1))
        }
    })
    return roe
}
export const calculateROA = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) => {
    let roa = []
    let netprofit = calculateNetProfit(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let asset = calculateTotalAssest(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    roa = netprofit.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(asset[index] === 0){
                return 0
            }
            return parseFloat(((e / asset[index])*100).toFixed(1))
        }
    })
    return roa
}
export const calculateDebtToEquityRatio = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) => {
    let roa = []
    let liability = calculateTotalLiability(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let equity = calculateTotalEquity(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    roa = liability.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(equity[index] === 0){
                return 0
            }
            return parseFloat((e / equity[index]).toFixed(2))
        }
    })
    return roa
}
export const calcaurateImageRating = (stateMarketing,scenario,stateLocation,numberOfYear) =>{
    let image = []
    let viewer = calculateTotalViewer(stateMarketing)
    let gross = calculateTotalPopulationNeedProduct(scenario,stateLocation,numberOfYear)
    image = gross.map((e,index)=>{
        if(index === 0){
            return 0
        }else{
            if(viewer >= (e/2) && viewer !== 0){
                return 10
            }else{
                if(e === 0){
                    return 0
                }
                return parseFloat(((( viewer * 2 ) / e ) * 10).toFixed(2))
            }
        }
    })
    return image
}
export const calculateCreditRating = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) =>{
    let creditRating = []
    let netProfit = calculateNetprofitToRevenueRatio(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let deptToEquity = calculateDebtToEquityRatio(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration)
    let imageRating = calcaurateImageRating(stateMarketing,scenario,stateLocation,numberOfYear)
    creditRating = netProfit.map((e,index)=>{
        if(e > 0 && deptToEquity[index] < 1 && imageRating[index] >= 2){
            return "Stable"
        }else{
            return "Poor"
        }
    })
    return creditRating
}
export const calculateStockPrice = (stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) =>{
    let stockPrice = []
    let EPS = calculateEPS(stateProductSelected, productTypeAcceptSelected, stateMainEmployee, statePartEmp, hour, stateDay, scenario, stateLocation, marketShared, numberOfYear, stateTargetGroup,stateMarketing,stateDecoration) 
    EPS.map((e,index)=>{
        if(index === 0){
            stockPrice.push(1)
        }else{
            let divide = stockPrice[index-1]
            if(divide === 0){
                divide = 1
            }
            stockPrice.push(
                parseFloat(( stockPrice [index-1] + (((e - EPS[index-1]) / divide ) * stockPrice [index-1] )).toFixed(2))
            )
        }
    })
    return stockPrice
}