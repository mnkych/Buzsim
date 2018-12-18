import axios from '../../lib/axios';

export const getBusinessScenario = async (businessID) => {
    const data = await axios.get(`/Business/${businessID}`)
    return data
}

export const getCompetitor = async (businessID) => {
    const data = await axios.get(`/Competitor/${businessID}`)
    return data
}

export const getSizeChoice = async (businessID) => {
    const data = await axios.get(`/Size/${businessID}`)
    return data
}

export const getLocationChoice = async (businessID) => {
    const data = await axios.get(`/Location/${businessID}`)
    return data
}

export const getOwnershipChoice = async (businessID) => {
    const data = await axios.get(`/Ownership/${businessID}`)
    return data
}

export const getTargetGroupChoice = async (businessID) => {
    const data = await axios.get(`/TargetGroup/${businessID}`)
    return data
}

export const getDecorationChoice = async (object) => {
    const data = await axios.post(`/Decoration`, { BusinessID: object.BusinessID, SizeID: object.SizeID, LocationID: object.LocationID })
    return data
}

export const getProductChoice = async (id) => {
    const data = await axios.get(`/Product/Choice/${id}`)
    return data;
}

export const getProductDetail = async (object) => {
    const data = await axios.post(`/Product/ID/`, {
        BusinessID: object.BusinessID,
        ProductID: object.ProductID,
    })
    return data;
}

export const getBusinessSizeLocationOwnership = async (businessID, sizeID, locationID, ownershipID) => {
    const data = await axios.post(`/BusinessLocationSizeOwnerShipRelated`, {
        businessID: businessID,
        locationID: locationID,
        sizeID: sizeID,
        ownershipID: ownershipID
    })
    return data
}

export const getEmployee = async (businessID, type) => {
    const data = await axios.post(`/HumanResource`,
        {
            BusinessID: businessID,
            JobType: type
        })
    return data;
}

export const getProductAccept = async (businessID, targetGroupID) => {
    const data = await axios.post(`/TargetGroup/ProductAccept/`,
        {
            businessID: businessID,
            targetGroupID: targetGroupID
        })
    return data;
}

export const getMarketing = async (businessID) => {
    const data = await axios.get(`/Marketing/${businessID}`)
    return data
}

export const getUserStore = async (businessID, mail , classID) => {
    const data = await axios.post(`/UserStore/`,
        {
            StoreEmail: mail,
            BusinessID: businessID,
            ClassID : classID
        })
    return data;
}

export const getClassRoom = async (roomKey) => {
    const { data } = await axios.get(`/UserStore/${roomKey}`)
    return data
}

export const getStoreOperationUserSelected = async (storeID, businessLocationSizeOwnerRelevantID) => {
    const { data } = await axios.post(`/UserStore/getUserStore`,
        {
            StoreID: storeID,
            BusinessLocationSizeOwnerRelevantID: businessLocationSizeOwnerRelevantID,
        })
    return data
}

export const getStoreDecorationSelected = async (storeID) => {
    const { data } = await axios.post(`/UserStore/getDecorationUserStore`,
        {
            StoreID: storeID,
        })
    return data
}

export const getStoreMarketingSelected = async (storeID) => {
    const { data } = await axios.post(`/UserStore/getMarketingUserStore`,
        {
            StoreID: storeID,
        })
    return data
}

export const getStoreHumanResourceSelected = async (storeID) => {
    const { data } = await axios.post(`/UserStore/getHumanResourceUserStore`,
        {
            StoreID: storeID,
        })
    return data
}

export const getStoreProductSelected  = async (storeID) => {
    const { data } = await axios.post(`/UserStore/getProductUserStore`,
        {
            StoreID: storeID,
        })
    return data
}

export  const getAllLocation = async () => {
    const { data } = await axios.get(`/Location/SeLocation`)
    return data
}

export  const getAllSize = async () => {
    const { data } = await axios.get(`/Size/SeSize`)
    return data
}

export  const getAllOwnership = async () => {
    const { data } = await axios.get(`/Ownership/SeOwnership`)
    return data
}

export  const getAllDecoration = async () => {
    const { data } = await axios.get(`/Decoration/SeDecoration`)
    return data
}

export  const getAllCompetitor = async () => {
    const { data } = await axios.get(`/Competitor/SeCompetitor`)
    return data
}

export  const getAllMarketing = async () => {
    const { data } = await axios.get(`/Marketing/SeMarketing`)
    return data
}

export  const getAllHumanResource = async () => {
    const { data } = await axios.get(`/HumanResource/SeHuman`)
    return data
}

export  const getAllProduct = async () => {
    const { data } = await axios.get(`/Product/SeProduct`)
    return data
}

export  const getAllTargetGroup = async () => {
    const { data } = await axios.get(`/TargetGroup/SeTargetGroup`)
    return data
}
export  const getAllBusiness = async () => {
    const { data } = await axios.get(`/Business/SeBusiness`)
    return data
}
export  const getEnterCode = async () => {
    const { data } = await axios.get(`/Classroom/SeEnterCode`)
    return data
}
export  const getQuality = async () => {
    const { data } = await axios.get(`/Product/SeQuality`)
    return data
}
export  const getProductQuality = async () => {
    const { data } = await axios.get(`/Product/SeProductQuality`)
    return data
}
export  const getSeClassroom = async () => {
    const { data } = await axios.get(`/Classroom/SeClassroom`)
    return data
}
export  const getBusinessNotInClassroom = async () => {
    const { data } = await axios.get(`/Classroom/SeBusinessNotInClassroom`)
    return data
}
export  const getCompetitorNotIntBC = async () => {
    const { data } = await axios.get(`/Competitor/SeCompetitorNotInBC`)
    return data
}
export  const getDecorationNotInBD = async () => {
    const { data } = await axios.get(`/Decoration/SeDecorationNotInBD`)
    return data
}
export  const getHumanNotInBH = async () => {
    const { data } = await axios.get(`/HumanResource/SeHumanNotInBH`)
    return data
}
export  const getLocationNotInBB = async () => {
    const { data } = await axios.get(`/Location/SeLocationNotInBB`)
    return data
}
export  const getMarketingNotInBM = async () => {
    const { data } = await axios.get(`/Marketing/SeMarketingNotInBM`)
    return data
}
export  const getOwnerNotInB = async () => {
    const { data } = await axios.get(`/Ownership/SeOwnerNotInB`)
    return data
}
export  const getProductNotInBP = async () => {
    const { data } = await axios.get(`/Product/SeProductNotInBP`)
    return data
}
export  const getSizeNotInBB = async () => {
    const { data } = await axios.get(`/Size/SeSizeNotInBB`)
    return data
}
export  const getSelectSizeBusinessRelate = async (BusID) => {
    const { data } = await axios.post(`/Size/SeSizeBusinessRelate`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectLocationBusinessRelate = async (BusID) => {
    const { data } = await axios.post(`/Location/SeLocationBusinessRelate`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectOwnershipBusinessRelate = async (BusID) => {
    const { data } = await axios.post(`/Ownership/SeOwnershipBusinessRelate`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectTargetGroupBuBuTarget = async (BusID) => {
    const { data } = await axios.post(`/TargetGroup/SeTargetGroupBuBuTarget`,{
        BusinessID: BusID
    })
    return data
}
export const getAllBusinessSizeLocationOwnership = async (businessID) => {
    const { data } = await axios.post(`/BusinessLocationSizeOwnerShipRelated/SelectedAllRelateWithID`, {
        BusinessID: businessID,
    })
    return data
}
export const getUser = async (Username,Password) => {
    const { data } = await axios.post(`/User/logIn`,{
        Username : Username,
        Password : Password
    })
    return data
}
export const getUserInfo = async (Username) => {
    const { data } = await axios.post(`/User/getUser`,{
        Username : Username,
    })
    return data
}
export  const getSelectDecorationBuDec = async (BusID) => {
    const { data } = await axios.post(`/Decoration/SeDecorationBuDec`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectAllDecorationBuDec = async (BusID) => {
    const { data } = await axios.post(`/Decoration/SeAllRelationDecorationBuDec`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectBuProductSellerProdQualityProd = async (BusID) => {
    const { data } = await axios.post(`/Product/SeBuProductSellerProdQualityProd`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectBuProductSellerProdQualityProdQuality = async (BusID) => {
    const { data } = await axios.post(`/Product/SeBuProductSellerProdQualityProdQuality`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectBuProductAcceptByTarget = async (BusID) => {
    const { data } = await axios.post(`/TargetGroup/SeBuProductAcceptByTarget`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectSeHumanBusinessHireEmp = async (BusID) => {
    const { data } = await axios.post(`/HumanResource/SeHumanBusinessHireEmp`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectSeMarketingBusinessMarket = async (BusID) => {
    const { data } = await axios.post(`/Marketing/SeMarketingBusinessMarket`,{
        BusinessID: BusID
    })
    return data
}
export  const getSelectSeCompetitorBusinessCom = async (BusID) => {
    const { data } = await axios.post(`/Competitor/SeCompetitorBusinessCom`,{
        BusinessID: BusID
    })
    return data
}
export const getSelectSeStoreClassID = async (ClassID) => {
    const { data } = await axios.post(`/UserStore/SeStoreClassID`,{
        ClassID: ClassID
    })
    return data
}
export const getSelectSeStoreStoreID = async (StoreID) => {
    const { data } = await axios.post(`/UserStore/SeStoreStoreID`,{
        StoreID: StoreID
    })
    return data
}
