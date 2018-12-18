import axios from '../../lib/axios';

export const deleteUserStore = async (storeID,tableName) => {
    const data = await axios.post(`/UserStore/deleteUserStore`, {
        StoreID: storeID,
        tableName : tableName
    })
    return data
}

export const deleteCompetitor = async (ComScoreID) => {
    const data = await axios.post(`/Competitor/DelCompetID`, {
        CompetitorScoreID:ComScoreID
    })
    return data
}

export const deleteHumanResource = async (HumanID) => {
    const data = await axios.post(`/HumanResource/DelHuman`, {
        HumanResourceID:HumanID
    })
    return data
}

export const deleteMarketing = async (MarketID) => {
    const data = await axios.post(`/Marketing/DelMarketing`, {
        MarketingID:MarketID
    })
    return data
}

export const deleteBusiness = async (BusID) => {
    const data = await axios.post(`/Business/DelBusiness`, {
        BusinessID:BusID
    })
    return data
}

export const deleteClassroom = async (ClassID) => {
    const data = await axios.post(`/Classroom/DelClassroom`, {
        ClassID:ClassID
    })
    return data
}

export const deleteCompetID = async (CompID) => {
    const data = await axios.post(`/Competitor/DelCompetID`, {
        CompetitorScoreID:CompID
    })
    return data
}

export const deleteDeCID = async (DecID) => {
    const data = await axios.post(`/Decoration/DelDecID`, {
        DecorationID:DecID
    })
    return data
}

export const deleteHumanID = async (HumanID) => {
    const data = await axios.post(`/HumanResource/DelHumanID`, {
        HumanResourceID:HumanID
    })
    return data
}
export const deleteLocation = async (LocatID) => {
    const data = await axios.post(`/Location/DelLocation`, {
        LocationID:LocatID
    })
    return data
}
export const deleteMarkID = async (MarkID) => {
    const data = await axios.post(`/Marketing/DelMarkID`, {
        MarketingID:MarkID
    })
    return data
}
export const deleteOwner = async (OwnerID) => {
    const data = await axios.post(`/Ownership/DelOwner`, {
        OwnershipID:OwnerID
    })
    return data
}
export const deleteProduct = async (ProdID) => {
    const data = await axios.post(`/Product/DelProduct`, {
        ProductID:ProdID
    })
    return data
}
export const deleteSize = async (SizeID) => {
    const data = await axios.post(`/Size/DelSize`, {
        SizeID:SizeID
    })
    return data
}
export const deleteProductQuality = async (BusID) => {
    const data = await axios.post(`/Product/DelProductQuality`, {
        BusinessID:BusID
    })
    return data
}




