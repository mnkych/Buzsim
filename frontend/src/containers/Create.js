import React from 'react';
import SizeOwnerLocationCreate from '../components/Create/SizeOwnerLocationCreate/SizeOwnerLocationCreate';
import TargetGroupCreate from '../components/Create/TargetGroupCreate/TargetGroupCreate';
import DecorationCreate from '../components/Create/DecorationCreate/DecorationCreate';
import ProductCreate from '../components/Create/ProductCreate/ProductCreate';
import HumanResource from '../components/Create/HumanResource/HumanResource';
import MacroEnvCreate from '../components/Create/MacroEnv/MacroEnvCreate';
import Competitor from '../components/Create/Competitor/competitor';
import PromotionCreate from '../components/Create/Promotion/promotion';
import scrollIntoView from 'scroll-into-view'
import {
    Sidenav,
    ItemNav,
} from '../Provider/CSS/styled';
import {
    Grid,
    Container,
    Button
} from 'semantic-ui-react';
import styled from 'styled-components';
import { getNumberOptions } from '../Provider/StoreProvider/StoreProvider';
import { getAllLocation, getAllSize, getAllOwnership, getAllCompetitor, getAllMarketing, getAllDecoration, getAllTargetGroup, getAllHumanResource, getAllProduct, getQuality, getAllBusiness, getSelectSizeBusinessRelate, getSelectLocationBusinessRelate, getSelectOwnershipBusinessRelate, getAllBusinessSizeLocationOwnership, getSelectTargetGroupBuBuTarget, getSelectDecorationBuDec, getSelectAllDecorationBuDec, getSelectSeHumanBusinessHireEmp, getSelectSeMarketingBusinessMarket, getSelectSeCompetitorBusinessCom, getSelectBuProductSellerProdQualityProd, getSelectBuProductSellerProdQualityProdQuality, getSelectBuProductAcceptByTarget } from '../Provider/GetData/GetData';
import { createOption, checkDuplicateTargetGroup, targetGroupRemove, targetGroupAdd, targetGroupAddEmpty, getTargetGroupByID, calculateTotalQuantity, checkDuplicateProductQuality, productqualityRemove, productQualityAddEmpty, productQualityAdd, getProductQualityByID, getProductAcceptionById, checkDuplicatargetProductAcception, getDecorationRelationById, getStoreRelationById, checkDuplicateStoreRelation, checkDuplicateDecorationRelation, swalSuccess, swalError, swalWarning } from '../Provider/CreateProvider/CreateProvider';
import { insertDecoration, insertLocation, insertSize, insertOwnership, insertMarketing, insertHumanResource, insertCompetitor, insertProduct, insertBusinessHumanResource, insertBusinessMarketing, insertProductQuality, insertBusinessTargetGroup, insertBusinessDecoration, insertProductAcceptByTarget, insertBusinessCompetitor, InBuScenario, InBuLocatSizeOwnerRelate, InBuProductSeller } from '../Provider/InsertData/InsertData';
import bgadmin from '../Static/img/bgadmin.svg';
import swal from 'sweetalert2'
import { UserProvider } from '../Provider/UserProvider/UserProvider';
import { Back_hv } from '../Provider/CSS/hover'

const NavigationItem = styled(ItemNav)`
    cursor: pointer;
    background-color: ${
    props => props.active ? '#00B5AD' : 'inherit'
    };
`
const Bg_wrap = styled.div`
    background:url(${bgadmin}) ;
    /* background-size:cover; */
`
const Wrap = styled.div`
background:url(${bgadmin}) no-repeat;
background-size:cover;
height:101vh;
`

export default class Create extends React.Component {
    state = {
        activeNav: 'macro',
        scenarioName: '',
        scenarioDescription: '',
        storeOperationDescription: '',
        targetGroupDescription: '',
        decorationDescription: '',
        operatingtimeDescription: '',
        merchandisingDescription: '',
        humanResourceDescription: '',
        marketingDescription: '',
        year: 10,
        startMoney: '',
        grossdemand: '',
        licenseCost: '',
        grossGrowUpRate: '',
        loanInterestRate: '',
        economicEvent: '',
        inflation: '',
        pricePolicyGrowUpRate: '',

        sizeName: '',
        marketsharedScore: '',
        storage: '',
        electricity: '',
        sizeChoice: [],
        sizeModal: false,
        sizeOption: [],

        itemName: '',
        depreciation: '',

        locationName: '',
        totalPopulation: '',
        tradingPopulation: '',
        totalPopulationGrowUpRate: '',
        locationChoice: [],
        locationModal: false,
        locationOption: [],

        electricityPerUnit: '',
        otherCost: '',
        landTaxCost: '',
        maintainCost: '',
        ownershipName: '',
        ownerDepreciation: '',
        ownershipChoice: [],
        ownershipModal: false,
        ownershipOption: [],

        storeOperationChoice: [],

        targetGroupChoice: [],
        targetGroupOption: [],

        decorationChoice: [],

        decorationRelationChoice: [],
        decorationModal: false,
        decorationOption: [],

        channel: '',
        pricePerTime: '',
        marketingChoice: [],
        promotionModal: false,
        marketingOption: [],

        productModal: false,
        fulltimeOption: [],
        parttimeOption: [],
        fulltimeChoice: [],
        parttimeChoice: [],
        humanresourceModal: false,
        job: '',
        jobType: '',
        status: '',
        baseSalaryPerMonth: '',
        basePayPerHour: '',
        baseSalaryGrowUpRate: '',
        additionPayPerExp: '',

        competitorOption: [],
        competitorChoice: [],
        competitorModal: false,
        decorationScore: '',
        productVarietyScore: '',
        productQualityScore: '',
        sizeScore: '',
        dayScore: '',
        timeScore: '',
        numberOfEmployeeScore: '',
        numberOfAssistanceScore: '',
        marketingVarietyScore: '',
        marketingFrequencyScore: '',
        competitorName: '',

        productOption: [],
        productChoice: [],
        qualityOption: [],
        qualityChoice: [],
        BasePricePerUnit: [],
        acceptionChoice: [],

        ProductName: '',
        ProductDepreciationRatio: '',

        oldBusinessOption: [],
        oldMacro: '',

        oldStoreOperation: '',

        oldTargetGroup: '',

        oldDecoration: '',

        oldProduct: '',

        oldHuman: '',

        oldPromotion: '',

        oldCompetitor: ''
    }
    componentWillMount = () => {
        if (!UserProvider.getUserOnLog()) {
            swal({
                position: 'center',
                type: 'info',
                title: 'Instructor ?',
                html: 'Please login first',
                showConfirmButton: true,
            }).then(() => {
                this.logOut()
            })
        }
    }
    logOut = () => {
        UserProvider.setUserOnLog(undefined)
        this.props.history.replace({
            pathname: "/",
            state: undefined
        })
    }
    async componentDidMount() {
        let fulltime = [], parttime = []
        let dataLocation = await getAllLocation()
        let dataSize = await getAllSize()
        let dataOwnership = await getAllOwnership()
        let dataDecoration = await getAllDecoration()
        let dataTargetGroup = await getAllTargetGroup()
        let dataMarketing = await getAllMarketing()
        let dataHuman = await getAllHumanResource()
        let dataCompetitor = await getAllCompetitor()
        let dataProduct = await getAllProduct()
        let dataQuality = await getQuality()
        let dataOldMarcroOption = await getAllBusiness()
        if (dataHuman) {
            dataHuman.map(e => {
                if (e.JobType) {
                    fulltime.push(e)
                } else {
                    parttime.push(e)
                }
            })
        }
        dataLocation = createOption(dataLocation)
        dataSize = createOption(dataSize)
        dataOwnership = createOption(dataOwnership)
        dataDecoration = createOption(dataDecoration)
        dataCompetitor = createOption(dataCompetitor)
        dataMarketing = createOption(dataMarketing)
        dataProduct = createOption(dataProduct)
        fulltime = createOption(fulltime)
        parttime = createOption(parttime)
        dataOldMarcroOption = createOption(dataOldMarcroOption, 1)
        this.setState({
            locationOption: dataLocation,
            sizeOption: dataSize,
            ownershipOption: dataOwnership,
            decorationOption: dataDecoration,
            competitorOption: dataCompetitor,
            marketingOption: dataMarketing,
            targetGroupOption: dataTargetGroup,
            fulltimeOption: fulltime,
            parttimeOption: parttime,
            productOption: dataProduct,
            qualityOption: dataQuality,
            oldBusinessOption: dataOldMarcroOption
        })
        this.addComponentEventListener()
        window.addEventListener('scroll', this.scrollFunction);
    }
    addComponentEventListener = () => {
        let arr = document.getElementsByClassName("inputBox")
        var invalidChars = [
            "-",
            "+",
            "e",
        ];
        for (let i = 0; i < arr.length; i++) {
            arr[i].addEventListener("keypress", function (evt) {
                if (invalidChars.includes(evt.key)) {
                    evt.preventDefault();
                }
            })
        }
        arr = document.getElementsByClassName("inputMinusBox")
        var invalidChars = [
            "+",
            "e",
        ];
        for (let i = 0; i < arr.length; i++) {
            arr[i].addEventListener("keypress", function (evt) {
                if (invalidChars.includes(evt.key)) {
                    evt.preventDefault();
                }
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollFunction);
    }
    scrollFunction = (e) => {
        let marcro = document.getElementById("macro").offsetTop - 60
        let store = document.getElementById("store").offsetTop - 60
        let target = document.getElementById("target").offsetTop - 60
        let decoration = document.getElementById("decoration").offsetTop - 60
        let merChandise = document.getElementById("product").offsetTop - 60
        let human = document.getElementById("human").offsetTop - 60
        let promotion = document.getElementById("promotion").offsetTop - 60
        let competitor = document.getElementById("competitor").offsetTop - 60
        let windowCheck = window.pageYOffset

        if (windowCheck >= marcro && windowCheck < store) {
            this.setState({
                activeNav: "macro"
            })
        }
        if (windowCheck >= store && windowCheck < target) {
            this.setState({
                activeNav: "store"
            })
        }
        if (windowCheck >= target && windowCheck < decoration) {
            this.setState({
                activeNav: "target"
            })
        }
        if (windowCheck >= decoration && windowCheck < merChandise) {
            this.setState({
                activeNav: "decoration"
            })
        }
        if (windowCheck >= merChandise && windowCheck < human) {
            this.setState({
                activeNav: "product"
            })
        }
        if (windowCheck >= human && windowCheck < promotion) {
            this.setState({
                activeNav: "human"
            })
        }
        if (windowCheck >= promotion && windowCheck < competitor) {
            this.setState({
                activeNav: "promotion"
            })
        }
        if (windowCheck >= competitor) {
            this.setState({
                activeNav: "competitor"
            })
        }
    }
    handleChangeNumericValue = async ({ name, value }) => {
        let tmp = ""
        if (value !== "" && value !== undefined && value !== null) {
            tmp = parseInt(value, 10)
            if (Number.isNaN(tmp)) {
                tmp = ""
            }
        }
        await this.setState({
            [name]: tmp
        })
    }
    handleChangeFloatValue = async ({ name, value }) => {
        let tmp = ""
        if (value !== "" && value !== undefined && value !== null) {
            value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
            tmp = parseFloat(value)
            if (Number.isNaN(tmp)) {
                tmp = ""
            }
        }
        await this.setState({
            [name]: tmp
        })
    }
    handleChangeMinusFloatValue = async ({ name, value }) => {
        let tmp = ""
        if (value !== "" && value !== undefined && value !== null) {
            value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
            tmp = parseFloat(value)
            if (Number.isNaN(tmp)) {
                tmp = ""
            }
        }
        await this.setState({
            [name]: tmp
        })
    }
    handleChangeDescription = async ({ name, value }) => {
        await this.setState(
            name === 'status' && this.state.status === 'Owner' ?
                {
                    [name]: value,
                } :
                {
                    [name]: value, baseSalaryPerMonth: 0
                }
        )
        let newQualityChoice = this.state.qualityChoice, newStoreRelation = this.state.storeOperationChoice, newDecorationRelationChoice = this.state.decorationRelationChoice, newAcception = this.state.acceptionChoice
        if (this.state.locationChoice && this.state.ownershipChoice && this.state.sizeChoice && this.state.locationChoice.length > 0 && this.state.ownershipChoice.length > 0 && this.state.sizeChoice.length > 0) {
            let storeOperationChoice = this.state.storeOperationChoice
            newStoreRelation = []
            this.state.ownershipChoice.map((ownership, indexTar) => {
                ownership = JSON.parse(ownership)
                this.state.sizeChoice.map((size, indexAc) => {
                    size = JSON.parse(size)
                    this.state.locationChoice.map((location, index) => {
                        location = JSON.parse(location)
                        if (checkDuplicateStoreRelation({ ...ownership, ...location, ...size }, storeOperationChoice)) {
                            newStoreRelation.push(getStoreRelationById({ ...ownership, ...location, ...size }, storeOperationChoice))
                        } else {
                            if (ownership.OwnershipName === 'Rent') {
                                newStoreRelation.push({ ...ownership, ...location, ...size, PrivillageCost: 0, RentalCost: '', AccountingFee: '' })
                            }
                            if (ownership.OwnershipName === 'Buy') {
                                newStoreRelation.push({ ...ownership, ...location, ...size, PrivillageCost: '', RentalCost: 0, AccountingFee: '' })
                            }
                            if (ownership.OwnershipName === 'Lease') {
                                newStoreRelation.push({ ...ownership, ...location, ...size, PrivillageCost: '', RentalCost: '', AccountingFee: '' })
                            }
                        }
                    })
                })
            })
        }
        if (this.state.locationChoice && this.state.decorationChoice && this.state.sizeChoice && this.state.locationChoice.length > 0 && this.state.decorationChoice.length > 0 && this.state.sizeChoice.length > 0) {
            let stateDecRelation = this.state.decorationRelationChoice
            newDecorationRelationChoice = []
            this.state.decorationChoice.map((decoration, indexTar) => {
                decoration = JSON.parse(decoration)
                this.state.locationChoice.map((location, indexAc) => {
                    location = JSON.parse(location)
                    this.state.sizeChoice.map((size, index) => {
                        size = JSON.parse(size)
                        if (checkDuplicateDecorationRelation({ ...decoration, ...location, ...size }, stateDecRelation)) {
                            newDecorationRelationChoice.push(getDecorationRelationById({ ...decoration, ...location, ...size }, stateDecRelation))
                        } else {
                            newDecorationRelationChoice.push({ ...decoration, ...location, ...size, ElectricityUnitPerHour: '', Price: '' })
                        }
                    })
                })
            })
        }
        if (this.state.targetGroupChoice && this.state.targetGroupChoice.length > 0 && this.state.productChoice && this.state.productChoice.length > 0) {
            let acceptionChoice = this.state.acceptionChoice
            newAcception = []
            this.state.targetGroupChoice.map((target, indexTar) => {
                this.state.productChoice.map((product, indexAc) => {
                    product = JSON.parse(product)
                    if (checkDuplicatargetProductAcception({ ...target, ...product }, acceptionChoice)) {
                        newAcception.push(getProductAcceptionById({ ...target, ...product }, acceptionChoice))
                    } else {
                        newAcception.push({ ...target, ...product, AcceptRatio: '', AcceptRatioGrowUpRate: '', MaximumPriceRate: '' })
                    }
                })
            })
        }
        if (this.state.productChoice && this.state.productChoice.length > 0 && this.state.qualityChoice && this.state.qualityChoice.length > 0) {
            let qualityChoice = this.state.qualityChoice
            newQualityChoice = []
            this.state.productChoice.map((pc, indexQ) => {
                pc = JSON.parse(pc)
                newQualityChoice.push(...qualityChoice.filter(qc => {
                    return pc.ProductID === qc.ProductID
                })
                )
            })
        }
        this.setState({
            acceptionChoice: newAcception,
            decorationRelationChoice: newDecorationRelationChoice,
            storeOperationChoice: newStoreRelation,
            qualityChoice: newQualityChoice
        })
        this.addComponentEventListener()
    }
    handleChangeTargetGroupChoice = async (value) => {
        let stateTargetGroup = this.state.targetGroupChoice
        let acceptionChoice = this.state.acceptionChoice
        let newAcception = []
        if (checkDuplicateTargetGroup(value, stateTargetGroup)) {
            stateTargetGroup = targetGroupRemove(value, stateTargetGroup)
        } else {
            if (stateTargetGroup.length === 0) {
                stateTargetGroup = targetGroupAddEmpty(value)
            } else {
                stateTargetGroup = targetGroupAdd(value, stateTargetGroup)
            }
        }
        if (stateTargetGroup && stateTargetGroup.length > 0 && this.state.productChoice && this.state.productChoice.length > 0) {
            stateTargetGroup.map((target, indexTar) => {
                this.state.productChoice.map((product, indexAc) => {
                    product = JSON.parse(product)
                    if (checkDuplicatargetProductAcception({ ...target, ...product }, acceptionChoice)) {
                        newAcception.push(getProductAcceptionById({ ...target, ...product }, acceptionChoice))
                    } else {
                        newAcception.push({ ...target, ...product, AcceptRatio: '', AcceptRatioGrowUpRate: '', MaximumPriceRate: '' })
                    }
                })
            })
            await this.setState({
                targetGroupChoice: stateTargetGroup,
                acceptionChoice: newAcception
            })
        } else {
            await this.setState({
                targetGroupChoice: stateTargetGroup,
            })
        }
    }
    handleChangeTagetGroupInfo = async (name, object, value) => {
        let state = this.state.targetGroupChoice
        let selected = getTargetGroupByID(object, state)
        let tmp = ""
        if (name === 'TargetGroupQuantityRatio') {
            if (value || value === 0) {
                value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
                tmp = parseInt(value, 10)
                if (Number.isNaN(tmp)) {
                    tmp = ""
                }
            }
        } else {
            if (value || value === 0) {
                value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
                tmp = parseFloat(value)
                if (Number.isNaN(tmp)) {
                    tmp = ""
                }
            }
        }
        selected[name] = tmp
        let index = state.findIndex(e => {
            return e.TargetGroupID === object.TargetGroupID
        })
        state[index] = selected
        this.setState({
            targetGroupChoice: state
        })
    }
    adapOnBlur = async (object) => {
        let state = this.state.targetGroupChoice
        let nowQuantity = calculateTotalQuantity(state, 'TargetGroupQuantityRatio')
        let selected = getTargetGroupByID(object, state)
        let index = state.findIndex(e => {
            return e.TargetGroupID === object.TargetGroupID
        })
        if (selected.TargetGroupQuantityRatio + (nowQuantity - selected.TargetGroupQuantityRatio) > 100) {
            selected.TargetGroupQuantityRatio = 100 - (nowQuantity - selected.TargetGroupQuantityRatio)
        }
        state[index] = selected
        this.setState({
            targetGroupChoice: state
        })
    }
    handleProductQuality = async (value) => {
        let stateQuality = this.state.qualityChoice
        if (checkDuplicateProductQuality(value, stateQuality)) {
            stateQuality = productqualityRemove(value, stateQuality)
        } else {
            if (stateQuality.length === 0) {
                stateQuality = productQualityAddEmpty(value)
            } else {
                stateQuality = productQualityAdd(value, stateQuality)
            }
        }
        await this.setState({
            qualityChoice: stateQuality
        })
    }
    handleProductQualityInfo = async (name, object, value) => {
        let state = this.state.qualityChoice
        let selected = getProductQualityByID(object, state)
        let tmp = ""
        if (value || value === 0) {
            value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
            tmp = parseInt(value, 10)
            if (Number.isNaN(tmp)) {
                tmp = ""
            }
        }
        selected[name] = tmp
        let index = state.findIndex(e => {
            return object.QualityID === e.QualityID && object.ProductID === e.ProductID
        })
        state[index] = selected
        this.setState({
            qualityChoice: state
        })
    }
    handleProductAcceptInfo = async (name, object, value) => {
        let state = this.state.acceptionChoice
        let selected = getProductAcceptionById(object, state)
        let tmp = ""
        if (name !== 'AcceptRatioGrowUpRate') {
            if (value || value === 0) {
                value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
                tmp = parseInt(value, 10)
                if (Number.isNaN(tmp)) {
                    tmp = ""
                }
            }
        } else {
            if (value || value === 0) {
                value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
                tmp = parseFloat(value)
                if (Number.isNaN(tmp)) {
                    tmp = ""
                }
            }
        }
        selected[name] = tmp
        let index = state.findIndex(e => {
            return object.TargetGroupID === e.TargetGroupID && object.ProductID === e.ProductID
        })
        state[index] = selected
        this.setState({
            acceptionChoice: state
        })
    }
    acceptOnBlur = async (object) => {
        let state = this.state.acceptionChoice
        let selected = getProductAcceptionById(object, state)
        let statefilter = state.filter(e => { return object.TargetGroupID === e.TargetGroupID })
        let nowQuantity = calculateTotalQuantity(statefilter, 'AcceptRatio')
        let index = state.findIndex(e => {
            return object.TargetGroupID === e.TargetGroupID && object.ProductID === e.ProductID
        })
        if (selected.AcceptRatio + (nowQuantity - selected.AcceptRatio) > 100) {
            selected.AcceptRatio = 100 - (nowQuantity - selected.AcceptRatio)
        }
        state[index] = selected
        this.setState({
            acceptionChoice: state
        })
    }
    handleDecorationRelation = async (name, object, value) => {
        let state = this.state.decorationRelationChoice
        let selected = getDecorationRelationById(object, state)
        let tmp = ""
        if (name === 'Price') {
            if (value || value === 0) {
                value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
                tmp = parseInt(value, 10)
                if (Number.isNaN(tmp)) {
                    tmp = ""
                }
            }
        } else {
            if (value || value === 0) {
                value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
                tmp = parseFloat(value)
                if (Number.isNaN(tmp)) {
                    tmp = ""
                }
            }
        }
        selected[name] = tmp
        let index = state.findIndex(e => {
            return object.DecorationID === e.DecorationID && object.SizeID === e.SizeID && object.LocationID === e.LocationID
        })
        state[index] = selected
        this.setState({
            decorationRelationChoice: state
        })
    }
    handleChangeStoreRelation = async (name, object, value) => {
        let state = this.state.storeOperationChoice
        let selected = getStoreRelationById(object, state)
        let tmp = ""

        if (value || value === 0) {
            value = value.replace(!/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '')
            tmp = parseInt(value, 10)
            if (Number.isNaN(tmp)) {
                tmp = ""
            }
        }
        selected[name] = tmp
        let index = state.findIndex(e => {
            return object.OwnershipID === e.OwnershipID && object.SizeID === e.SizeID && object.LocationID === e.LocationID
        })
        state[index] = selected
        this.setState({
            storeOperationChoice: state
        })
    }
    handleChangeFromPreviousSce = async (name, value = null) => {
        if (name === 'oldMacro') {
            if (value) {
                let marcro = JSON.parse(value)
                this.setState({
                    [name]: value,
                    scenarioName: marcro.BusinessName,
                    scenarioDescription: marcro.BusinessScenarioDescription,
                    storeOperationDescription: marcro.BusinessStoreOperationDescription,
                    targetGroupDescription: marcro.BusinessTargetGroupDescription,
                    decorationDescription: marcro.BusinessDecorationDescription,
                    operatingtimeDescription: marcro.BusinessOperatingTimeDescription,
                    merchandisingDescription: marcro.BusinessProductDescription,
                    humanResourceDescription: marcro.BusinessEmployeeDescription,
                    marketingDescription: marcro.BusinessPromotionDescription,
                    year: marcro.BusinessPlayingYear,
                    startMoney: marcro.BusinessStartMoney,
                    grossdemand: marcro.BusinessGrossDemand,
                    licenseCost: marcro.BusinessLicenseCost,
                    grossGrowUpRate: marcro.BusinessGrossDemandGrowUpRate,
                    loanInterestRate: marcro.BusinessLoanInterestRate,
                    economicEvent: marcro.BusinessEconomicEvent,
                    inflation: marcro.BusinessInflation,
                    pricePolicyGrowUpRate: marcro.BusinessPriceGrowthPolicy,
                })
            } else {
                this.setState({
                    [name]: '',
                    scenarioName: '',
                    scenarioDescription: '',
                    storeOperationDescription: '',
                    targetGroupDescription: '',
                    decorationDescription: '',
                    operatingtimeDescription: '',
                    merchandisingDescription: '',
                    humanResourceDescription: '',
                    marketingDescription: '',
                    year: 10,
                    startMoney: '',
                    grossdemand: '',
                    licenseCost: '',
                    grossGrowUpRate: '',
                    loanInterestRate: '',
                    economicEvent: '',
                    inflation: '',
                    pricePolicyGrowUpRate: '',
                })
            }
        }
        if (name === 'oldStoreOperation') {
            if (value) {
                let store = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        const dataSize = await getSelectSizeBusinessRelate(store.BusinessID)
                        const dataLo = await getSelectLocationBusinessRelate(store.BusinessID)
                        const dataOwn = await getSelectOwnershipBusinessRelate(store.BusinessID)
                        const dataRelate = await getAllBusinessSizeLocationOwnership(store.BusinessID)
                        await this.handleChangeDescription({ name: 'sizeChoice', value: dataSize.map(e => { return JSON.stringify(e) }) })
                        await this.handleChangeDescription({ name: 'locationChoice', value: dataLo.map(e => { return JSON.stringify(e) }) })
                        await this.handleChangeDescription({ name: 'ownershipChoice', value: dataOwn.map(e => { return JSON.stringify(e) }) })
                        let relate = []
                        dataRelate.map(element => {
                            if (checkDuplicateStoreRelation(element, this.state.storeOperationChoice)) {
                                relate.push(element)
                            }
                        })
                        this.setState({
                            [name]: value,
                            storeOperationChoice: relate
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    sizeChoice: [],
                    locationChoice: [],
                    ownershipChoice: [],
                    storeOperationChoice: [],
                    [name]: ''
                })
            }
        }
        if (name === 'oldTargetGroup') {
            if (value) {
                let target = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        const dataTarget = await getSelectTargetGroupBuBuTarget(target.BusinessID)
                        await this.handleChangeDescription({ name: 'targetGroupChoice', value: dataTarget.map(e => { return e }) })
                        this.setState({
                            [name]: value,
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    targetGroupChoice: [],
                    [name]: ''
                })
            }
        }
        if (name === 'oldDecoration') {
            if (value) {
                let dec = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        let relate = []
                        swal.showLoading()
                        const dataDec = await getSelectDecorationBuDec(dec.BusinessID)
                        const decRelate = await getSelectAllDecorationBuDec(dec.BusinessID)
                        decRelate.map(element => {
                            relate.push(element)
                        })
                        await this.setState({ decorationRelationChoice: relate })
                        await this.handleChangeDescription({ name: 'decorationChoice', value: dataDec.map(e => { return JSON.stringify(e) }) })
                        await this.setState({
                            [name]: value,
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    decorationChoice: [],
                    [name]: '',
                    decorationRelationChoice: []
                })
            }
        }
        if (name === 'oldProduct') {
            if (value) {
                let prod = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        let accept = []
                        swal.showLoading()
                        const dataProd = await getSelectBuProductSellerProdQualityProd(prod.BusinessID)
                        const dataQuality = await getSelectBuProductSellerProdQualityProdQuality(prod.BusinessID)
                        const dataAccept = await getSelectBuProductAcceptByTarget(prod.BusinessID)
                        await this.handleChangeDescription({ name: 'productChoice', value: dataProd.map(e => { return JSON.stringify(e) }) })
                        if (this.state.acceptionChoice && this.state.acceptionChoice.length > 0) {
                            dataAccept.map(element => {
                                if (checkDuplicatargetProductAcception(element, this.state.acceptionChoice)) {
                                    accept.push(element)
                                }
                            })
                        } else {
                            dataAccept.map(element => {
                                accept.push(element)
                            })
                        }
                        this.setState({
                            [name]: value,
                            qualityChoice: dataQuality,
                            acceptionChoice: accept
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    productChoice: [],
                    qualityChoice: [],
                    acceptionChoice: [],
                    [name]: ''
                })
            }
        }
        if (name === 'oldHuman') {
            if (value) {
                let human = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        const dataHuman = await getSelectSeHumanBusinessHireEmp(human.BusinessID)
                        let dataft = [], datapt = []
                        dataHuman.map(element => {
                            if (element.JobType) {
                                dataft.push(JSON.stringify(element))
                            } else {
                                datapt.push(JSON.stringify(element))
                            }
                        })
                        this.setState({
                            [name]: value,
                            fulltimeChoice: dataft,
                            parttimeChoice: datapt
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    fulltimeChoice: [],
                    parttimeChoice: [],
                    [name]: ''
                })
            }
        }
        if (name === 'oldPromotion') {
            if (value) {
                let market = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        const dataMarket = await getSelectSeMarketingBusinessMarket(market.BusinessID)
                        let markets = dataMarket.map(element => {
                            return JSON.stringify(element)
                        })
                        this.setState({
                            [name]: value,
                            marketingChoice: markets
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    marketingChoice: [],
                    [name]: ''
                })
            }
        }
        if (name === 'oldCompetitor') {
            if (value) {
                let comp = JSON.parse(value)
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        const dataComp = await getSelectSeCompetitorBusinessCom(comp.BusinessID)
                        let comps = dataComp.map(element => {
                            return JSON.stringify(element)
                        })
                        this.setState({
                            [name]: value,
                            competitorChoice: comps
                        })
                    }
                }).then(() => {
                    swal.close()
                })
            } else {
                this.setState({
                    competitorChoice: [],
                    [name]: ''
                })
            }
        }
    }
    addSize = async (name) => {
        if (this.isSizePass()) {
            await insertSize(this.state.sizeName, this.state.storage, this.state.electricity, this.state.marketsharedScore)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                this.handleChangeDescription({ name: 'sizeChoice', value: this.state.sizeChoice.concat([this.state.sizeOption[this.state.sizeOption.length - 1].value]) })
                                this.setState({
                                    sizeName: '',
                                    storage: '',
                                    electricity: '',
                                    marketsharedScore: '',
                                })
                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    addLocation = async (name) => {
        if (this.isLocationPass()) {
            await insertLocation(this.state.locationName, this.state.totalPopulation, this.state.tradingPopulation, this.state.totalPopulationGrowUpRate)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                this.handleChangeDescription({ name: 'locationChoice', value: this.state.locationChoice.concat([this.state.locationOption[this.state.locationOption.length - 1].value]) })
                                this.setState({
                                    locationName: '',
                                    totalPopulation: '',
                                    tradingPopulation: '',
                                    totalPopulationGrowUpRate: '',
                                })
                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    addOwnership = async (name) => {
        if (this.isOwnershipPass()) {
            await insertOwnership(this.state.ownershipName, this.state.maintainCost, this.state.landTaxCost, this.state.otherCost, this.state.electricityPerUnit, this.state.ownerDepreciation)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                this.handleChangeDescription({ name: 'ownershipChoice', value: this.state.ownershipChoice.concat([this.state.ownershipOption[this.state.ownershipOption.length - 1].value]) })
                                this.setState({
                                    ownershipName: '',
                                    maintainCost: '',
                                    landTaxCost: '',
                                    otherCost: '',
                                    electricityPerUnit: '',
                                    ownerDepreciation: '',
                                })
                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()

        }
    }
    addDecoration = async (name) => {
        if (this.isDecorationAddPass()) {
            await insertDecoration(this.state.itemName, this.state.depreciation)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                this.handleChangeDescription({ name: 'decorationChoice', value: this.state.decorationChoice.concat([this.state.decorationOption[this.state.decorationOption.length - 1].value]) })
                                this.setState({
                                    itemName: '',
                                    depreciation: '',
                                })
                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    addMarketing = async (name) => {
        if (this.isMarketingAddPass()) {
            await insertMarketing(this.state.channel, this.state.pricePerTime)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                let choice = this.state.marketingChoice
                                choice.push(this.state.marketingOption[this.state.marketingOption.length - 1].value)
                                this.setState({
                                    channel: '',
                                    pricePerTime: '',
                                    marketingChoice: choice
                                })
                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    addHumanResource = async (name) => {
        if (this.isHumanAddPass()) {
            await insertHumanResource(this.state.job, this.state.jobType, this.state.status, this.state.baseSalaryPerMonth ? this.state.baseSalaryPerMonth : null, this.state.basePayPerHour ? this.state.basePayPerHour : null, this.state.baseSalaryGrowUpRate, this.state.additionPayPerExp)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                let fChoice = this.state.fulltimeChoice
                                let pChoice = this.state.parttimeChoice
                                if (this.state.jobType) {
                                    fChoice.push(this.state.fulltimeOption[this.state.fulltimeOption.length - 1].value)
                                } else {
                                    pChoice.push(this.state.parttimeOption[this.state.parttimeOption.length - 1].value)
                                }
                                this.setState({
                                    job: '',
                                    jobType: '',
                                    status: '',
                                    baseSalaryPerMonth: '',
                                    basePayPerHour: '',
                                    baseSalaryGrowUpRate: '',
                                    additionPayPerExp: '',
                                    fulltimeChoice: fChoice,
                                    parttimeChoice: pChoice
                                })
                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    addCompetitor = async (name) => {
        if (this.isCompetitorAddPass()) {
            await insertCompetitor(this.state.decorationScore, this.state.productVarietyScore, this.state.productQualityScore, this.state.sizeScore, this.state.dayScore, this.state.timeScore, this.state.numberOfEmployeeScore, this.state.numberOfAssistanceScore, this.state.marketingVarietyScore, this.state.marketingFrequencyScore, this.state.competitorName)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                let choice = this.state.competitorChoice
                                choice.push(this.state.competitorOption[this.state.competitorOption.length - 1].value)
                                this.setState({
                                    decorationScore: '',
                                    productVarietyScore: '',
                                    productQualityScore: '',
                                    sizeScore: '',
                                    dayScore: '',
                                    timeScore: '',
                                    numberOfEmployeeScore: '',
                                    numberOfAssistanceScore: '',
                                    marketingVarietyScore: '',
                                    marketingFrequencyScore: '',
                                    competitorName: '',
                                    competitorChoice: choice
                                })


                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    addProduct = async (name) => {
        if (this.isProductAddpass()) {
            await insertProduct(this.state.ProductName, this.state.ProductName, this.state.ProductDepreciationRatio)
                .then((e) => {
                    if (e.data) {
                        swalSuccess()
                            .then(async () => {
                                this.trigger(name)
                                await this.componentDidMount()
                                this.handleChangeDescription({ name: 'productChoice', value: this.state.productChoice.concat([this.state.productOption[this.state.productOption.length - 1].value]) })
                                this.setState({
                                    ProductName: '',
                                    ProductDepreciationRatio: '',
                                })

                            })
                    } else {
                        swalError()
                    }
                })
        } else {
            swalWarning()
        }
    }
    isSizePass = () => {
        let isSizePass = false
        if (this.state.marketsharedScore &&
            (this.state.electricity || this.state.electricity === 0) &&
            this.state.storage &&
            this.state.sizeName
        ) {
            isSizePass = true
        }
        return isSizePass
    }
    isLocationPass = () => {
        let isLocationPass = false
        if (this.state.locationName &&
            (this.state.totalPopulation || this.state.totalPopulation === 0) &&
            (this.state.tradingPopulation || this.state.tradingPopulation === 0) &&
            (this.state.totalPopulationGrowUpRate || this.state.totalPopulationGrowUpRate === 0)) {
            isLocationPass = true
        }
        return isLocationPass
    }
    isOwnershipPass = () => {
        let isOwnershipPass = false
        if ((this.state.electricityPerUnit || this.state.electricityPerUnit === 0) &&
            (this.state.otherCost || this.state.otherCost === 0) &&
            (this.state.landTaxCost || this.state.landTaxCost === 0) &&
            this.state.ownershipName &&
            (this.state.maintainCost || this.state.maintainCost === 0) &&
            (this.state.ownerDepreciation || this.state.ownerDepreciation === 0)) {
            isOwnershipPass = true
        }
        return isOwnershipPass
    }
    isRelevantPass = () => {
        let isRelevantPass = false
        if (this.state.storeOperationChoice && this.state.storeOperationChoice.length > 0 && this.state.storeOperationChoice.every(e => { return (e.PrivillageCost || e.PrivillageCost === 0) && (e.RentalCost || e.RentalCost === 0) && (e.AccountingFee || e.AccountingFee === 0) })) {
            isRelevantPass = true
        }
        return isRelevantPass
    }
    isDecorationPass = () => {
        let isDecorationPass = false
        if (this.state.decorationRelationChoice && this.state.decorationRelationChoice.length > 0 &&
            this.state.decorationRelationChoice.every(e => { return (e.ElectricityUnitPerHour || e.ElectricityUnitPerHour === 0) && (e.Price || e.Price === 0) })) {
            isDecorationPass = true
        }
        return isDecorationPass
    }
    isTargetGroupPass = () => {
        let isTargetGroupPass = false
        if (this.state.targetGroupChoice && this.state.targetGroupChoice.length > 0 && this.state.targetGroupChoice.every(e => { return e.TargetGroupID && e.TargetGroupName && (e.TargetGroupQuantityRatio || e.TargetGroupQuantityRatio === 0) && (e.TargetGroupGrowUpRatio || e.TargetGroupGrowUpRatio === 0) })) {
            isTargetGroupPass = true
        }
        return isTargetGroupPass
    }
    isProductQualityPass = () => {
        let isProductQualityPass = false
        if (this.state.qualityChoice && this.state.qualityChoice.length > 0 && this.state.productChoice && this.state.productChoice.length > 0 && this.state.qualityChoice.every(e => { return e.QualityID && e.ProductID && (e.BasePricePerUnit || e.BasePricePerUnit === 0) })) {
            let check = this.state.productChoice.map(e => {
                e = JSON.parse(e)
                return this.state.qualityChoice.some(q => { return e.ProductID === q.ProductID })
            })
            if (check.find(e => { return e === false }) === undefined) {
                isProductQualityPass = true
            }
        }
        return isProductQualityPass
    }
    isDecorationAddPass = () => {
        let isDecorationPass = false
        if (this.state.depreciation &&
            this.state.itemName
        ) {
            isDecorationPass = true
        }
        return isDecorationPass
    }
    isMarketingAddPass = () => {
        let isMarketingAddPass = false
        if ((this.state.pricePerTime || this.state.pricePerTime === 0) && this.state.channel) {
            isMarketingAddPass = true
        }
        return isMarketingAddPass
    }
    isHumanAddPass = () => {
        let isHumanAddPass = false
        if (
            (
                this.state.job &&
                this.state.status &&
                (this.state.baseSalaryGrowUpRate || this.state.baseSalaryGrowUpRate === 0) &&
                (this.state.additionPayPerExp || this.state.additionPayPerExp === 0)
            ) &&
            (this.state.baseSalaryPerMonth ||
                this.state.baseSalaryPerMonth === 0 ||
                this.state.basePayPerHour ||
                this.state.basePayPerHour === 0
            ) && (
                this.state.jobType === true ||
                this.state.jobType === false
            )
        ) {
            isHumanAddPass = true
        }
        return isHumanAddPass
    }
    isCompetitorAddPass = () => {
        let isCompetitorAddPass = false
        if (this.state.decorationScore &&
            this.state.productVarietyScore &&
            this.state.productQualityScore &&
            this.state.sizeScore &&
            this.state.dayScore &&
            this.state.timeScore &&
            this.state.numberOfEmployeeScore &&
            this.state.numberOfAssistanceScore &&
            this.state.marketingVarietyScore &&
            this.state.marketingFrequencyScore &&
            this.state.competitorName) {
            isCompetitorAddPass = true
        }
        return isCompetitorAddPass
    }
    isProductAddpass = () => {
        let isProductAddpass = false
        if (this.state.ProductName &&
            (this.state.ProductDepreciationRatio || this.state.ProductDepreciationRatio === 0)) {
            isProductAddpass = true
        }
        return isProductAddpass
    }
    isAcceptionPass = () => {
        let isAcceptionPass = false
        if (this.state.acceptionChoice && this.state.acceptionChoice.length > 0 && this.state.acceptionChoice.every(e => { return (e.AcceptRatio || e.AcceptRatio === 0) && (e.AcceptRatioGrowUpRate || e.AcceptRatioGrowUpRate === 0) && (e.MaximumPriceRate || e.MaximumPriceRate === 0) })) {
            isAcceptionPass = true

        }
        return isAcceptionPass
    }
    isMarcroEnvPass = () => {
        let isMarcroEnvPass = false
        if (this.state.scenarioName &&
            this.state.scenarioDescription &&
            this.state.storeOperationDescription &&
            this.state.targetGroupDescription &&
            this.state.decorationDescription &&
            this.state.operatingtimeDescription &&
            this.state.merchandisingDescription &&
            this.state.humanResourceDescription &&
            this.state.marketingDescription &&
            this.state.year &&
            (this.state.startMoney || this.state.startMoney === 0) &&
            (this.state.grossdemand || this.state.grossdemand === 0) &&
            (this.state.licenseCost || this.state.licenseCost === 0) &&
            (this.state.grossGrowUpRate || this.state.grossGrowUpRate === 0) &&
            (this.state.loanInterestRate || this.state.loanInterestRate === 0) &&
            (this.state.economicEvent || this.state.economicEvent === 0) &&
            (this.state.inflation || this.state.inflation === 0) &&
            (this.state.pricePolicyGrowUpRate || this.state.pricePolicyGrowUpRate === 0)) {
            isMarcroEnvPass = true
        }
        return isMarcroEnvPass
    }
    navWhenClick = (id) => {
        let element = document.getElementById(id)
        scrollIntoView(element);
        this.setState({ activeNav: id })
    }
    trigger = async (name) => {
        let status = true
        if (this.state[name]) {
            status = false
        }
        await this.setState({
            [name]: status
        })
        this.addComponentEventListener()
    }
    isCreateScenarioPass = () => {
        let isCreateScenarioPass = false
        if (this.isMarcroEnvPass() && this.state.locationChoice && this.state.locationChoice.length > 0 && this.state.ownershipChoice && this.state.ownershipChoice.length > 0 &&
            this.state.sizeChoice && this.state.sizeChoice.length > 0 && this.isTargetGroupPass() && this.isDecorationPass() && this.isRelevantPass() && this.isProductQualityPass() &&
            this.state.productChoice && this.state.productChoice.length > 0 && this.state.marketingChoice && this.state.marketingChoice.length > 0 && this.state.fulltimeChoice && this.state.fulltimeChoice.length > 0 &&
            this.state.parttimeChoice && this.state.parttimeChoice.length > 0 && this.isAcceptionPass()) {
            isCreateScenarioPass = true
        }
        return isCreateScenarioPass
    }
    addScenario = async () => {
        if (this.isCreateScenarioPass()) {
            swal({
                html: 'Please wait',
                timer: 2000,
                showConfirmButton: false,
                onBeforeOpen: async () => {
                    let id = await InBuScenario(this.state.scenarioName, this.state.startMoney, this.state.loanInterestRate, this.state.economicEvent, this.state.grossdemand, this.state.grossGrowUpRate,
                        this.state.licenseCost, this.state.merchandisingDescription, this.state.humanResourceDescription, this.state.scenarioDescription, this.state.inflation, this.state.year, this.state.pricePolicyGrowUpRate,
                        this.state.marketingDescription, this.state.decorationDescription, this.state.targetGroupDescription, this.state.operatingtimeDescription, this.state.storeOperationDescription)

                    this.state.qualityChoice.map(async proQuality => {
                        let pqID = await insertProductQuality(proQuality.BasePricePerUnit, proQuality.QualityID, proQuality.ProductID)
                        await InBuProductSeller(id.data[0], pqID.data[0])
                    })
                    this.state.fulltimeChoice.map(async human => {
                        human = JSON.parse(human)
                        await insertBusinessHumanResource(id.data[0], human.HumanResourceID)
                    })
                    this.state.parttimeChoice.map(async ptHuman => {
                        ptHuman = JSON.parse(ptHuman)
                        await insertBusinessHumanResource(id.data[0], ptHuman.HumanResourceID)
                    })
                    this.state.marketingChoice.map(async marketing => {
                        marketing = JSON.parse(marketing)
                        await insertBusinessMarketing(id.data[0], marketing.MarketingID)
                    })
                    this.state.targetGroupChoice.map(async target => {
                        await insertBusinessTargetGroup(id.data[0], target.TargetGroupID, target.TargetGroupQuantityRatio, target.TargetGroupGrowUpRatio)
                    })

                    this.state.storeOperationChoice.map(async store => {
                        await InBuLocatSizeOwnerRelate(store.PrivillageCost, store.RentalCost, store.AccountingFee, id.data[0], store.LocationID, store.SizeID, store.OwnershipID)
                    })
                    this.state.decorationRelationChoice.map(async dec => {
                        await insertBusinessDecoration(id.data[0], dec.DecorationID, dec.SizeID, dec.LocationID, dec.Price, dec.ElectricityUnitPerHour)
                    })
                    this.state.acceptionChoice.map(async acc => {
                        await insertProductAcceptByTarget(acc.AcceptRatio, id.data[0], acc.TargetGroupID, acc.ProductID, acc.AcceptRatioGrowUpRate, acc.MaximumPriceRate)
                    })
                    if (this.state.competitorChoice.length > 0) {
                        this.state.competitorChoice.map(async com => {
                            com = JSON.parse(com)
                            await insertBusinessCompetitor(id.data[0], com.CompetitorScoreID)
                        })
                    }
                }
            }).then(() => {
                swal.close()
                swalSuccess()
                this.props.history.push({
                    pathname: `/Management`,
                    state: UserProvider.getUserOnLog()
                })
            }).catch(() => {
                swalError()
            })
        } else {
            swalWarning()
        }
    }
    handleLocation = (path) => {
        this.props.history.push({
            pathname: `/${path}`,
            state: UserProvider.getUserOnLog()
        })
    }
    render() {
        const { activeNav } = this.state
        if (UserProvider.getUserOnLog()) {
            return (
                <Bg_wrap>
                    <Back_hv style={{ paddingTop: "2%", position: "absolute" }} name="arrow alternate circle left" size='huge' link color='grey' onClick={() => this.handleLocation('Management')} />
                    <Container style={{ backgroundColor: 'background-color: rgba(0, 0, 0, 0.6)' }}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Sidenav>
                                        <NavigationItem
                                            active={activeNav === 'macro'}
                                            onClick={() => this.navWhenClick('macro')}>
                                            Macro Economics
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'store'}
                                            onClick={() => this.navWhenClick('store')}>
                                            Store Operation
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'target'}
                                            onClick={() => this.navWhenClick('target')}>
                                            Target Group
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'decoration'}
                                            onClick={() => this.navWhenClick('decoration')}>
                                            Decoration
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'product'}
                                            onClick={() => this.navWhenClick('product')}>
                                            Merchandise
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'human'}
                                            onClick={() => this.navWhenClick('human')}>
                                            Human Resource
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'promotion'}
                                            onClick={() => this.navWhenClick('promotion')}>
                                            Promotion
                                </NavigationItem>
                                        <NavigationItem
                                            active={activeNav === 'competitor'}
                                            onClick={() => this.navWhenClick('competitor')}>
                                            Competitor
                                </NavigationItem>
                                    </Sidenav>
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <span id='macro'>
                                        <MacroEnvCreate
                                            handleChangeNumericValue={this.handleChangeNumericValue}
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleChangeFloatValue={this.handleChangeFloatValue}
                                            handleChangeMinusFloatValue={this.handleChangeMinusFloatValue}
                                            optionYear={getNumberOptions(1, 10)}

                                            scenarioName={this.state.scenarioName}
                                            startMoney={this.state.startMoney}
                                            grossdemand={this.state.grossdemand}
                                            licenseCost={this.state.licenseCost}
                                            grossGrowUpRate={this.state.grossGrowUpRate}
                                            loanInterestRate={this.state.loanInterestRate}
                                            economicEvent={this.state.economicEvent}
                                            inflation={this.state.inflation}
                                            pricePolicyGrowUpRate={this.state.pricePolicyGrowUpRate}
                                            year={this.state.year}
                                            yearCheck={this.state.yearCheck}

                                            scenarioDescription={this.state.scenarioDescription}
                                            storeOperationDescription={this.state.storeOperationDescription}
                                            targetGroupDescription={this.state.targetGroupDescription}
                                            decorationDescription={this.state.decorationDescription}
                                            operatingtimeDescription={this.state.operatingtimeDescription}
                                            merchandisingDescription={this.state.merchandisingDescription}
                                            humanResourceDescription={this.state.humanResourceDescription}
                                            marketingDescription={this.state.marketingDescription}

                                            oldBusinessOption={this.state.oldBusinessOption}
                                            oldMacro={this.state.oldMacro}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}
                                        />
                                    </span>
                                    <span id='store'>
                                        <SizeOwnerLocationCreate
                                            handleChangeNumericValue={this.handleChangeNumericValue}
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleChangeFloatValue={this.handleChangeFloatValue}
                                            handleChangeStoreRelation={this.handleChangeStoreRelation}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}
                                            optionScore={getNumberOptions(1, 10)}

                                            sizeName={this.state.sizeName}
                                            marketsharedScore={this.state.marketsharedScore}
                                            storage={this.state.storage}
                                            electricity={this.state.electricity}
                                            sizeOption={this.state.sizeOption}
                                            sizeChoice={this.state.sizeChoice}

                                            addSize={this.addSize}

                                            sizeModal={this.state.sizeModal}

                                            optionTrading={getNumberOptions(1, 100)}

                                            locationName={this.state.locationName}
                                            totalPopulation={this.state.totalPopulation}
                                            tradingPopulation={this.state.tradingPopulation}
                                            totalPopulationGrowUpRate={this.state.totalPopulationGrowUpRate}
                                            locationOption={this.state.locationOption}
                                            locationChoice={this.state.locationChoice}

                                            addLocation={this.addLocation}

                                            locationModal={this.state.locationModal}

                                            optionOwnership={[{ key: 1, text: 'Rent', value: 'Rent' }, { key: 2, text: 'Buy', value: 'Buy' }, { key: 3, text: 'Lease', value: 'Lease' }]}

                                            electricityPerUnit={this.state.electricityPerUnit}
                                            otherCost={this.state.otherCost}
                                            landTaxCost={this.state.landTaxCost}
                                            ownershipName={this.state.ownershipName}
                                            ownerDepreciation={this.state.ownerDepreciation}
                                            maintainCost={this.state.maintainCost}
                                            ownershipOption={this.state.ownershipOption}
                                            ownershipChoice={this.state.ownershipChoice}

                                            addOwnership={this.addOwnership}

                                            ownershipModal={this.state.ownershipModal}

                                            storeOperationChoice={this.state.storeOperationChoice}
                                            trigger={this.trigger}

                                            oldStoreOperation={this.state.oldStoreOperation}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                    <span id='target'>
                                        <TargetGroupCreate
                                            handleChangeTargetGroupChoice={this.handleChangeTargetGroupChoice}
                                            handleChangeTagetGroupInfo={this.handleChangeTagetGroupInfo}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}
                                            adapOnBlur={this.adapOnBlur}
                                            targetGroupChoice={this.state.targetGroupChoice}
                                            targetGroupOption={this.state.targetGroupOption}

                                            oldTargetGroup={this.state.oldTargetGroup}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                    <span id='decoration'>
                                        <DecorationCreate
                                            handleChangeNumericValue={this.handleChangeNumericValue}
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleChangeFloatValue={this.handleChangeFloatValue}
                                            handleDecorationRelation={this.handleDecorationRelation}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}

                                            optionYear={getNumberOptions(1, 10)}
                                            decorationOption={this.state.decorationOption}

                                            decorationChoice={this.state.decorationChoice}
                                            locationChoice={this.state.locationChoice}
                                            sizeChoice={this.state.sizeChoice}

                                            itemName={this.state.itemName}
                                            depreciation={this.state.depreciation}

                                            addDecoration={this.addDecoration}
                                            decorationRelationChoice={this.state.decorationRelationChoice}

                                            decorationModal={this.state.decorationModal}
                                            trigger={this.trigger}

                                            oldDecoration={this.state.oldDecoration}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                    <span id='product'>
                                        <ProductCreate
                                            handleChangeNumericValue={this.handleChangeNumericValue}
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleProductQuality={this.handleProductQuality}
                                            handleProductQualityInfo={this.handleProductQualityInfo}
                                            handleProductAcceptInfo={this.handleProductAcceptInfo}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}
                                            acceptOnBlur={this.acceptOnBlur}
                                            addProduct={this.addProduct}
                                            optionRatio={getNumberOptions(0, 100)}

                                            qualityOption={this.state.qualityOption}
                                            qualityChoice={this.state.qualityChoice}
                                            productOption={this.state.productOption}
                                            productChoice={this.state.productChoice}
                                            BasePricePerUnit={this.state.BasePricePerUnit}

                                            ProductName={this.state.ProductName}
                                            ProductDepreciationRatio={this.state.ProductDepreciationRatio}

                                            targetGroupChoice={this.state.targetGroupChoice}
                                            acceptionChoice={this.state.acceptionChoice}

                                            productModal={this.state.productModal}
                                            trigger={this.trigger}

                                            oldProduct={this.state.oldProduct}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                    <span id='human'>
                                        <HumanResource
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleChangeNumericValue={this.handleChangeNumericValue}
                                            addHumanResource={this.addHumanResource}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}

                                            fulltimeOption={this.state.fulltimeOption}
                                            parttimeOption={this.state.parttimeOption}

                                            fulltimeChoice={this.state.fulltimeChoice}
                                            parttimeChoice={this.state.parttimeChoice}

                                            job={this.state.job}
                                            jobType={this.state.jobType}
                                            status={this.state.status}
                                            baseSalaryPerMonth={this.state.baseSalaryPerMonth}
                                            basePayPerHour={this.state.basePayPerHour}
                                            baseSalaryGrowUpRate={this.state.baseSalaryGrowUpRate}
                                            additionPayPerExp={this.state.additionPayPerExp}
                                            optionStatus={[{ key: 1, text: 'Owner', value: 'Owner' }, { key: 2, text: 'Main', value: 'Main' }, { key: 3, text: 'Assistant', value: 'Assistant' }, { key: 4, text: 'Other', value: 'Other' }]}

                                            humanresourceModal={this.state.humanresourceModal}
                                            trigger={this.trigger}

                                            oldHuman={this.state.oldHuman}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                    <span id='promotion'>
                                        <PromotionCreate
                                            handleChangeFloatValue={this.handleChangeFloatValue}
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}
                                            addMarketing={this.addMarketing}

                                            marketingOption={this.state.marketingOption}
                                            marketingChoice={this.state.marketingChoice}

                                            channel={this.state.channel}
                                            pricePerTime={this.state.pricePerTime}

                                            promotionModal={this.state.promotionModal}
                                            trigger={this.trigger}

                                            oldPromotion={this.state.oldPromotion}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                    <span id='competitor'>
                                        <Competitor
                                            competitorOption={this.state.competitorOption}
                                            competitorChoice={this.state.competitorChoice}
                                            rangeScoreOption={getNumberOptions(1, 10)}

                                            handleChangeNumericValue={this.handleChangeNumericValue}
                                            handleChangeDescription={this.handleChangeDescription}
                                            handleChangeFromPreviousSce={this.handleChangeFromPreviousSce}
                                            addCompetitor={this.addCompetitor}

                                            decorationScore={this.state.decorationScore}
                                            productVarietyScore={this.state.productVarietyScore}
                                            productQualityScore={this.state.productQualityScore}
                                            sizeScore={this.state.sizeScore}
                                            dayScore={this.state.dayScore}
                                            timeScore={this.state.timeScore}
                                            numberOfEmployeeScore={this.state.numberOfEmployeeScore}
                                            numberOfAssistanceScore={this.state.numberOfAssistanceScore}
                                            marketingVarietyScore={this.state.marketingVarietyScore}
                                            marketingFrequencyScore={this.state.marketingFrequencyScore}
                                            competitorName={this.state.competitorName}

                                            competitorModal={this.state.competitorModal}
                                            trigger={this.trigger}

                                            oldCompetitor={this.state.oldCompetitor}
                                            oldBusinessOption={this.state.oldBusinessOption}
                                        />
                                    </span>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>

                                </Grid.Column>
                                <Grid.Column width={13} textAlign='center'>
                                    <Button size='large' primary onClick={() => this.addScenario()}>Confirm</Button>
                                </Grid.Column>
                                
                            </Grid.Row>
                        </Grid>

                    </Container>
                </Bg_wrap>
            )
        } else {
            return (<Wrap fluid></Wrap>)
        }
    }
}