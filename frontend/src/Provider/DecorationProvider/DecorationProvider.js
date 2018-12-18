export const calculateTotolCostOfDecoration = (decorationArrayList) => {
    let totalCost = 0
    if(decorationArrayList === undefined || decorationArrayList.length === 0){
        totalCost = 0
    }else{
        decorationArrayList.forEach((e) => {          
            totalCost += e.Price
        })
    }
    return totalCost
}
export const calculateDecorationScore = (stateArray,stateArrayChoice) => {
    let result = 0
    if(stateArray !== undefined && (stateArrayChoice !== undefined && stateArrayChoice.length !== 0)){ 
        result = (stateArray.length / stateArrayChoice.length) * 10 
    }
    return result
}
export const decorationItemAddEmpty = async (object) => {
    let tmp = []
    tmp.push(object)
    return tmp
}
export const decorationItemAdd = async (object, stateArray) => {
    let tmp = stateArray
    tmp.push(object)
    return tmp
}
export const decorationItemRemove = async (object, stateArray) => {
    let tmp = stateArray
    const check = await stateArray.find(e => { return object.BusinessDecorationID === e.BusinessDecorationID })
    tmp.splice(tmp.indexOf(check), 1)
    return tmp
}
export const checkDuplicateDecoration = async (object, stateArray) => {
    const check = await stateArray.find(e => { return object.BusinessDecorationID === e.BusinessDecorationID  })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getDecorationByObjectID = (object, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.find(e => { return object.BusinessDecorationID === e.BusinessDecorationID })
    return check
}
export const calculateTotalDecorationHourElectricity = (stateArray) =>{
    let total = 0
    if(stateArray !== undefined){
        stateArray.map(e=>{
            total += e.ElectricityUnitPerHour
        })
    }
    return total
}

export const calculateDecorationDepreciation = (decorationObject) =>{
    if(decorationObject !== undefined){
            if(decorationObject.DecorateDepreciationAging !== 0){
                return Math.round(decorationObject.Price / decorationObject.DecorateDepreciationAging)
            }else{
                return 0 
            }
    }else{
        return 0
    }
}