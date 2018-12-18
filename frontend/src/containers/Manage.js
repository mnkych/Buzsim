import React from 'react';
import NavbarContent from '../components/Navbar/Navbar';
import SetupStore from '../components/Manage/SetupStore/SetupStore';
import Decoration from '../components/Manage/Decoration/Decoration';
import TargetGroup from '../components/Manage/TargetGroup/TargetGroup';
import StoreOperatingTime from '../components/Manage/StoreOperatingTime/StoreOperatingTime';
import Product from '../components/Manage/Product/Product';
import Marketing from '../components/Manage/Marketing/Marketing';
import HumanResource from '../components/Manage/HumanResource/HumanResource';
import Summary from '../components/Report/Summary';
import Cost from '../components/Manage/Report/Cost';
import ProductReport from '../components/Manage/Report/ProductReport';
import Overview from '../components/Manage/Report/Overview';
import MacroEnvironment from '../components/Manage/Report/MacroEnvironment';
import { Collapse } from 'reactstrap';
import Draggable from 'react-draggable';
import { getTimeChoices, calculateStoreOperatingTime, redirectPage, calculateMarketShare, getNumberOptions, calculateTotalDept } from '../Provider/StoreProvider/StoreProvider';
import { decorationItemAdd, decorationItemAddEmpty, decorationItemRemove, checkDuplicateDecoration } from '../Provider/DecorationProvider/DecorationProvider';
import { isAllProductPass, checkDuplicateProduct, productItemAdd, productItemAddEmpty, productItemRemove, getIndexByID, calculateFreeStorage, calculateTotalAmount, productAmountReset } from '../Provider/ProductProvider/ProductProvider';
import { checkDuplicateMarketing, marketSourceAdd, marketSourceAddEmpty, marketSourceRemove, getMarketIndexByID, isAllMarketingPass } from '../Provider/MarketingProvider/MarketingProvider';
import {
    getBusinessScenario,
    getCompetitor,
    getSizeChoice,
    getLocationChoice,
    getOwnershipChoice,
    getTargetGroupChoice,
    getDecorationChoice,
    getProductChoice,
    getProductDetail,
    getMarketing,
    getEmployee,
    getBusinessSizeLocationOwnership,
    getProductAccept,
    getClassRoom,
    getUserStore,
    getStoreOperationUserSelected,
    getStoreDecorationSelected,
    getStoreMarketingSelected,
    getStoreHumanResourceSelected,
    getStoreProductSelected
} from '../Provider/GetData/GetData'
import {
    Grid,
    Button,
    Icon,
    Modal,
    Loader,
    Dimmer,
    Menu,
    Header,
    Popup,
    Checkbox
} from 'semantic-ui-react';
import { checkDuplicateEmployee, employeeRemove, employeeHire, employeeHireEmpty, getEmployeeIndexByID, checkDuplicatePartEmployee, partEmployeeHire, partEmployeeHireEmpty, partEmployeeRemove, getPartEmployeeIndexByID, isAllFulltimeEmployeePass, isAllParttimeEmployeePass, countMainFulltimeEmployeePass, countMainParttimeEmployeePass, setExptoZero } from '../Provider/HumanResourceProvider/HumanResorceProvider';
import {
    Body_content,
    Content_wrap,
    Alert,
    Navbar_scroll,
    Navbar_scroll_item,
    Navbar_scroll_bg,
    Fin_ratio_wrap,
    Footer_scroll,
    Footer_scroll_bg,
    Grid_bg,
    Sticky_info,
    Confirm_wrap
} from '../Provider/CSS/styled';
import {
    Content_shadow
} from '../Provider/CSS/hover';
import '../Provider/CSS/styles.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { insertUserStore, insertStoreDecoration, insertStoreProductSelling, insertStoreMarketing, insertStoreHireEmployee } from '../Provider/InsertData/InsertData';
import { deleteUserStore } from '../Provider/DeleteData/DeleteData';
import Classroom from '../components/Classroom/classroom';

export default class Manage extends React.Component {
    state = {
        collapse: false,
        summaryWindow: false,
        check: false,
        isSelectedPasscheck: false,
        isSelectedPassMsg: [],
        confirmCheck: false,
        changeToMenuWhenSticky: false,
        sizeChangeCheck: false,
        acceptLoanStatus: false,
        preAcceptLoanStatus: false,
        acceptLoan: false,
        activeMenu: '',
        position: {
            x: 0,
            y: 0
        },
        storeEmail: '',
        roomKey: '',
        storeEmailCheck: false,
        roomKeyCheck: false
    }
    componentDidMount = async () => {
        const memory = window.sessionStorage.getItem("UserSelected")
        const businessID = await this.turnPropsValue(this.props.match.params.level)
        window.addEventListener('scroll', this.scrollFunction);
        if (memory !== null && businessID !== undefined && this.props.location.state && !this.props.location.state.userEmail) {
            if (this.props.location.state.userSelected && memory === JSON.stringify(this.props.location.state.userSelected)) {
                this.setState(this.props.location.state.userSelected)
            } else {
                window.sessionStorage.removeItem("UserSelected")
                this.componentDidMount()
            }
        } else {
            if (businessID === undefined) {
                this.setState({
                    check: true
                })
            }
            const dataBis = await getBusinessScenario(businessID)
            const dataComp = await getCompetitor(businessID)
            const dataSize = await getSizeChoice(businessID)
            const dataLo = await getLocationChoice(businessID)
            const dataOwn = await getOwnershipChoice(businessID)
            const dataTarget = await getTargetGroupChoice(businessID)
            const dataPro = await getProductChoice(businessID)
            const dataMarketing = await getMarketing(businessID)
            const dataFullTime = await getEmployee(businessID, 1)
            const dataPartTime = await getEmployee(businessID, 0)
            const productChoice = dataPro.data.map((e) => {
                return getProductDetail({ BusinessID: businessID, ProductID: e.ProductID })
            })
            let related, classRoom, userData, targetGroup, location, size, owner, openTime, closeTime, hour, day, decoration, dataDec, relatedSelected, human, partHuman, fullHuman, product, accept, market = [], user = ""
            if (this.props.location.state) {
                if (this.props.location.state.userEmail) {
                    classRoom = await getClassRoom(this.props.match.params.level)
                    userData = await getUserStore(businessID, this.props.location.state.userEmail,classRoom.ClassID)
                    if (userData.data !== "") {
                        related = await getStoreOperationUserSelected(userData.data.StoreID, userData.data.BusinessLocationSizeOwnerRelevantID)
                        decoration = await getStoreDecorationSelected(userData.data.StoreID)
                        market = await getStoreMarketingSelected(userData.data.StoreID)
                        human = await getStoreHumanResourceSelected(userData.data.StoreID)
                        product = await getStoreProductSelected(userData.data.StoreID)
                        if (decoration === "") {
                            decoration = undefined
                        }
                        if (market === "") {
                            market = []
                        } else {
                            market = await market.map(e => {
                                return {
                                    marketingDetail: { MarketingID: e.MarketingID, Channel: e.Channel, PricePerTime: e.PricePerTime, BusinessMarketingID: e.BusinessMarketingID, BusinessID: e.BusinessID },
                                    frequency: e.Frequency,
                                    viewer: e.Reacher
                                }
                            })
                        }
                        if (human === "") {
                            human = undefined
                        } else {
                            await human.map(e => {
                                if (e.JobType === 1) {
                                    if (fullHuman === undefined) {
                                        fullHuman = []
                                    }
                                    fullHuman.push({ ...e, exp: e.Experience, numberOfEmployee: e.NumberOfEmployee })
                                    if(e.Status === 'Owner'){
                                        fullHuman[fullHuman.length-1].BaseSalaryPerMonth = e.OwnerSalary
                                    }
                                } else {
                                    if (partHuman === undefined) {
                                        partHuman = []
                                    }
                                    partHuman.push({ ...e, numberOfEmployee: e.NumberOfEmployee, workHourPerDay: e.EmployeeOperatingHour, workDayPerWeek: e.EmployeeOperatingDay, exp: e.Experience })
                                }
                            })
                            if (fullHuman !== undefined) {
                                fullHuman = { employeeSelected: fullHuman, bonus: related.StoreBonus, allowance: related.StoreAllowance }
                            }
                        }
                        product = await product.map(e => {
                            return { ProductID: e.ProductID, productDetail: {ProductQualityID:e.ProductQualityID,BasePricePerUnit:e.BasePricePerUnit,QualityID:e.QualityID,ProductID:e.ProductID,BusinessProductSellerID:e.BusinessProductSellerID,BusinessID:e.BusinessID,QualityName:e.QualityName,MarketSharedScore:e.MarketSharedScore,ProductName:e.ProductName,ProductType:e.ProductType,ProductDepreciationRatio:e.ProductDepreciationRatio}, sellingPrice: e.PriceForSale, amount: e.Amount }
                        })
                        targetGroup = await dataTarget.data.find(e => {
                            return e.BusinessTargetGroupID === related.BusinessTargetGroupID
                        })
                        location = await dataLo.data.find(e => {
                            return e.LocationID === related.LocationID
                        })
                        size = await dataSize.data.find(e => {
                            return e.SizeID === related.SizeID
                        })
                        owner = await dataOwn.data.find(e => {
                            return e.OwnershipID === related.OwnershipID
                        })
                        dataDec = await getDecorationChoice({ BusinessID: businessID, LocationID: location.LocationID, SizeID: size.SizeID })
                        relatedSelected = await getBusinessSizeLocationOwnership(businessID, size.SizeID, location.LocationID, owner.OwnershipID)
                        accept = await getProductAccept(businessID, targetGroup.TargetGroupID)

                        accept = accept.data
                        relatedSelected = relatedSelected.data
                        dataDec = dataDec.data
                        user = userData.data
                        hour = related.StoreOperatingHour
                        day = related.StoreOperatingDay
                        closeTime = related.StoreCloseTime
                        openTime = related.StoreOpenTime
                    }
                }
            }
            await Promise.all(productChoice).then((choices) => {
                const options = choices.map((e) => {
                    const choice = e.data.map(tmp => {
                        let obj = { key: tmp.ProductQualityID, value: JSON.stringify(tmp), text: tmp.QualityName }
                        return obj
                    })
                    return choice
                })
                if (dataBis.data === "") {
                    this.setState({
                        check: true
                    })
                } else {
                    let economic = []
                    for (let i = 0; i <= dataBis.data.BusinessPlayingYear; i++) {
                        economic.push(Math.floor(Math.random() * 3) - 1)
                    }
                    this.setState({
                        businessScenarioData: {...dataBis.data , economic:economic},
                        competitorSelected: dataComp.data,
                        sizeData: dataSize.data,
                        locationData: dataLo.data,
                        ownershipData: dataOwn.data,
                        targetGroupData: dataTarget.data,
                        productData: options,
                        productChoice: dataPro.data,
                        marketingData: dataMarketing.data,
                        fullTimeData: dataFullTime.data,
                        partTimeData: dataPartTime.data,
                        openTimeData: getTimeChoices(),
                        closeTimeData: getTimeChoices(),
                        economic: economic
                    })
                    this.setState({
                        userStore: user,
                        classRoom: classRoom,
                        totalTimeSelected: hour,
                        daySelected: day,
                        closeTimeSelected: closeTime,
                        openTimeSelected: openTime,
                        targetGroupSelected: JSON.stringify(targetGroup),
                        locationSelected: JSON.stringify(location),
                        sizeSelected: JSON.stringify(size),
                        ownershipSelected: JSON.stringify(owner),
                        decorationSelected: decoration,
                        decorationData: dataDec,
                        marketingSelected: market,
                        employeeSelected: fullHuman,
                        productSelected: product,
                        parttimeEmployeeSelected: partHuman,
                        productTypeAcceptSelected: accept,
                        businessScenarioData: { ...this.state.businessScenarioData, ...relatedSelected }
                    })
                }
            })
        }
    }
    clear = () => {
        window.sessionStorage.removeItem("UserSelected")
        window.location.reload()
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollFunction);
    }
    scrollFunction = (e) => {
        let topStoreSetup = document.getElementById("StoreSetup").offsetTop - 60
        let topTargetGroup = document.getElementById("TargetGroup").offsetTop - 60
        let topOperatingTime = document.getElementById("OperatingTime").offsetTop - 60
        let topDecoration = document.getElementById("Decoration").offsetTop - 60
        let topMerChandise = document.getElementById("Merchandise").offsetTop - 60
        let topHuman = document.getElementById("HumanResource").offsetTop - 60
        let topPromotion = document.getElementById("Promotion").offsetTop - 60
        let windowCheck = window.pageYOffset

        if (windowCheck >= topStoreSetup && windowCheck < topTargetGroup) {
            this.setState({
                activeMenu: "StoreSetup"
            })
        }
        if (windowCheck >= topTargetGroup && windowCheck < topOperatingTime) {
            this.setState({
                activeMenu: "TargetGroup"
            })
        }
        if (windowCheck >= topOperatingTime && windowCheck < topHuman) {
            this.setState({
                activeMenu: "OperatingTime"
            })
        }
        if (windowCheck >= topHuman && windowCheck < topMerChandise) {
            this.setState({
                activeMenu: "HumanResource"
            })
        }
        if (windowCheck >= topMerChandise && windowCheck < topDecoration) {
            this.setState({
                activeMenu: "Merchandise"
            })
        }
        if (windowCheck >= topDecoration && windowCheck < topPromotion) {
            this.setState({
                activeMenu: "Decoration"
            })
        }
        if (windowCheck >= topPromotion) {
            this.setState({
                activeMenu: "Promotion"
            })
        }
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            document.getElementById("nav").style.top = "0";
            document.getElementById("footer").style.bottom = "0";
        } else {
            document.getElementById("nav").style.top = "-500px";
            document.getElementById("footer").style.bottom = "-500px";
        }
    }

    turnPropsValue = async (propsValue) => {
        let businessID = undefined
        switch (propsValue) {
            case "Difficult": businessID = 3
                break;
            case "Moderate": businessID = 2
                break;
            case "Easy": businessID = 1
                break;
            default: {
                let keyId = { BusinessID: undefined }
                keyId = await getClassRoom(propsValue)
                businessID = keyId.BusinessID
                if (!this.props.location.state && businessID !== undefined) {
                    this.handleModal()
                }
            }
        }
        return businessID
    }

    handleChangeLocation = async (data) => {
        await this.setState({
            locationSelected: data
        })
        if (this.state.locationSelected !== undefined && this.state.sizeSelected !== undefined && this.state.businessScenarioData.BusinessID !== undefined) {
            const dataDec = await getDecorationChoice({ BusinessID: this.state.businessScenarioData.BusinessID, LocationID: JSON.parse(this.state.locationSelected).LocationID, SizeID: JSON.parse(this.state.sizeSelected).SizeID })
            await this.setState({
                decorationData: dataDec.data,
                decorationSelected: undefined
            })
        }
        if (this.state.locationSelected !== undefined && this.state.sizeSelected !== undefined && this.state.businessScenarioData.BusinessID !== undefined && this.state.ownershipSelected !== undefined) {
            const related = await getBusinessSizeLocationOwnership(this.state.businessScenarioData.BusinessID, JSON.parse(this.state.sizeSelected).SizeID, JSON.parse(this.state.locationSelected).LocationID, JSON.parse(this.state.ownershipSelected).OwnershipID)
            await this.setState({
                businessScenarioData: { ...this.state.businessScenarioData, ...related.data }
            })
        }
        if (calculateTotalDept(this.state.decorationSelected, this.state.productSelected, this.state.businessScenarioData) < 0 && !this.state.acceptLoanStatus) {
            await this.setState({
                acceptLoan: true,
                loanCheckPoint: 'Location'
            })
        }
    }

    handleChangeSize = async (data) => {
        if (calculateTotalAmount(this.state.productSelected) > JSON.parse(data).Storage) {
            await this.setState({
                sizeSelected: data,
                sizeChangeCheck: true,
                productSelected: productAmountReset(this.state.productSelected)
            })
        } else {
            await this.setState({
                sizeSelected: data
            })
        }
        if (this.state.locationSelected !== undefined && this.state.sizeSelected !== undefined && this.state.businessScenarioData.BusinessID !== undefined) {
            const dataDec = await getDecorationChoice({ BusinessID: this.state.businessScenarioData.BusinessID, LocationID: JSON.parse(this.state.locationSelected).LocationID, SizeID: JSON.parse(this.state.sizeSelected).SizeID })
            await this.setState({
                decorationData: dataDec.data,
                decorationSelected: undefined
            })
        }
        if (this.state.locationSelected !== undefined && this.state.sizeSelected !== undefined && this.state.businessScenarioData.BusinessID !== undefined && this.state.ownershipSelected !== undefined) {
            const related = await getBusinessSizeLocationOwnership(this.state.businessScenarioData.BusinessID, JSON.parse(this.state.sizeSelected).SizeID, JSON.parse(this.state.locationSelected).LocationID, JSON.parse(this.state.ownershipSelected).OwnershipID)
            await this.setState({
                businessScenarioData: { ...this.state.businessScenarioData, ...related.data }
            })
        }
        if (calculateTotalDept(this.state.decorationSelected, this.state.productSelected, this.state.businessScenarioData) < 0 && !this.state.acceptLoanStatus) {
            await this.setState({
                acceptLoan: true,
                loanCheckPoint: 'Size'
            })
        }
    }

    handleChangeOwnership = async (data) => {
        await this.setState({
            ownershipSelected: data
        })
        if (this.state.locationSelected !== undefined && this.state.sizeSelected !== undefined && this.state.businessScenarioData.BusinessID !== undefined && this.state.ownershipSelected !== undefined) {
            const related = await getBusinessSizeLocationOwnership(this.state.businessScenarioData.BusinessID, JSON.parse(this.state.sizeSelected).SizeID, JSON.parse(this.state.locationSelected).LocationID, JSON.parse(this.state.ownershipSelected).OwnershipID)
            await this.setState({
                businessScenarioData: { ...this.state.businessScenarioData, ...related.data }
            })
        }
        if (calculateTotalDept(this.state.decorationSelected, this.state.productSelected, this.state.businessScenarioData) < 0 && !this.state.acceptLoanStatus) {
            await this.setState({
                acceptLoan: true,
                loanCheckPoint: 'Ownership'
            })
        }
    }


    handleChangeTargetGroup = async (data) => {
        await this.setState({
            targetGroupSelected: data
        })
        if (this.state.targetGroupSelected !== undefined && this.state.businessScenarioData !== undefined) {
            const data = await getProductAccept(this.state.businessScenarioData.BusinessID, JSON.parse(this.state.targetGroupSelected).TargetGroupID)
            await this.setState({
                productTypeAcceptSelected: data.data
            })
        }
    }

    handleChangeDay = async (data) => {
        await this.setState({
            daySelected: data
        })
    }

    handleChange24Hr = async (data) => {
        await this.setState({
            totalTimeSelected: data,
            openTimeSelected: JSON.stringify({ view: "All of Day" }),
            closeTimeSelected: JSON.stringify({ view: "All of Day" })
        })
    }

    handleChangeTimeOpen = async (data) => {
        await this.setState({
            openTimeSelected: data
        })
        if (this.state.openTimeSelected !== undefined) {
            const openTimeValue = JSON.parse(data).value;
            const closeTimeValue = getTimeChoices().filter(e => {
                return JSON.parse(e.value).value > openTimeValue
            })
            await this.setState({ closeTimeData: closeTimeValue })
        } else {
            await this.setState({ openTimeData: getTimeChoices() })
        }
        if (this.state.openTimeSelected === undefined || this.state.closeTimeSelected === undefined) {
            await this.setState({ totalTimeSelected: calculateStoreOperatingTime(0, 0) })
        } else {
            if (JSON.parse(this.state.openTimeSelected).view === "All of Day" || JSON.parse(this.state.closeTimeSelected).view === "All of Day") {
                if (JSON.parse(this.state.openTimeSelected).view === "All of Day") {
                    await this.setState({ totalTimeSelected: calculateStoreOperatingTime(0, JSON.parse(this.state.closeTimeSelected).value) })
                }
                else {
                    if (JSON.parse(this.state.closeTimeSelected).view === "All of Day") {
                        await this.setState({ totalTimeSelected: calculateStoreOperatingTime(JSON.parse(this.state.openTimeSelected).value, 0) })
                    }
                }
            } else {
                await this.setState({ totalTimeSelected: calculateStoreOperatingTime(JSON.parse(this.state.openTimeSelected).value, JSON.parse(this.state.closeTimeSelected).value) })
            }
        }
    }

    handleChangeTimeClose = async (data) => {
        await this.setState({
            closeTimeSelected: data
        })
        if (this.state.closeTimeSelected !== undefined) {
            const closeTimeValue = JSON.parse(data).value;
            const openTimeValue = getTimeChoices().filter((e) => {
                return JSON.parse(e.value).value < closeTimeValue
            })
            await this.setState({ openTimeData: openTimeValue })
        } else {
            await this.setState({ closeTimeData: getTimeChoices() })
        }
        if (this.state.openTimeSelected === undefined || this.state.closeTimeSelected === undefined) {
            await this.setState({ totalTimeSelected: calculateStoreOperatingTime(0, 0) })
        } else {
            if (JSON.parse(this.state.openTimeSelected).view === "All of Day" || JSON.parse(this.state.closeTimeSelected).view === "All of Day") {
                if (JSON.parse(this.state.openTimeSelected).view === "All of Day") {
                    await this.setState({ totalTimeSelected: calculateStoreOperatingTime(0, JSON.parse(this.state.closeTimeSelected).value) })
                }
                else {
                    if (JSON.parse(this.state.closeTimeSelected).view === "All of Day") {
                        await this.setState({ totalTimeSelected: calculateStoreOperatingTime(JSON.parse(this.state.openTimeSelected).value, 0) })
                    }
                }

            } else {
                await this.setState({ totalTimeSelected: calculateStoreOperatingTime(JSON.parse(this.state.openTimeSelected).value, JSON.parse(this.state.closeTimeSelected).value) })
            }
        }
    }

    handleChangeDecoration = async (data) => {
        let object = JSON.parse(data).value

        if (this.state.decorationSelected !== undefined) {
            if (await checkDuplicateDecoration(object, this.state.decorationSelected)) {
                this.setState({ decorationSelected: await decorationItemRemove(object, this.state.decorationSelected) })
            } else {
                this.setState({ decorationSelected: await decorationItemAdd(object, this.state.decorationSelected) })
            }
        } else {
            await this.setState({ decorationSelected: await decorationItemAddEmpty(object) })
        }
        if (calculateTotalDept(this.state.decorationSelected, this.state.productSelected, this.state.businessScenarioData) < 0 && !this.state.acceptLoanStatus) {
            await this.setState({
                acceptLoan: true,
                loanCheckPoint: 'Decoration'
            })
        }
    }

    handleChangeProduct = async (e, data) => {
        let object = JSON.parse(data.value)
        let tmp = []
        if (this.state.productSelected !== undefined) {
            if (await checkDuplicateProduct(object, this.state.productSelected)) {
                if (object.ProductQualityID !== undefined) {
                    tmp = await productItemRemove(object, this.state.productSelected)
                    tmp = await productItemAdd(object, this.state.productSelected)
                } else {
                    tmp = await productItemRemove(object, this.state.productSelected)
                }
            } else {
                tmp = await productItemAdd(object, this.state.productSelected)
            }
            await this.setState({ productSelected: tmp })
        } else {
            await this.setState({ productSelected: await productItemAddEmpty(object) })
        }
    }

    handleChangeProductAmount = async (e, data) => {
        const index = await getIndexByID(data.id, this.state.productSelected)
        const dataTmp = data.value
        let tmp = this.state.productSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null || dataTmp === "0") {
            tmp[index].amount = ""
        } else {
            tmp[index].amount = parseInt(dataTmp, 10)
            if (Number.isNaN(tmp[index].amount)) {
                tmp[index].amount = ""
            }
        }
        await this.setState({
            productSelected: tmp
        })
    }

    handleChangeProductSellingPrice = async (e, data) => {
        const index = await getIndexByID(data.id, this.state.productSelected)
        const dataTmp = data.value
        let tmp = this.state.productSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp[index].sellingPrice = ""
        } else {
            tmp[index].sellingPrice = parseInt(dataTmp, 10)
            if (Number.isNaN(tmp[index].sellingPrice)) {
                tmp[index].sellingPrice = ""
            }
        }
        await this.setState({
            productSelected: tmp
        })
    }

    adapOnBlur = (e) => {
        let check = false
        let data = e.target
        let id = parseInt(data.id, 10)
        const dataTmp = data.value
        let tmpAmount = parseInt(dataTmp, 10)
        if (Number.isNaN(tmpAmount)) {
            tmpAmount = ""
        } else {
            const freeSpace = calculateFreeStorage(this.state.productSelected, JSON.parse(this.state.sizeSelected).Storage)
            if (freeSpace >= 0) {
                this.handleAdaptionOfProductStorage(id, tmpAmount)
            }
            if (freeSpace < 0) {
                this.handleAdaptionOfProductStorage(id, tmpAmount + freeSpace)
                if (freeSpace != 0) {
                    check = true
                }

            }
        }
        if (calculateTotalDept(this.state.decorationSelected, this.state.productSelected, this.state.businessScenarioData) < 0 && !this.state.acceptLoanStatus) {
            this.setState({
                acceptLoan: true,
                loanCheckPoint: 'Product'
            })
        }
        return check
    }

    handleAdaptionOfProductStorage = async (id, value) => {
        const index = await getIndexByID(id, this.state.productSelected)
        let tmp = this.state.productSelected
        tmp[index].amount = value
        await this.setState({
            productSelected: tmp
        })
    }

    handleChangeMarketing = async (e, data) => {
        let object = JSON.parse(data.value)
        let tmp = []
        if (this.state.marketingSelected !== undefined) {
            if (await checkDuplicateMarketing(object, this.state.marketingSelected)) {
                tmp = await marketSourceRemove(object, this.state.marketingSelected)
            } else {
                tmp = await marketSourceAdd(object, this.state.marketingSelected)
            }
            await this.setState({ marketingSelected: tmp })
        } else {
            await this.setState({ marketingSelected: await marketSourceAddEmpty(object) })
        }
    }

    handleChangeMarketingFrequency = async (e, data) => {
        const index = await getMarketIndexByID(data.id, this.state.marketingSelected)
        const dataTmp = data.value
        let tmp = this.state.marketingSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null || dataTmp === "0") {
            tmp[index].frequency = ""
        } else {
            tmp[index].frequency = parseInt(dataTmp, 10)
            if (Number.isNaN(tmp[index].frequency)) {
                tmp[index].frequency = ""
            }
        }
        await this.setState({
            marketingSelected: tmp
        })
    }

    handleChangeMarketingViewer = async (e, data) => {
        const index = await getMarketIndexByID(data.id, this.state.marketingSelected)
        const dataTmp = data.value
        let tmp = this.state.marketingSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null || dataTmp === "0") {
            tmp[index].viewer = ""
        } else {
            tmp[index].viewer = parseInt(dataTmp, 10)
            if (Number.isNaN(tmp[index].viewer)) {
                tmp[index].viewer = ""
            }
        }
        await this.setState({
            marketingSelected: tmp
        })
    }


    handleChangeEmployee = async (e, data) => {
        let object = JSON.parse(data.value)
        let tmp
        if (this.state.employeeSelected !== undefined) {
            if (await checkDuplicateEmployee(object, this.state.employeeSelected)) {
                tmp = await employeeRemove(object, this.state.employeeSelected)
            } else {
                tmp = await employeeHire(object, this.state.employeeSelected)
            }
            await this.setState({ employeeSelected: tmp })
        } else {
            await this.setState({ employeeSelected: await employeeHireEmpty(object) })
        }
    }

    handleChangeEmployeeExp = async (e, data) => {
        const index = await getEmployeeIndexByID(data.id, this.state.employeeSelected)
        const dataTmp = data.value
        let tmp = this.state.employeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp.employeeSelected[index].exp = 0
        } else {
            tmp.employeeSelected[index].exp = dataTmp
        }
        await this.setState({
            employeeSelected: tmp
        })
    }
    handleChangeNumberOfEmployee = async (e, data) => {
        const index = await getEmployeeIndexByID(data.id, this.state.employeeSelected)
        const dataTmp = data.value
        let tmp = this.state.employeeSelected
        let parttime = this.state.parttimeEmployeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp.employeeSelected[index].numberOfEmployee = undefined
        } else {
            tmp.employeeSelected[index].numberOfEmployee = dataTmp
        }
        if( countMainFulltimeEmployeePass(tmp) > 0){
            parttime = setExptoZero(parttime)
        }
        await this.setState({
            employeeSelected: tmp,
            parttimeEmployeeSelected: parttime
        })
    }

    handleChangeEmployeeBonus = async (e, data) => {
        const dataTmp = data.value
        let tmp = this.state.employeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp.bonus = 0
        } else {
            tmp.bonus = dataTmp
        }
        await this.setState({
            employeeSelected: tmp
        })
    }

    handleChangeEmployeeAllowance = async (e, data) => {
        const dataTmp = data.value
        let tmp = this.state.employeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp.allowance = 0
        } else {
            tmp.allowance = dataTmp
        }
        await this.setState({
            employeeSelected: tmp
        })
    }
    handleChangeBaseSalaryOfOwner = async (e, data) => {
        const index = await getEmployeeIndexByID(data.id, this.state.employeeSelected)
        const dataTmp = data.value
        let tmp = this.state.employeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp.employeeSelected[index].BaseSalaryPerMonth = 0
        } else {
            tmp.employeeSelected[index].BaseSalaryPerMonth = parseInt(dataTmp, 10)
            if (Number.isNaN(tmp.employeeSelected[index].BaseSalaryPerMonth)) {
                tmp.employeeSelected[index].BaseSalaryPerMonth = 0
            }
        }
        await this.setState({
            employeeSelected: tmp
        })
    }

    handleChangePartEmployee = async (e, data) => {
        let object = JSON.parse(data.value)
        let tmp
        if (this.state.parttimeEmployeeSelected !== undefined) {
            if (await checkDuplicatePartEmployee(object, this.state.parttimeEmployeeSelected)) {
                tmp = await partEmployeeRemove(object, this.state.parttimeEmployeeSelected)
            } else {
                tmp = await partEmployeeHire(object, this.state.parttimeEmployeeSelected)
            }
            await this.setState({ parttimeEmployeeSelected: tmp })
        } else {
            await this.setState({ parttimeEmployeeSelected: await partEmployeeHireEmpty(object) })
        }
    }
    handleChangePartEmployeeExp = async (e, data) => {
        const index = await getPartEmployeeIndexByID(data.id, this.state.parttimeEmployeeSelected)
        const dataTmp = data.value
        let tmp = this.state.parttimeEmployeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp[index].exp = 0
        } else {
            tmp[index].exp = dataTmp
        }
        await this.setState({
            parttimeEmployeeSelected: tmp
        })
    }
    handleChangeNumberOfParttimeEmployee = async (e, data) => {
        const index = await getPartEmployeeIndexByID(data.id, this.state.parttimeEmployeeSelected)
        const dataTmp = data.value
        let tmp = this.state.parttimeEmployeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null) {
            tmp[index].numberOfEmployee = undefined
        } else {
            tmp[index].numberOfEmployee = dataTmp
        }
        await this.setState({
            parttimeEmployeeSelected: tmp
        })
    }
    handleWorkHourParttime = async (e, data) => {
        const index = await getPartEmployeeIndexByID(data.id, this.state.parttimeEmployeeSelected)
        const dataTmp = data.value
        let tmp = this.state.parttimeEmployeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null || dataTmp === 0) {
            tmp[index].workHourPerDay = 0
        } else {
            tmp[index].workHourPerDay = dataTmp
        }
        await this.setState({
            parttimeEmployeeSelected: tmp
        })
    }
    handleWorkDayParttime = async (e, data) => {
        const index = await getPartEmployeeIndexByID(data.id, this.state.parttimeEmployeeSelected)
        const dataTmp = data.value
        let tmp = this.state.parttimeEmployeeSelected
        if (dataTmp === "" || dataTmp === undefined || dataTmp === null || dataTmp === 0) {
            tmp[index].workDayPerWeek = 0
        } else {
            tmp[index].workDayPerWeek = dataTmp
        }
        await this.setState({
            parttimeEmployeeSelected: tmp
        })
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    closeFinancialTab = (status) => {
        this.setState({
            collapse: status
        })
    }

    handleModal = () => {
        if (this.props.match.params.level === "Easy" || this.props.match.params.level === "Moderate" || this.props.match.params.level === "Difficult") {
            redirectPage('/Instruction')
        } else {
            redirectPage('/')
        }
    }
    handleCancleSubmit = () => {
        this.setState({
            confirmCheck: false
        })
    }
    handleCancleInvalidSubmit = () => {
        this.setState({
            isSelectedPasscheck: false
        })
    }
    isSelectedPass = async () => {
        let checkMsg = []
        if (this.state.locationSelected === undefined) {
            checkMsg.push("Invalid store location please check")
        }
        if (this.state.sizeSelected === undefined) {
            checkMsg.push("Invalid store size please check")
        }
        if (this.state.ownershipSelected === undefined) {
            checkMsg.push("Invalid store ownership please check")
        }
        if (this.state.targetGroupSelected === undefined) {
            checkMsg.push("Invalid store ownership please check")
        }
        if (this.state.daySelected === undefined) {
            checkMsg.push("Invalid operation day of the store please check")
        }
        if (this.state.openTimeSelected === undefined || this.state.closeTimeSelected === undefined) {
            checkMsg.push("Invalid operation time of the store please check")
        }
        if (isAllProductPass(this.state.productSelected) !== true || this.state.productSelected.length === 0) {
            checkMsg.push("Invalid product for sell please check")
        }
        if (isAllMarketingPass(this.state.marketingSelected) !== true) {
            checkMsg.push("Invalid advertisment please check")
        }
        if (isAllFulltimeEmployeePass(this.state.employeeSelected) !== true && this.state.employeeSelected !== undefined) {
            checkMsg.push("Invalid hire fulltime employee please check")
        }
        if (isAllParttimeEmployeePass(this.state.parttimeEmployeeSelected) !== true && this.state.parttimeEmployeeSelected !== undefined) {
            checkMsg.push("Invalid hire parttime employee please check")
        }
        if (checkMsg.length > 0) {
            this.setState({
                isSelectedPasscheck: true,
                isSelectedPassMsg: checkMsg
            })
        } else {
            this.setState({
                confirmCheck: true,
                isSelectedPasscheck: false,
                isSelectedPassMsg: []
            })
        }
        return this.state.isSelectedPasscheck
    }
    handlePass = async () => {
        await this.setState({
            confirmCheck: false,
        })
        if (this.props.location.state) {
            if (this.props.location.state.userEmail) {
                if (this.state.userStore !== "") {
                    deleteUserStore(this.state.userStore.StoreID, 'StoreProductForSale')
                    deleteUserStore(this.state.userStore.StoreID, 'StoreMarketing')
                    deleteUserStore(this.state.userStore.StoreID, 'StoreHireEmployee')
                    deleteUserStore(this.state.userStore.StoreID, 'StoreDecoration')
                    deleteUserStore(this.state.userStore.StoreID, 'Store')
                }
                let checkTableUser = await insertUserStore(
                    this.state.classRoom.ClassroomName + '_' + this.props.location.state.userEmail,
                    this.state.daySelected,
                    this.state.totalTimeSelected,
                    this.state.classRoom.ClassID,
                    this.state.businessScenarioData.BLSORID,
                    JSON.parse(this.state.targetGroupSelected).BusinessTargetGroupID,
                    this.props.location.state.userEmail,
                    this.state.openTimeSelected,
                    this.state.closeTimeSelected,
                    this.state.employeeSelected === undefined ? 0 : this.state.employeeSelected.bonus,
                    this.state.employeeSelected === undefined ? 0 : this.state.employeeSelected.allowance
                )

                if (this.state.decorationSelected !== undefined && this.state.decorationSelected.length !== 0) {
                    await this.state.decorationSelected.map(async e => {
                        return await insertStoreDecoration(e.BusinessDecorationID, checkTableUser.data[0])
                    })
                }
                if (isAllProductPass(this.state.productSelected) === true) {
                    await this.state.productSelected.map(async e => {
                        return await insertStoreProductSelling(e.amount, e.sellingPrice, e.productDetail.BusinessProductSellerID, checkTableUser.data[0])
                    })
                }

                if (isAllMarketingPass(this.state.marketingSelected) === true) {
                    await this.state.marketingSelected.map(async e => {
                        return await insertStoreMarketing(e.marketingDetail.BusinessMarketingID, checkTableUser.data[0], e.frequency, e.viewer)
                    })
                }

                if (isAllFulltimeEmployeePass(this.state.employeeSelected) === true) {
                    await this.state.employeeSelected.employeeSelected.map(async e => {
                        return await insertStoreHireEmployee(0, 0, e.numberOfEmployee, checkTableUser.data[0], e.BusinessHireEmployeeID,e.exp,e.BaseSalaryPerMonth)
                    })
                }

                if (isAllParttimeEmployeePass(this.state.parttimeEmployeeSelected) === true) {
                    await this.state.parttimeEmployeeSelected.map(async e => {
                        return await insertStoreHireEmployee(e.workHourPerDay, e.workDayPerWeek, e.numberOfEmployee, checkTableUser.data[0], e.BusinessHireEmployeeID, e.exp)
                    })
                }
            }
        }
        window.sessionStorage.setItem("UserSelected", JSON.stringify(this.state))
        this.props.history.push({
            pathname: "/Report",
            state: this.props.location.state ? this.props.location.state.userEmail ? { userSelected: this.state, params: this.props.match.params.level, userEmail: this.props.location.state.userEmail } : { userSelected: this.state, params: this.props.match.params.level } : { userSelected: this.state, params: this.props.match.params.level }
        });
    }
    showParameterRequired = () => {
        const list = this.state.isSelectedPassMsg.map((e, index) => {
            return (
                <p key={index}>{e}</p>
            )
        })
        return <div>{list}<h3>You have {this.state.isSelectedPassMsg.length} conflict</h3></div>
    }

    selectedMoveto = (e, { name }) => {
        document.getElementById(name).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
        this.setState({
            activeMenu: name
        })
    }
    onStop = (e, data) => {
        let position = { x: data.x, y: data.y }
        let maxLeft = -1180
        let maxRight = 0
        let maxTop = 0
        let maxBottom = 450

        if ((data.y > 0 && data.y < maxBottom) && (data.x > maxLeft && data.x < maxRight)) {
            position.x = data.x
            position.y = data.y
        } else {
            if (data.y < maxTop) {
                position.y = maxTop
            }
            if (data.y > maxBottom) {
                position.y = maxBottom
            }
            if (data.x < maxLeft) {
                position.x = maxLeft
            }
            if (data.x > maxRight) {
                position.x = maxRight
            }
        }
        this.setState({
            position: position
        })
    }
    handleSizeChange = () => {
        this.setState({
            sizeChangeCheck: !this.state.sizeChangeCheck
        })
    }
    handleLoan = () => {
        let product = this.state.productSelected
        let decoration = this.state.decorationSelected
        let ownership = this.state.ownershipSelected
        let size = this.state.sizeSelected
        let location = this.state.locationSelected
        switch (this.state.loanCheckPoint) {
            case "Product": product[product.length - 1].amount = ""
                break;
            case "Decoration": decoration.splice(decoration.length - 1, 1)
                break;
            case "Ownership": ownership = undefined
                break;
            case "Size": {
                size = undefined
                ownership = undefined
            }
                break;
            case "Location": {
                size = undefined
                location = undefined
            }
                break;
        }
        this.setState({
            productSelected: product,
            decorationSelected: decoration,
            ownershipSelected: ownership,
            sizeSelected: size,
            locationSelected: location,
            acceptLoan: false
        })
    }

    joinRoomModal = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }
    setValue = ({ name, value }) => {
        this.setState({
            [name]: value,
            [name + 'Check']: false,
        })
    }
    enterRoom = async () => {
        if ((this.state.storeEmail === "" || this.state.storeEmail === undefined || this.state.storeEmail === null) || (this.state.roomKey === "" || this.state.roomKey === undefined || this.state.roomKey === null)) {
            if (this.state.storeEmail === "" || this.state.storeEmail === undefined || this.state.storeEmail === null) {
                this.setState({
                    storeEmailCheck: true,
                })
            }
            if (this.state.roomKey === "" || this.state.roomKey === undefined || this.state.roomKey === null) {
                this.setState({
                    roomKeyCheck: true,
                })
            }
        } else {
            this.props.history.push({
                pathname: `/Manage/${this.state.roomKey}`,
                state: { userEmail: this.state.storeEmail }
            });
            window.location.reload()
        }
    }
    render() {
        return (
            <div>
                <Dimmer page active={this.state.businessScenarioData === "" || this.state.businessScenarioData === undefined ? !this.state.check : this.state.check}>
                    <Loader indeterminate size={"massive"}>Please Wait</Loader>
                </Dimmer>
                <Navbar_scroll id="nav">
                    <Navbar_scroll_bg borderless inverted>
                        <Menu.Menu position='left'>
                            <Navbar_scroll_item name='Home' href='/' />
                            <Navbar_scroll_item name='Instruction' href='/Instruction' />
                            <Alert
                                size="tiny"
                                trigger={
                                    <Navbar_scroll_item name='Classroom' />
                                } closeIcon>
                                <Modal.Header>Join into classroom</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Classroom
                                            storeEmail={this.state.storeEmail}
                                            roomKey={this.state.roomKey}
                                            setValue={this.setValue}
                                            enterRoom={this.enterRoom}
                                            storeEmailCheck={this.state.storeEmailCheck}
                                            roomKeyCheck={this.state.roomKeyCheck}
                                        />
                                    </Modal.Description>
                                </Modal.Content>
                            </Alert>
                        </Menu.Menu>
                    </Navbar_scroll_bg>
                </Navbar_scroll>
                <NavbarContent history={this.props.history} />
                <Body_content>
                    <Fin_ratio_wrap raised>
                        {this.state.businessScenarioData !== undefined ?
                            <Draggable position={this.state.position} allowAnyClick={true} onStop={this.onStop}>
                                <Collapse isOpen={this.state.collapse}>
                                    <Summary
                                        func={this.closeFinancialTab}
                                        sizeSelected={this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined}
                                        decorationSelected={this.state.decorationSelected}
                                        ownershipSelected={this.state.ownershipSelected !== undefined ? JSON.parse(this.state.ownershipSelected) : undefined}
                                        productSelected={this.state.productSelected}
                                        productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                                        employeeSelected={this.state.employeeSelected}
                                        parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                                        totalTimeSelected={this.state.totalTimeSelected}
                                        daySelected={this.state.daySelected}
                                        businessScenarioData={this.state.businessScenarioData}
                                        locationSelected={this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined}
                                        marketingSelected={this.state.marketingSelected}
                                        targetGroupSelected={this.state.targetGroupSelected !== undefined ? JSON.parse(this.state.targetGroupSelected) : undefined}
                                        competitorSelected={this.state.competitorSelected}
                                        marketShared={this.state === undefined ? 0 : calculateMarketShare(
                                            this.state.competitorSelected,
                                            this.state.decorationSelected,
                                            this.state.decorationData,
                                            this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                                            this.state.daySelected,
                                            this.state.totalTimeSelected,
                                            this.state.employeeSelected,
                                            this.state.parttimeEmployeeSelected,
                                            this.state.productSelected,
                                            this.state.marketingSelected,
                                            this.state.marketingData,
                                            this.state.businessScenarioData,
                                            this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                                            this.state.productChoice,
                                            this.state.productData)}
                                    />
                                </Collapse></Draggable>
                            : ""}
                    </Fin_ratio_wrap>
                    <Content_wrap >
                        <Grid_bg container centered columns={2}>
                            <Grid.Column>
                                <Header as='h2'>
                                    <Icon name="list alternate" />
                                    <Header.Content>
                                        {this.state.businessScenarioData !== undefined && this.state.classRoom !== undefined ?
                                            this.state.businessScenarioData.BusinessName + ' @ ' + this.state.classRoom.ClassroomName :
                                            this.state.businessScenarioData !== undefined ? this.state.businessScenarioData.BusinessName :
                                                "Business Factor"}
                                        <Header.Subheader>
                                            Define business factors for managing your business
                                                </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Content_shadow id="StoreSetup">
                                    <SetupStore
                                        businessScenarioData={this.state.businessScenarioData}

                                        sizeChoices={this.state.sizeData}
                                        locationChoices={this.state.locationData}
                                        ownershipChoices={this.state.ownershipData}

                                        locationSelected={this.state.locationSelected}
                                        ownershipSelected={this.state.ownershipSelected}
                                        sizeSelected={this.state.sizeSelected}

                                        handleChangeLocation={this.handleChangeLocation}
                                        handleChangeOwnership={this.handleChangeOwnership}
                                        handleChangeSize={this.handleChangeSize}
                                    />
                                </Content_shadow>
                                <br />
                                <Content_shadow id="TargetGroup">

                                    <TargetGroup
                                        businessScenarioData={this.state.businessScenarioData}
                                        targetGroupChoices={this.state.targetGroupData}

                                        targetGroupSelected={this.state.targetGroupSelected}

                                        handleChangeTargetGroup={this.handleChangeTargetGroup} />
                                </Content_shadow>
                                <br />
                                <Content_shadow id="Decoration">
                                    <Decoration
                                        businessScenarioData={this.state.businessScenarioData}
                                        decorationChoices={this.state.decorationData}

                                        decorationSelected={this.state.decorationSelected}

                                        handleChangeDecoration={this.handleChangeDecoration}
                                    />
                                </Content_shadow>
                                <br />
                                <Content_shadow id="OperatingTime">

                                    <StoreOperatingTime
                                        businessScenarioData={this.state.businessScenarioData}
                                        dayChoices={getNumberOptions(1, 7)}
                                        openTimeChoices={this.state.openTimeData}
                                        closeTimeChoices={this.state.closeTimeData}

                                        daySelected={this.state.daySelected}
                                        openTimeSelected={this.state.openTimeSelected}
                                        closeTimeSelected={this.state.closeTimeSelected}
                                        totalTimeSelected={this.state.totalTimeSelected}

                                        handleChangeDay={this.handleChangeDay}
                                        handleChangeTimeOpen={this.handleChangeTimeOpen}
                                        handleChangeTimeClose={this.handleChangeTimeClose}
                                        handleChange24Hr={this.handleChange24Hr}
                                    />
                                </Content_shadow>
                                <br />
                                <Content_shadow id="HumanResource">
                                    <HumanResource
                                        businessScenarioData={this.state.businessScenarioData}
                                        fullTimeJobChoice={this.state.fullTimeData}
                                        partTimeJobChoice={this.state.partTimeData}
                                        expChoice={getNumberOptions(0, 10)}
                                        hourOptions={getNumberOptions(1, 10)}
                                        dayChoices={getNumberOptions(1, 7)}
                                        numberChoice={getNumberOptions(1, 20)}
                                        bonusChoice={getNumberOptions(0, 24)}
                                        allowlanceChoice={getNumberOptions(0, 30)}

                                        employeeSelected={this.state.employeeSelected}
                                        parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}

                                        handleChangeEmployee={this.handleChangeEmployee}
                                        handleChangeEmployeeExp={this.handleChangeEmployeeExp}
                                        handleChangeNumberOfEmployee={this.handleChangeNumberOfEmployee}
                                        handleChangeEmployeeBonus={this.handleChangeEmployeeBonus}
                                        handleChangeEmployeeAllowance={this.handleChangeEmployeeAllowance}
                                        handleChangeBaseSalaryOfOwner={this.handleChangeBaseSalaryOfOwner}

                                        handleChangePartEmployee={this.handleChangePartEmployee}
                                        handleChangeNumberOfParttimeEmployee={this.handleChangeNumberOfParttimeEmployee}
                                        handleWorkHourParttime={this.handleWorkHourParttime}
                                        handleWorkDayParttime={this.handleWorkDayParttime}
                                        handleChangePartEmployeeExp={this.handleChangePartEmployeeExp}
                                    />
                                </Content_shadow>
                                <br />
                                <Content_shadow id="Merchandise">
                                    <Product
                                        businessScenarioData={this.state.businessScenarioData}
                                        productChoice={this.state.productChoice}
                                        productOption={this.state.productData}

                                        productSelected={this.state.productSelected}
                                        sizeSelected={this.state.sizeSelected}

                                        handleChangeProduct={this.handleChangeProduct}
                                        handleChangeProductAmount={this.handleChangeProductAmount}
                                        handleChangeProductSellingPrice={this.handleChangeProductSellingPrice}
                                        handleAdaptionOfProductStorage={this.handleAdaptionOfProductStorage}
                                        adapOnBlur={this.adapOnBlur}
                                    />
                                </Content_shadow>
                                <br />
                                <Content_shadow id="Promotion">
                                    <Marketing
                                        businessScenarioData={this.state.businessScenarioData}
                                        marketingChoice={this.state.marketingData}

                                        marketingSelected={this.state.marketingSelected}

                                        handleChangeMarketing={this.handleChangeMarketing}
                                        handleChangeMarketingFrequency={this.handleChangeMarketingFrequency}
                                        handleChangeMarketingViewer={this.handleChangeMarketingViewer}
                                    />
                                </Content_shadow>
                                <Confirm_wrap>
                                    <Grid container columns={2}>
                                        <Grid.Column>
                                            <Header as='h3' icon textAlign='center'>
                                                <Icon
                                                    link
                                                    inverted
                                                    name='undo'
                                                    color='red'
                                                    circular
                                                    onClick={this.clear}
                                                />
                                                <Header.Content>Clear</Header.Content>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as='h3' icon textAlign='center'>
                                                <Icon
                                                    link
                                                    inverted
                                                    name='check'
                                                    color='green'
                                                    circular
                                                    onClick={this.isSelectedPass}
                                                />
                                                <Header.Content>Submit</Header.Content>
                                            </Header>
                                        </Grid.Column>
                                    </Grid>
                                </Confirm_wrap>
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <Header as='h2'>
                                    <Popup
                                        trigger={<Icon name='info circle' />}
                                        content={this.state.businessScenarioData !== undefined ? this.state.businessScenarioData.BusinessScenarioDescription : ""}
                                        inverted
                                        wide='very'
                                    />
                                    <Header.Content>
                                        Information
                                        <Header.Subheader>
                                            Results after definition factors
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Sticky_info topOffset={-50}>
                                    <Scrollbars autoHeight autoHeightMin={30 + 'vh'} autoHeightMax={55 + 'vh'} autoHide>
                                        <MacroEnvironment
                                            competitorSelected={this.state.competitorSelected}
                                            sizeSelected={this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined}
                                            ownershipSelected={this.state.ownershipSelected !== undefined ? JSON.parse(this.state.ownershipSelected) : undefined}
                                            locationSelected={this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined}
                                            decorationSelected={this.state.decorationSelected}
                                            productSelected={this.state.productSelected}
                                            productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                                            employeeSelected={this.state.employeeSelected}
                                            parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                                            totalTimeSelected={this.state.totalTimeSelected}
                                            daySelected={this.state.daySelected}
                                            businessScenarioData={this.state.businessScenarioData}
                                            marketingSelected={this.state.marketingSelected}
                                            marketShared={this.state === undefined ? 0 : calculateMarketShare(
                                                this.state.competitorSelected,
                                                this.state.decorationSelected,
                                                this.state.decorationData,
                                                this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                                                this.state.daySelected,
                                                this.state.totalTimeSelected,
                                                this.state.employeeSelected,
                                                this.state.parttimeEmployeeSelected,
                                                this.state.productSelected,
                                                this.state.marketingSelected,
                                                this.state.marketingData,
                                                this.state.businessScenarioData,
                                                this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                                                this.state.productChoice,
                                                this.state.productData)}
                                            targetGroupSelected={this.state.targetGroupSelected !== undefined ? JSON.parse(this.state.targetGroupSelected) : undefined}
                                        />
                                        <Overview
                                            businessScenarioData={this.state.businessScenarioData}

                                            targetGroupSelected={this.state.targetGroupSelected !== undefined ? JSON.parse(this.state.targetGroupSelected) : undefined}
                                            daySelected={this.state.daySelected}
                                            totalTimeSelected={this.state.totalTimeSelected}
                                            productSelected={this.state.productSelected}
                                            sizeSelected={this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined}
                                            decorationSelected={this.state.decorationSelected}
                                            ownershipSelected={this.state.ownershipSelected !== undefined ? JSON.parse(this.state.ownershipSelected) : undefined}
                                            locationSelected={this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined}
                                            employeeSelected={this.state.employeeSelected}
                                            parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                                            marketingSelected={this.state.marketingSelected}

                                            productChoice={this.state.productChoice}
                                            decorationChoices={this.state.decorationData}
                                        />
                                        <ProductReport
                                            businessScenarioData={this.state.businessScenarioData}
                                            productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                                            competitorSelected={this.state.competitorSelected}
                                            targetGroupSelected={this.state.targetGroupSelected !== undefined ? JSON.parse(this.state.targetGroupSelected) : undefined}
                                            daySelected={this.state.daySelected}
                                            totalTimeSelected={this.state.totalTimeSelected}
                                            productSelected={isAllProductPass(this.state.productSelected) === true ? this.state.productSelected : undefined}
                                            sizeSelected={this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined}
                                            decorationSelected={this.state.decorationSelected}
                                            ownershipSelected={this.state.ownershipSelected !== undefined ? JSON.parse(this.state.ownershipSelected) : undefined}
                                            locationSelected={this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined}
                                            employeeSelected={this.state.employeeSelected}
                                            parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                                            marketingSelected={this.state.marketingSelected}
                                            marketShared={this.state === undefined ? 0 : calculateMarketShare(
                                                this.state.competitorSelected,
                                                this.state.decorationSelected,
                                                this.state.decorationData,
                                                this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                                                this.state.daySelected,
                                                this.state.totalTimeSelected,
                                                this.state.employeeSelected,
                                                this.state.parttimeEmployeeSelected,
                                                this.state.productSelected,
                                                this.state.marketingSelected,
                                                this.state.marketingData,
                                                this.state.businessScenarioData,
                                                this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                                                this.state.productChoice,
                                                this.state.productData)}
                                        />
                                        <Cost
                                            sizeSelected={this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined}
                                            decorationSelected={this.state.decorationSelected}
                                            ownershipSelected={this.state.ownershipSelected !== undefined ? JSON.parse(this.state.ownershipSelected) : undefined}
                                            productSelected={this.state.productSelected}
                                            productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                                            employeeSelected={this.state.employeeSelected}
                                            parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                                            totalTimeSelected={this.state.totalTimeSelected}
                                            daySelected={this.state.daySelected}
                                            businessScenarioData={this.state.businessScenarioData}
                                            locationSelected={this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined}
                                            marketingSelected={this.state.marketingSelected}
                                            targetGroupSelected={this.state.targetGroupSelected !== undefined ? JSON.parse(this.state.targetGroupSelected) : undefined}
                                            competitorSelected={this.state.competitorSelected}
                                            marketShared={this.state === undefined ? 0 : calculateMarketShare(
                                                this.state.competitorSelected,
                                                this.state.decorationSelected,
                                                this.state.decorationData,
                                                this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                                                this.state.daySelected,
                                                this.state.totalTimeSelected,
                                                this.state.employeeSelected,
                                                this.state.parttimeEmployeeSelected,
                                                this.state.productSelected,
                                                this.state.marketingSelected,
                                                this.state.marketingData,
                                                this.state.businessScenarioData,
                                                this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                                                this.state.productChoice,
                                                this.state.productData)}
                                        />
                                    </Scrollbars>
                                </Sticky_info>
                            </Grid.Column>
                            <Grid.Row >
                                <Grid.Column>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid_bg>
                    </Content_wrap>
                </Body_content>
                <Alert
                    open={this.state.confirmCheck}
                    basic
                    size='small'
                    dimmer='blurring'
                    header= {countMainFulltimeEmployeePass(this.state.employeeSelected) === 0 && countMainParttimeEmployeePass(this.state.parttimeEmployeeSelected) === 0 ? 'Are you sure to continue without main employee in your store ?' : 'Are you sure to see the result of your decision ?'}
                    content={
                        countMainFulltimeEmployeePass(this.state.employeeSelected) === 0 && countMainParttimeEmployeePass(this.state.parttimeEmployeeSelected) === 0 ?
                            <Header color='yellow' as='h6'>( {this.state.economic !== undefined ? Math.round(((this.state.economic.reduce((a, b) => a + b, 0) / this.state.economic.length) * 100)) / 100 : " "} )  Economic events that affect the demand of product today. </Header> :
                            <Header color='yellow' as='h6'>( {this.state.economic !== undefined ? Math.round(((this.state.economic.reduce((a, b) => a + b, 0) / this.state.economic.length) * 100)) / 100 : " "} )  Economic events that affect the demand of product today. </Header>
                    }
                    actions={[
                        <Modal.Actions key={"action"}>
                            <Button color='red' onClick={this.handleCancleSubmit}>
                                <Icon name='remove' /> No, I need to try again.
                        </Button>
                            <Button color='green' onClick={this.handlePass}>
                                <Icon name='checkmark' /> Sure, Move on
                            </Button>

                        </Modal.Actions>
                    ]}
                />
                <Alert
                    open={this.state.acceptLoan}
                    basic
                    size='small'
                    dimmer='blurring'
                    header='Need more money'
                    content={
                        <p>Now your debt is {(calculateTotalDept(this.state.decorationSelected, this.state.productSelected, this.state.businessScenarioData) * (-1)).toLocaleString('EN')}<br />
                            {this.state.businessScenarioData === undefined ? "" : 'Do you want accept this loan with ' + this.state.businessScenarioData.BusinessLoanInterestRate + ' % interest rate.'}<br /><br /><br /><br />
                            <Checkbox checked={this.state.preAcceptLoanStatus} onChange={() => this.setState({ preAcceptLoanStatus: !this.state.preAcceptLoanStatus })} /> Always accept the loan automatically
                        </p>
                    }
                    actions={[
                        <Modal.Actions key={"action"}>
                            <Button color='red' onClick={this.handleLoan}>
                                <Icon name='remove' /> No, I need to try again.
                        </Button>
                            <Button color='green' onClick={() => this.setState({ acceptLoanStatus: this.state.preAcceptLoanStatus, acceptLoan: false })}>
                                <Icon name='checkmark' /> Sure, Move on
                            </Button>

                        </Modal.Actions>
                    ]}
                />
                <Alert
                    open={this.state.isSelectedPasscheck}
                    basic
                    size='small'
                    dimmer='blurring'
                    header={<Header icon='remove circle' content='Parameter Required' />}
                    content={this.showParameterRequired()}
                    actions={[
                        <Modal.Actions key={"action"}>
                            <Button color='red' onClick={this.handleCancleInvalidSubmit}>
                                <Icon name='remove' />
                                Got it, I'll try again.
                            </Button>
                        </Modal.Actions>
                    ]}
                />
                <Alert
                    open={this.state.check}
                    basic
                    size='small'
                    dimmer='blurring'
                    header='Invalid Key'
                    content='This room key is not found in system, Please try again.'
                    actions={[
                        <Button key={"Key"} color='green' onClick={this.handleModal} inverted>
                            <Icon name='checkmark' /> Got it
                        </Button>
                    ]}
                />
                <Alert
                    open={this.state.sizeChangeCheck}
                    basic
                    size='small'
                    dimmer='blurring'
                    header='Storage overload'
                    content='Storage are overload now, Please check product re-amount on your store.'
                    actions={[
                        <Button key={"overload"} color='red' onClick={this.handleSizeChange} inverted>
                            <Icon name='checkmark' /> Got it
                        </Button>
                    ]}
                />
                <Footer_scroll id='footer'>
                    <Footer_scroll_bg borderless tabular inverted>
                        <Menu.Menu position='left'>
                            <Navbar_scroll_item
                                name='StoreSetup'
                                color='red'
                                active={this.state.activeMenu === 'StoreSetup'}
                                onClick={this.selectedMoveto}
                            >
                                Store Setup
                            </Navbar_scroll_item>
                            <Navbar_scroll_item
                                name='TargetGroup'
                                color='pink'
                                active={this.state.activeMenu === 'TargetGroup'}
                                onClick={this.selectedMoveto}
                            >
                                Target Group
                            </Navbar_scroll_item>
                            <Navbar_scroll_item
                                name='Decoration'
                                color='purple'
                                active={this.state.activeMenu === 'Decoration'}
                                onClick={this.selectedMoveto}
                            >
                                Decoration
                            </Navbar_scroll_item>
                            <Navbar_scroll_item
                                name='OperatingTime'
                                color='orange'
                                active={this.state.activeMenu === 'OperatingTime'}
                                onClick={this.selectedMoveto}
                            >
                                Operating Time
                            </Navbar_scroll_item>
                            <Navbar_scroll_item
                                name='HumanResource'
                                color='yellow'
                                active={this.state.activeMenu === 'HumanResource'}
                                onClick={this.selectedMoveto}
                            >
                                Human Resource
                            </Navbar_scroll_item>
                            <Navbar_scroll_item
                                name='Merchandise'
                                color='brown'
                                active={this.state.activeMenu === 'Merchandise'}
                                onClick={this.selectedMoveto}
                            >
                                Merchandise
                            </Navbar_scroll_item>
                            <Navbar_scroll_item
                                name='Promotion'
                                color='violet'
                                active={this.state.activeMenu === 'Promotion'}
                                onClick={this.selectedMoveto}
                            >
                                Promotion
                            </Navbar_scroll_item>
                        </Menu.Menu>
                        <Menu.Menu position='right'>
                            <Navbar_scroll_item name='report' onClick={this.toggle}>
                                <Icon name='chart pie' />
                                &nbsp;&nbsp;&nbsp;Financial Ratio Report
                            </Navbar_scroll_item>
                        </Menu.Menu>
                    </Footer_scroll_bg>
                </Footer_scroll>
            </div >
        )
    }
}