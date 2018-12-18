import axios from '../../lib/axios';

export const insertUserStore = async (StoreName,StoreOperatingDay,StoreOperatingHour,ClassID,BusinessLocationSizeOwnerRelevantID,BusinessTargetGroupID,StoreEmail,StoreOpenTime,StoreCloseTime,StoreBonus,StoreAllowance) => {
    const data = await axios.post(`/UserStore/putUserStore`,{
        StoreName : StoreName,
        StoreOperatingDay : StoreOperatingDay,
        StoreOperatingHour : StoreOperatingHour,
        ClassID : ClassID,
        BusinessLocationSizeOwnerRelevantID : BusinessLocationSizeOwnerRelevantID,
        BusinessTargetGroupID : BusinessTargetGroupID,
        StoreEmail : StoreEmail,
        StoreOpenTime : StoreOpenTime,
        StoreCloseTime : StoreCloseTime,
        StoreBonus : StoreBonus,
        StoreAllowance : StoreAllowance
    })
    return data
}

export const insertDecoration = async (DecItem,DecDepre)=>{
    const data = await axios.post(`/Decoration/InDecoration`,{
        DecorationItem: DecItem,
        DecorateDepreciationAging: DecDepre
    })
    return data
}

export const insertBusinessDecoration = async (BusID,DecID,SizeID,LocatID,Price,ElecUnitHour)=>{
    const data = await axios.post(`/Decoration/InBuDecoration`,{
        BusinessID: BusID,
        DecorationID: DecID,
        SizeID: SizeID,
        LocationID: LocatID,
        Price: Price,
        ElectricityUnitPerHour: ElecUnitHour
    })
    return data
}

export const insertStoreDecoration = async (bisDecID,storeID)=>{
    const data = await axios.post(`/UserStore/putDecorationStore`,{
        BusinessDecorationID : bisDecID,
        StoreID : storeID
    })
    return data
}

export const insertStoreProductSelling = async (amount,price,BusinessProductSellerID,storeID) =>{
    const data = await axios.post(`/UserStore/putProductOnStore`,{
        Amount : amount,
        PriceForSale : price,
        BusinessProductSellerID : BusinessProductSellerID,
        StoreID : storeID
    })
    return data
}

export const insertStoreMarketing = async (businessMarketingID,storeID,frequency,viewer) =>{
    const data = await axios.post(`/UserStore/putMarketingOnStore`,{
        BusinessMarketingID: businessMarketingID,
        StoreID : storeID,
        Frequency : frequency,
        Reacher : viewer,
    })
    return data
}

export const insertStoreHireEmployee = async (workHour,workDay,numberOfEmp,storeID,hirEmpID,exp,OwnerSalary) =>{
    const data = await axios.post(`/UserStore/putEmployeeOnStore`,{
        EmployeeOperatingHour : workHour,
        EmployeeOperatingDay : workDay,
        NumberOfEmployee : numberOfEmp,
        StoreID : storeID,
        BusinessHireEmployeeID : hirEmpID,
        Experience : exp,
        OwnerSalary: OwnerSalary
    })
    return data
}

export const insertCompetitor = async (DecScore,ProdVarScore,ProdQuaScore,SizeScore,DayScore,TimeScore,NumEmpScore,NumAssScore,MarVarScore,MarFreScore,ComName)=>{
    const data = await axios.post(`/Competitor/InCompetitor`,{
        DecorationScore: DecScore,
        ProductVarietyScore: ProdVarScore,
        ProductQualityScore: ProdQuaScore,
        SizeScore: SizeScore,
        DayScore: DayScore,
        TimeScore: TimeScore,
        NumberOfEmployeeScore: NumEmpScore,
        NumberOfAssistanceScore: NumAssScore,
        MarketingVarietyScore: MarVarScore,
        MarketingFrequencyScore: MarFreScore,
        CompetitorName: ComName
    })
    return data
}

export const insertBusinessCompetitor = async (BusID,ComScoreID)=>{
    const data = await axios.post(`/Competitor/InBuCompetitor`,{
        BusinessID: BusID,
        CompetitorScoreID: ComScoreID,
    })
    return data
}

export const insertHumanResource = async (Job,JobType,Status,BaseSaMonth,BasePayHour,BaseSaGrowRate,AddPayExp)=>{
    const data = await axios.post(`/HumanResource/InHuman`,{
        Job: Job,
        JobType: JobType,
        Status: Status,
        BaseSalaryPerMonth: BaseSaMonth,
        BasePayPerHour: BasePayHour,
        BaseSalaryGrowUpRate: BaseSaGrowRate,
        AdditionPayPerExp: AddPayExp
    })
    return data
}

export const insertBusinessHumanResource = async (BusID,HumanID)=>{
    const data = await axios.post(`/HumanResource/InBuHuman`,{
        BusinessID: BusID,
        HumanResourceID: HumanID,
    })
    return data
}

export const insertLocation = async (LocatName,TotalPop,TotalPopRat,TotalPopGrowRate)=>{
    const data = await axios.post(`/Location/InLocation`,{
        LocationName: LocatName,
        TotalPopulation: TotalPop,
        TradingPopulationRatio: TotalPopRat,
        TotalPopulationGrowUpRate: TotalPopGrowRate
    })
    return data
}

export const insertMarketing = async (Channel,PricePerTime)=>{
    const data = await axios.post(`/Marketing/InMarketing`,{
        Channel: Channel,
        PricePerTime: PricePerTime
    })
    return data
}

export const insertBusinessMarketing = async (BusID,MarketID)=>{
    const data = await axios.post(`/Marketing/InBuMarketing`,{
        BusinessID: BusID,
        MarketingID: MarketID,
    })
    return data
}

export const insertOwnership = async (OwnerName,MaintainCost,LandTaxCost,OtherCost,OwnBaseElecUnit,OwnDepreAging)=>{
    const data = await axios.post(`/Ownership/InOwnership`,{
        OwnershipName: OwnerName,
        MaintainCost: MaintainCost,
        LandTaxCost: LandTaxCost,
        OtherCost: OtherCost,
        OwnerBaseElectricityPerUnit: OwnBaseElecUnit,
        OwnerDepreciationAging: OwnDepreAging
    })
    return data
}

export const insertProduct = async (ProdName,ProdType,ProdDepreRatio)=>{
    const data = await axios.post(`/Product/InProduct`,{
        ProductName: ProdName,
        ProductType: ProdType,
        ProductDepreciationRatio: ProdDepreRatio
    })
    return data
}

export const insertSize = async (Size,storage,BaseElectricityUnitOnSize,MarketSharedScore)=>{
    const data = await axios.post(`/Size/InSize`,{
        Size: Size,
        Storage:storage,
        BaseElectricityUnitOnSize: BaseElectricityUnitOnSize,
        MarketSharedScore: MarketSharedScore
    })
    return data
}

export const insertBusinessTargetGroup = async (BusID,TargetID,TargetQuanRat,TargetGrowRat)=>{
    const data = await axios.post(`/TargetGroup/InBuTargetGroup`,{
        BusinessID: BusID,
        TargetGroupID: TargetID,
        TargetGroupQuantityRatio: TargetQuanRat,
        TargetGroupGrowUpRatio: TargetGrowRat
    })
    return data
}
export const insertClassroom = async (CreDate,ClassName,EnCode,BusID)=>{
    const data = await axios.post(`/Classroom/InClassroom`,{
        CreatedDate: CreDate,
        ClassroomName: ClassName,
        EnterCode: EnCode,
        BusinessID: BusID,
    })
    return data
}
export const insertProductQuality = async (BasePrice,QuaID,ProdID)=>{
    const data = await axios.post(`/Product/InProductQuality`,{
        BasePricePerUnit: BasePrice,
        QualityID: QuaID,
        ProductID: ProdID
    })
    return data
}
export const insertProductAcceptByTarget = async (AcceptRat,BusID,TargetID,ProdID,AcceptGrowRate,MaxPriceRat)=>{
    const data = await axios.post(`/TargetGroup/InProductAcceptByTarget`,{
        AcceptRatio: AcceptRat,
        BusinessID: BusID,
        TargetGroupID: TargetID,
        ProductID: ProdID,
        AcceptRatioGrowUpRate: AcceptGrowRate,
        MaximumPriceRate: MaxPriceRat,
    })
    return data
}

export const InBuScenario = async (BusName,BusStaMoney,BusLoanInt,BusEcoEvent,BusGrDemand,BusGrossDeman,BusLicen,BusProdDes,BusEmpDes,BusScenDes,BusInfla,BusPlay,BusPriceGrow,BusProDes,BusDecDes,BusTarDes,BusOpeDes,BusStoreOpeDes)=>{
    const data = await axios.post(`/Business/InBuScenario`,{
        BusinessName: BusName,
        BusinessStartMoney: BusStaMoney,
        BusinessLoanInterestRate: BusLoanInt,
        BusinessEconomicEvent: BusEcoEvent,
        BusinessGrossDemand: BusGrDemand,
        BusinessGrossDemandGrowUpRate: BusGrossDeman,
        BusinessLicenseCost: BusLicen,
        BusinessProductDescription: BusProdDes,
        BusinessEmployeeDescription: BusEmpDes,
        BusinessScenarioDescription: BusScenDes,
        BusinessInflation: BusInfla,
        BusinessPlayingYear: BusPlay,
        BusinessPriceGrowthPolicy: BusPriceGrow,
        BusinessPromotionDescription: BusProDes,
        BusinessDecorationDescription: BusDecDes,
        BusinessTargetGroupDescription: BusTarDes,
        BusinessOperatingTimeDescription: BusOpeDes,
        BusinessStoreOperationDescription: BusStoreOpeDes,
    })
    return data
}

export const InBuLocatSizeOwnerRelate = async (PrivilCost,RentCost,AccoFee,BusID,LocatID,SizeID,OwnerID)=>{
    const data = await axios.post(`/BusinessLocationSizeOwnerShipRelated/InBuLocatSizeOwnerRelate`,{
        PrivillageCost: PrivilCost,
        RentalCost: RentCost,
        AccountingFee: AccoFee,
        BusinessID: BusID,
        LocationID: LocatID,
        SizeID: SizeID,
        OwnershipID: OwnerID,
    })
    return data
}

export const InBuProductSeller = async (BusID,ProdQuaID)=>{
    const data = await axios.post(`/Product/InBuProductSeller`,{
        BusinessID: BusID,
        ProductQualityID: ProdQuaID,
    })
    return data
}



