import { calculateTotalStoreOperatingHours } from '../StoreProvider/StoreProvider'

export const employeeHireEmpty = (object) => {
    let tmp = { employeeSelected: [], bonus: 0, allowance: 0 }
    let objectAddition = { exp: 0, numberOfEmployee: "" }
    let objectInterface = { ...object, ...objectAddition }
    tmp.employeeSelected.push(objectInterface)
    return tmp
}
export const employeeHire = async (object, stateArray) => {
    let tmp = stateArray
    let objectAddition = { exp: 0, numberOfEmployee: "" }
    let objectInterface = { ...object, ...objectAddition }
    tmp.employeeSelected.push(objectInterface)
    return tmp
}
export const employeeRemove = async (object, stateArray) => {
    let tmp = stateArray
    const check = await stateArray.employeeSelected.find(e => { return object.HumanResourceID === e.HumanResourceID })
    tmp.employeeSelected.splice(tmp.employeeSelected.indexOf(check), 1)
    return tmp
}
export const checkDuplicateEmployee = async (object, stateArray) => {
    if (stateArray.employeeSelected === undefined) {
        return false
    }
    const check = await stateArray.employeeSelected.find(e => { return object.HumanResourceID === e.HumanResourceID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getEmployeeByObjectID = (object, stateArray) => {
    if (stateArray === undefined || stateArray.employeeSelected === undefined) {
        return undefined
    }
    const check = stateArray.employeeSelected.find(e => { return object.HumanResourceID === e.HumanResourceID })
    return check
}

export const getEmployeeIndexByID = async (id, stateArray) => {
    if (stateArray.employeeSelected === undefined) {
        return undefined
    }
    const checkIndex = await stateArray.employeeSelected.findIndex((e, index) => {
        return id === e.HumanResourceID
    })
    return checkIndex
}
export const isSomeFulltimeEmployeePass = (stateArray) => {
    if (stateArray === undefined || stateArray.employeeSelected === undefined) {
        return undefined
    }
    const check = stateArray.employeeSelected.some((e, index) => {
        return e.numberOfEmployee !== "" && e.exp !== "" && e.numberOfEmployee !== undefined && e.exp !== undefined && e.numberOfEmployee !== 0
    })
    return check
}

export const isAllFulltimeEmployeePass = (stateArray) => {
    if (stateArray === undefined || stateArray.employeeSelected === undefined) {
        return undefined
    }
    const check = stateArray.employeeSelected.every((e, index) => {
        return e.numberOfEmployee !== "" && e.exp !== "" && e.numberOfEmployee !== undefined && e.exp !== undefined && e.numberOfEmployee !== 0
    })
    return check
}

export const isFulltimeObjectPass = (object) => {
    let check
    if (object === undefined) {
        check = undefined
    } else {
        if (object.numberOfEmployee !== "" && object.exp !== "" && object.numberOfEmployee !== undefined && object.exp !== undefined && object.numberOfEmployee !== 0) {
            check = true
        }
    }
    return check
}

export const countMainFulltimeEmployeePass = (stateArray) => {
    let count = 0
    if (isSomeFulltimeEmployeePass(stateArray) === true) {
        stateArray.employeeSelected.map((e, index) => {
            if (isFulltimeObjectPass(e) === true) {
                if (e.Status === "Main") {
                    count += e.numberOfEmployee
                }
            }
        })
    }
    return count
}
export const countAssistFulltimeEmployeePass = (stateArray) => {
    let count = 0
    if (isSomeFulltimeEmployeePass(stateArray) === true) {
        stateArray.employeeSelected.map((e, index) => {
            if (isFulltimeObjectPass(e) === true) {
                if (e.Status === "Assistant") {
                    count += e.numberOfEmployee
                }
            }
        })
    }
    return count
}
// ---------------------------------------------------------------------------------------------------------------------------------------

export const partEmployeeHireEmpty = (object) => {
    let tmp = []
    let objectAddition = { numberOfEmployee: "", workHourPerDay: 0, workDayPerWeek: 0, exp: 0 }
    let objectInterface = { ...object, ...objectAddition }
    tmp.push(objectInterface)
    return tmp
}
export const partEmployeeHire = async (object, stateArray) => {
    let tmp = stateArray
    let objectAddition = { numberOfEmployee: "", workHourPerDay: 0, workDayPerWeek: 0, exp: 0 }
    let objectInterface = { ...object, ...objectAddition }
    tmp.push(objectInterface)
    return tmp
}
export const partEmployeeRemove = async (object, stateArray) => {
    let tmp = stateArray
    const check = await stateArray.find(e => { return object.HumanResourceID === e.HumanResourceID })
    tmp.splice(tmp.indexOf(check), 1)
    return tmp
}
export const checkDuplicatePartEmployee = async (object, stateArray) => {
    if (stateArray === undefined) {
        return false
    }
    const check = await stateArray.find(e => { return object.HumanResourceID === e.HumanResourceID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getPartEmployeeByObjectID = (object, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.find(e => { return object.HumanResourceID === e.HumanResourceID })
    return check
}
export const getPartEmployeeIndexByID = async (id, stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const checkIndex = await stateArray.findIndex((e, index) => {
        return id === e.HumanResourceID
    })
    return checkIndex
}
export const isSomeParttimeEmployeePass = (stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.some((e, index) => {
        return e.numberOfEmployee !== "" && e.workDayPerWeek !== "" && e.workDayPerWeek !== 0 && e.workHourPerDay !== "" && e.workHourPerDay !== 0 && e.numberOfEmployee !== 0
    })
    return check
}
export const isAllParttimeEmployeePass = (stateArray) => {
    if (stateArray === undefined) {
        return undefined
    }
    const check = stateArray.every((e, index) => {
        return e.numberOfEmployee !== "" && e.workDayPerWeek !== "" && e.workDayPerWeek !== 0 && e.workHourPerDay !== "" && e.workHourPerDay !== 0 && e.numberOfEmployee !== 0
    })
    return check
}
export const isParttimeObjectPass = (object) => {
    let check
    if (object === undefined) {
        check = undefined
    } else {
        if (object.numberOfEmployee !== "" && object.workDayPerWeek !== "" && object.workDayPerWeek !== 0 && object.workHourPerDay !== "" && object.workHourPerDay !== 0 && object.numberOfEmployee !== 0) {
            check = true
        }
    }
    return check
}
export const countMainParttimeEmployeePass = (stateArray) => {
    let count = 0
    if (isSomeParttimeEmployeePass(stateArray) === true) {
        stateArray.map((e, index) => {
            if (isParttimeObjectPass(e) === true) {
                if (e.Status === "Main") {
                    count += e.numberOfEmployee
                }
            }
        })
    }
    return count
}
export const countAssistParttimeEmployeePass = (stateArray) => {
    let count = 0
    if (isSomeParttimeEmployeePass(stateArray) === true) {
        stateArray.map((e, index) => {
            if (isParttimeObjectPass(e) === true) {
                if (e.Status === "Assistant") {
                    count += e.numberOfEmployee
                }
            }
        })
    }
    return count
}
export const setExptoZero = (stateArray) => {
    let tmp = stateArray
    if (stateArray && stateArray.length > 0) {
        tmp = stateArray.map((e, index) => {
            if (e.Status === "Main") {
                e.exp = 0
            }
            return e
        })
    }
    return tmp
}

export const calculateWithExpValue = (additionPerExp, exp, number) => {
    return ((additionPerExp * exp) * 12) * number
}
export const calculateWithNumberValue = (base, growup, numberOfEmployee) => {
    return (base + (base * (growup / 100))) * 12 * numberOfEmployee
}
export const calculateWithBonusValue = (base, growup, numberOfEmployee, bonus, allowance) => {
    return ((calculateWithNumberValue(base, growup, numberOfEmployee) / 12) * bonus) + (calculateWithNumberValue(base, growup, numberOfEmployee) * (allowance / 100)) * numberOfEmployee
}
export const calculateTotalCostValue = (additionPerExp, exp, base, growup, numberOfEmployee, bonus, allowance) => {
    return (calculateWithExpValue(additionPerExp, exp, numberOfEmployee) + calculateWithNumberValue(base, growup, numberOfEmployee) + calculateWithBonusValue(base, growup, numberOfEmployee, bonus, allowance)) / 12
}
export const calculateCostPerPerSon = (objectOfEmployee, stateArray) => {
    return (calculateTotalCost(objectOfEmployee, stateArray) / objectOfEmployee.numberOfEmployee)
}
export const calculateTotalCost = (objectOfEmployee, stateArray) => {
    return (calculateWithExpValue(objectOfEmployee.AdditionPayPerExp, objectOfEmployee.exp, objectOfEmployee.numberOfEmployee) +
        calculateWithNumberValue(objectOfEmployee.BaseSalaryPerMonth, 0, objectOfEmployee.numberOfEmployee) +
        calculateWithBonusValue(objectOfEmployee.BaseSalaryPerMonth, 0, objectOfEmployee.numberOfEmployee, stateArray.bonus, stateArray.allowance)
    ) / 12
}

export const calculateAllOfFullTimeTotalCost = (stateArrayFull) => {
    let valueFull = 0
    if (isSomeFulltimeEmployeePass(stateArrayFull) === true) {
        stateArrayFull.employeeSelected.map(element => {
            if (isFulltimeObjectPass(element) === true) {
                valueFull += calculateTotalCost(element, stateArrayFull)
            }
        })
    }
    return valueFull
}
export const calculateAllOfPartTimeTotalCost = (stateArrayPart) => {
    let valuePart = 0
    if (isSomeParttimeEmployeePass(stateArrayPart) === true) {
        stateArrayPart.map(element => {
            if (isParttimeObjectPass(element) === true) {
                valuePart += calculateTotalParttimeWagePerMonth(element)
            }
        })
    }
    return valuePart
}

export const calculateParttimeWagePerMonthValue = (basePayPerHour, workHourPerDay, workDayPerWeek, numberOfEmployee) => {
    return ((basePayPerHour * ((workHourPerDay * workDayPerWeek) * numberOfEmployee)) * 52) / 12
}
export const calculateParttimeWageWithEXPPerMonthValue = (exp, additionPayPerExp, workHourPerDay, workDayPerWeek, numberOfEmployee) => {
    return (((((exp * additionPayPerExp) / 26) / 8) * ((workHourPerDay * workDayPerWeek) * numberOfEmployee)) * 52) / 12
}
export const calculateTotalParttimeWagePerMonthValue = (base, exp, additionPayPerExp, workHourPerDay, workDayPerWeek, numberOfEmployee) => {
    return calculateParttimeWagePerMonthValue(base, workHourPerDay, workDayPerWeek, numberOfEmployee) +
        calculateParttimeWageWithEXPPerMonthValue(exp, additionPayPerExp, workHourPerDay, workDayPerWeek, numberOfEmployee)
}
export const calculateTotalParttimeWagePerMonth = (objectOfPartEmployee) => {
    return Math.round(calculateTotalParttimeWagePerMonthValue(objectOfPartEmployee.BasePayPerHour, objectOfPartEmployee.exp, objectOfPartEmployee.AdditionPayPerExp, objectOfPartEmployee.workHourPerDay, objectOfPartEmployee.workDayPerWeek, objectOfPartEmployee.numberOfEmployee))
}

export const calculateMainEmployeeWorkingHour = (stateArrayFull, stateArrayPart) => {
    let result = 0
    let valueFull = 0, valuePart = 0;
    if (isSomeFulltimeEmployeePass(stateArrayFull) === true || isSomeParttimeEmployeePass(stateArrayPart) === true) {
        if (isSomeFulltimeEmployeePass(stateArrayFull) === true) {
            let mainNo = stateArrayFull.employeeSelected.filter(element => {
                if (isFulltimeObjectPass(element) === true) {
                    return element.Status === "Main"
                }
            })
            mainNo.map(element => {
                valueFull += ((5 * 8) * element.numberOfEmployee)
            })
        }
        if (isSomeParttimeEmployeePass(stateArrayPart) === true) {
            let partNo = stateArrayPart.filter(element => {
                if (isParttimeObjectPass(element) === true) {
                    return element.Status === "Main"
                }
            })
            partNo.map(element => {
                valuePart += ((element.workDayPerWeek * element.workHourPerDay) * element.numberOfEmployee)
            })
        }
    }
    result = valuePart + valueFull
    return result
}
export const calculateAssistEmployeeWorkingHour = (stateArrayFull, stateArrayPart) => {
    let result = 0
    let valueFull = 0, valuePart = 0;
    if (isSomeFulltimeEmployeePass(stateArrayFull) === true || isSomeParttimeEmployeePass(stateArrayPart) === true) {
        if (isSomeFulltimeEmployeePass(stateArrayFull) === true) {
            let mainNo = stateArrayFull.employeeSelected.filter(element => {
                if (isFulltimeObjectPass(element) === true) {
                    return element.Status === "Assistant"
                }
            })
            mainNo.map(element => {
                valueFull += ((5 * 8) * element.numberOfEmployee)
            })
        }
        if (isSomeParttimeEmployeePass(stateArrayPart) === true) {
            let partNo = stateArrayPart.filter(element => {
                if (isParttimeObjectPass(element) === true) {
                    return element.Status === "Assistant"
                }
            })
            partNo.map(element => {
                valuePart += ((element.workDayPerWeek * element.workHourPerDay) * element.numberOfEmployee)
            })
        }
    }
    result = valuePart + valueFull
    return result
}
export const calculateMainEmployeeWorkingHourScore = (stateArrayFull, stateArrayPart, day, hour) => {
    let result = 0
    let totalOperationTime = calculateTotalStoreOperatingHours(day, hour)
    if (totalOperationTime === 0) {
        totalOperationTime = 1
    }
    if ((isSomeFulltimeEmployeePass(stateArrayFull) === true || isSomeParttimeEmployeePass(stateArrayPart) === true) && totalOperationTime !== undefined) {
        if (calculateMainEmployeeWorkingHour(stateArrayFull, stateArrayPart) >= totalOperationTime) {
            result = 10
        } else {
            result = (calculateMainEmployeeWorkingHour(stateArrayFull, stateArrayPart) / totalOperationTime) * 10
        }
    }
    return result
}
export const calculateAssistEmployeeWorkingHourScore = (stateArrayFull, stateArrayPart, day, hour) => {
    let result = 0
    let totalVice = calculateAssistEmployeeWorkingHour(stateArrayFull, stateArrayPart)
    let totalMain = calculateMainEmployeeWorkingHour(stateArrayFull, stateArrayPart)
    if ((totalVice >= totalMain) && totalVice !== 0) {
        result = 10
    } else {
        if (calculateTotalStoreOperatingHours(day, hour) !== 0) {
            result = (totalVice / calculateTotalStoreOperatingHours(day, hour)) * 10
        }
    }
    return result
}
export const findMaxExpFromFullMain = (stateArrayFull, stateArrayPart) => {
    let mainNo = [], partNo = []
    if (isSomeFulltimeEmployeePass(stateArrayFull) === true || isSomeParttimeEmployeePass(stateArrayPart) === true) {
        if (isSomeFulltimeEmployeePass(stateArrayFull) === true) {
            mainNo = stateArrayFull.employeeSelected.map(element => {
                if (isFulltimeObjectPass(element) === true) {
                    if (element.Status === "Main") {
                        return element.exp
                    }
                }
            })
        } else {
            mainNo.push(0)
        }
        if (isSomeParttimeEmployeePass(stateArrayPart) === true) {
            partNo = stateArrayPart.map(element => {
                if (isParttimeObjectPass(element) === true) {
                    if (element.Status === "Main") {
                        return element.exp
                    }
                }
            })
        } else {
            partNo.push(0)
        }
    }
    let final = Math.max([...mainNo, ...partNo].filter(e => {return e }))
    return final
}
