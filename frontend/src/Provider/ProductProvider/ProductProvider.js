export const productItemAddEmpty = async (object) => {
    let tmp = []
    let objectInterface = undefined
    if (object.ProductQualityID !== undefined) {
        objectInterface = { ProductID: object.ProductID, productDetail: object, sellingPrice: "", amount: "" }
    } else {
        objectInterface = { ProductID: object.ProductID, productDetail: undefined, sellingPrice: "", amount: "" }
    }
    tmp.push(objectInterface)
    return tmp
}
export const productItemAdd = async (object, stateArray) => {
    let tmp = stateArray
    let objectInterface = undefined
    if (object.ProductQualityID !== undefined) {
        objectInterface = { ProductID: object.ProductID, productDetail: object, sellingPrice: "", amount: "" }
    } else {
        objectInterface = { ProductID: object.ProductID, productDetail: undefined, sellingPrice: "", amount: "" }
    }
    tmp.push(objectInterface)
    return tmp
}
export const productItemRemove = async (object, stateArray) => {
    let tmp = stateArray
    const check = await stateArray.find(e => { return object.ProductID === e.ProductID })
    tmp.splice(tmp.indexOf(check), 1)
    return tmp
}
export const checkDuplicateProduct = async (object, stateArray) => {
    if (stateArray === undefined) {
        return false
    }
    const check = await stateArray.find(e => { return object.ProductID === e.ProductID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getProductByObjectID = (object, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.find(e => { return object.ProductID === e.ProductID })
    return check
}
export const getProductByID = (id, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.find(e => { return id === e.ProductID })
    return check
}
export const getIndexByID = async (id, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const checkIndex = await stateArray.findIndex((e, index) => {
        return id === e.ProductID
    })
    return checkIndex
}
export const calculateTotalAmount = (stateArray) => {
    let totalAmount = 0
    if (stateArray !== undefined) {
        stateArray.map((e, index) => {
            if(e.amount !== undefined && e.amount !== ""){
                totalAmount += e.amount
            }
        })
    }
    return totalAmount
}
export const productAmountReset = (stateArray) => {
    if (stateArray !== undefined) {
        stateArray = stateArray.map((e, index) => {
            if(e.amount !== undefined && e.amount !== ""){
                e.amount = ""
            }
            return e
        })
    }
    return stateArray        
}
export const calculateTotalPurchased = (stateArray) => {
    let totalPurchased = 0
    if (isSomeProductPass(stateArray) === true) {
        stateArray.map((e, index) => {
            if (isProductObjectPass(e) === true) {
                totalPurchased += (e.amount * e.productDetail.BasePricePerUnit)
            }
        })
    }
    return totalPurchased
}

export const calculateFreeStorage = (stateArray, maxStorage) => {
    let freeSpace = 0
    if (maxStorage !== undefined && stateArray !== undefined) {
        freeSpace = maxStorage - (calculateTotalAmount(stateArray))
    }
    return freeSpace
}

export const calculateTotalCostOfProduct = (amount, price) => {
    return amount * price
}

export const isSomeProductPass = (stateArray) => {
    let check = false
    if (stateArray !== undefined) {
        check = stateArray.some((e, index) => {
            return e.productDetail !== undefined && e.amount !== "" && e.sellingPrice !== "" && e.amount !== 0
        })
    }
    return check
}
export const isAllProductPass = (stateArray) => {
    let check = false
    if (stateArray !== undefined) {
        check = stateArray.every((e, index) => {
            return e.productDetail !== undefined && e.amount !== "" && e.sellingPrice !== "" && e.amount !== 0
        })
    }
    return check
}
export const isProductObjectPass = (object) => {
    let check
    if (object === undefined) {
        check = undefined
    } else {
        if (object.productDetail !== undefined && object.amount !== "" && object.sellingPrice !== "" && object.amount !== 0) {
            check = true
        }
    }
    return check
}
export const calculateQualityProductScore = (stateArray, stateArrayChoice) => {
    let totalScore = 0
    let totalMaxScore = 0
    let result = 0
    if (isSomeProductPass(stateArray) === true) {
        stateArray.map(e => {
            if (isProductObjectPass(e) === true) {
                totalMaxScore += findProductMaxScore(e, stateArrayChoice)
                totalScore += e.productDetail.MarketSharedScore
            }
        })
        result = (totalScore / totalMaxScore) * 10
    }
    return result
}
export const findProductMaxScore = (object, stateArrayChoice) => {
    let maxScore = 0
    if (stateArrayChoice !== undefined && object !== undefined) {
        stateArrayChoice.map(e => {
            e.map((e) => {
                if (JSON.parse(e.value).ProductID === object.productDetail.ProductID) {
                    if (JSON.parse(e.value).MarketSharedScore > maxScore) {
                        maxScore = JSON.parse(e.value).MarketSharedScore
                    }
                }
            })
        })
    }
    return maxScore
}
export const calculateProductTypeVariety = (stateArray, stateArrayChoice) => {
    let result = 0
    if (isSomeProductPass(stateArray) === true && stateArrayChoice !== undefined && stateArray.length !== 0 && stateArrayChoice.length !== 0) {
        result = (stateArray.length / stateArrayChoice.length) * 10
    }
    return result
}
