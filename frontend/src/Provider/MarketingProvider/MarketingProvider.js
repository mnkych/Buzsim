import { calculatePopulationNeedProd } from "../StoreProvider/StoreProvider";
export const marketSourceAddEmpty = async (object) => {
    let tmp = []
    let objectInterface = { marketingDetail : object, frequency : "", viewer : "" }        
    tmp.push(objectInterface)
    return tmp
}
export const marketSourceAdd = async (object, stateArray) => {
    let tmp = stateArray
    let objectInterface = { marketingDetail : object, frequency : "", viewer : "" }   
    tmp.push(objectInterface)
    return tmp
}
export const marketSourceRemove = async (object, stateArray) => {
    let tmp = stateArray
    const check = await stateArray.find(e => { return object.MarketingID === e.marketingDetail.MarketingID })
    tmp.splice(tmp.indexOf(check), 1)
    return tmp
}
export const checkDuplicateMarketing = async (object, stateArray) => {
    if (stateArray === undefined) {
        return false
    }
    const check = await stateArray.find(e => { return object.MarketingID === e.marketingDetail.MarketingID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getMarketingByObjectID = (object, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.find(e => { return object.MarketingID === e.marketingDetail.MarketingID })
    return check
}
export const getMarketIndexByID = async (id, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const checkIndex = await stateArray.findIndex((e, index) => {
        return id === e.marketingDetail.MarketingID
    })
    return checkIndex
}
export const calculateTotalCostOfMarketing = (pricePerTime,frequency, viewer) => {
    return pricePerTime * (frequency * viewer)
}
export const calculateAllCostOfMarketing = (stateArray) => {
    let totalPromote = 0
    if (isSomeMarketingPass(stateArray)===true) {
        stateArray.map((e, index) => {
                totalPromote += calculateTotalCostOfMarketing(e.marketingDetail.PricePerTime ,e.frequency,e.viewer)
        })
    }
    return totalPromote
}
export const isMarketingObjectPass = (object) => {
    let check = false
    if (object === undefined) {
        check = undefined
    } else {
        if (object.frequency !== "" && object.viewer !== "" && object.frequency !== 0 && object.viewer !== 0) {
            check = true
        }
    }
    return check
}
export const isSomeMarketingPass = (stateArray) => {
    let check = false
    if (stateArray !== undefined) {
        check = stateArray.some((e, index) => {
            return e.frequency !== "" && e.viewer !== "" && e.frequency !== 0 && e.viewer !== 0
        })
    }
    return check
}
export const isAllMarketingPass = (stateArray) => {
    let check = false
    if (stateArray !== undefined) {
        check = stateArray.every((e, index) => {
            return e.frequency !== "" && e.viewer !== "" && e.frequency !== 0 && e.viewer !== 0
        })
    }
    return check
}
export const calculatePromotionChannelScore = (stateArray,stateArrayChoice) => {
    let result = 0
    if(isSomeMarketingPass(stateArray)===true && stateArrayChoice !== undefined && stateArray.length !== 0 && stateArrayChoice.length !==0 ){
        result = (stateArray.length / stateArrayChoice.length) * 10
    }
    return result
}
export const calculateTotalViewer = (stateArray) => {
    let total = 0
    if(isSomeMarketingPass(stateArray)===true){
        stateArray.map(e=>{
            if(isMarketingObjectPass(e)===true){
                total += e.viewer
            }
        })
    }
    return total
}
export const calculateViewerScore = (stateArray,scenario,location) => {
    let viewerScore = 0
    if(isSomeMarketingPass(stateArray)===true){
    let populationNeedProduct = calculatePopulationNeedProd(scenario,location)
    let totalViewer = calculateTotalViewer(stateArray)
    if (totalViewer >= (populationNeedProduct / 2)) {
        viewerScore = 10
    } else {
        viewerScore = (totalViewer * 2) / (populationNeedProduct * 10)
    }
    }
    return viewerScore
}