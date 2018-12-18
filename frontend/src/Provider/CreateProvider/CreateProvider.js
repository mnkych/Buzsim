import React from 'react';
import { List } from 'semantic-ui-react'
import swal from 'sweetalert2'

export const createOption = (data, indexOfkey = null) => {
    let options = []
    if (data) {
        options = data.map((e, index) => {
            let textBuild = Object.keys(e).map((key, indexObj) => {
                if (indexOfkey) {
                    if (indexObj >= 1 && indexObj <= indexOfkey) {
                        return <List.Item key={indexObj}>
                        <List.Content>
                            <List.Header>{Object.values(e)[indexObj]}</List.Header>
                        </List.Content>
                    </List.Item>
                    } else {
                        return ''
                    }
                } else {
                    if (indexObj >= 1 && (Object.values(e)[indexObj] || Object.values(e)[indexObj] === 0) && key !== 'JobType' && key !== 'ProductType') {
                        return (
                            <List.Item key={indexObj}>
                                <List.Content>
                                    <List.Header>{key}</List.Header>
                                    {Object.values(e)[indexObj]}
                                </List.Content>
                            </List.Item>
                        )
                    } else {
                        return ''
                    }
                }
            })
            let finalTextBuild =
                <List horizontal>{textBuild}</List>
            return { key: Object.values(e)[0], text: Object.values(e)[1], value: JSON.stringify(e), content: finalTextBuild }
        })
    }
    return options
}
export const targetGroupAddEmpty = (object) => {
    let tmp = []
    tmp.push(object)
    return tmp
}
export const targetGroupAdd = (object, stateArray) => {
    let tmp = stateArray
    tmp.push(object)
    return tmp
}
export const targetGroupRemove = (object, stateArray) => {
    let tmp = stateArray
    const check = stateArray.find(e => { return object.TargetGroupID === e.TargetGroupID })
    tmp.splice(tmp.indexOf(check), 1)
    return tmp
}
export const getTargetGroupByID = (object, stateArray) => {
    if (stateArray.length === 0 || !stateArray) {
        return undefined
    }
    const check = stateArray.find(e => { return object.TargetGroupID === e.TargetGroupID })
    return check
}
export const checkDuplicateTargetGroup = (object, stateArray) => {
    const check = stateArray.find(e => { return object.TargetGroupID === e.TargetGroupID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const productQualityAddEmpty = (object) => {
    let tmp = []
    tmp.push(object)
    return tmp
}
export const productQualityAdd = (object, stateArray) => {
    let tmp = stateArray
    tmp.push(object)
    return tmp
}
export const productqualityRemove = (object, stateArray) => {
    let tmp = stateArray
    const check = stateArray.find(e => { return object.QualityID === e.QualityID && object.ProductID === e.ProductID })
    tmp.splice(tmp.indexOf(check), 1)
    return tmp
}
export const getProductQualityByID = (object, stateArray) => {
    if (stateArray.length === 0 || !stateArray) {
        return undefined
    }
    const check = stateArray.find(e => { return object.QualityID === e.QualityID && object.ProductID === e.ProductID })
    return check
}
export const checkDuplicateProductQuality = (object, stateArray) => {
    const check = stateArray.find(e => { return object.QualityID === e.QualityID && object.ProductID === e.ProductID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getProductAcceptionById = (object, stateArray) => {
    if (stateArray.length === 0 || !stateArray) {
        return undefined
    }
    const check = stateArray.find(e => { return object.TargetGroupID === e.TargetGroupID && object.ProductID === e.ProductID })
    return check
}
export const checkDuplicatargetProductAcception = (object, stateArray) => {
    const check = stateArray.find(e => { return object.TargetGroupID === e.TargetGroupID && object.ProductID === e.ProductID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getDecorationRelationById = (object, stateArray) => {
    if (stateArray.length === 0 || !stateArray) {
        return undefined
    }
    const check = stateArray.find(e => { return object.DecorationID === e.DecorationID && object.SizeID === e.SizeID && object.LocationID === e.LocationID })
    return check
}
export const checkDuplicateDecorationRelation = (object, stateArray) => {
    const check = stateArray.find(e => { return object.DecorationID === e.DecorationID && object.SizeID === e.SizeID && object.LocationID === e.LocationID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const getStoreRelationById = (object, stateArray) => {
    if (stateArray.length === 0 || !stateArray) {
        return undefined
    }
    const check = stateArray.find(e => { return object.OwnershipID === e.OwnershipID && object.SizeID === e.SizeID && object.LocationID === e.LocationID })
    return check
}
export const checkDuplicateStoreRelation = (object, stateArray) => {
    const check = stateArray.find(e => { return object.OwnershipID === e.OwnershipID && object.SizeID === e.SizeID && object.LocationID === e.LocationID })
    if (check === undefined) {
        return false
    } else {
        return true
    }
}
export const calculateTotalQuantity = (stateArray, name) => {
    let calculate = 0
    if (stateArray && stateArray.length > 0) {
        stateArray.map(e => {
            if (e && e[name]) {
                calculate += e[name]
            }
        })
    }
    return calculate
}
export const splitArrayToArray = (array, number) => {
    let splitArray = []
    for (let i = 0; i < array.length; i += number) {
        splitArray.push(array.slice(i, i + number));
    }
    return splitArray
}
export const countLengthArray2D = (array) => {
    let count = 0
    if(array && array.length > 0){
        array.map(e=>{
            if(e && e.length>0){
            count += e.length
            }
        })
    }
    return count
}
export const swalError = () => {
    swal({
        position: 'center',
        type: 'error',
        title: 'Something wrong!',
        html: 'Please try again',
        showConfirmButton: true,
    })
}
export const swalSuccess = () => {
    return swal({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
}
export const swalWarning = () => {
    swal({
        position: 'center',
        type: 'warning',
        title: 'Something wrong!',
        html: 'Please check some value is required',
        showConfirmButton: true,
    })
}