import React from 'react';
import ClassroomManagement from '../components/ManageClassroom/ManageClassroom';
import { getAllBusiness, getEnterCode, getSeClassroom, getSelectSeStoreClassID, getSelectSeStoreStoreID, getBusinessScenario, getCompetitor, getSizeChoice, getLocationChoice, getOwnershipChoice, getTargetGroupChoice, getProductChoice, getMarketing, getProductDetail, getStoreOperationUserSelected, getStoreDecorationSelected, getStoreMarketingSelected, getStoreHumanResourceSelected, getStoreProductSelected, getEmployee, getDecorationChoice, getBusinessSizeLocationOwnership, getProductAccept } from '../Provider/GetData/GetData'
import { insertClassroom } from '../Provider/InsertData/InsertData';
import { UserProvider, UserSelectedProvider } from '../Provider/UserProvider/UserProvider'
import swal from 'sweetalert2'
import { deleteClassroom } from '../Provider/DeleteData/DeleteData';
import styled from 'styled-components';
import bgadmin from '../Static/img/bgadmin.svg';
import { splitArrayToArray } from '../Provider/CreateProvider/CreateProvider';
import { getTimeChoices } from '../Provider/StoreProvider/StoreProvider';
const Bg_wrap = styled.div`
    background:url(${bgadmin}) no-repeat;
    background-size:cover;
    height:101vh;
`

export default class AdminClassRoomManagement extends React.Component {
    state = {
        scenario: [],
        EnterCode: [],
        classroom: [],
        CodeInput: '',
        NameInput: '',
        selectedScenario: undefined,
        userSelected: undefined,
        students: []
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
    componentDidMount = async () => {
        let dataBus = await getAllBusiness()
        let dataCode = await getEnterCode()
        let dataClassroom = await getSeClassroom()
        dataClassroom = splitArrayToArray(dataClassroom.reverse(), 6)
        dataBus = splitArrayToArray(dataBus.reverse(), 6)
        this.setState({
            classroom: dataClassroom,
            scenario: dataBus,
            EnterCode: dataCode,
            CodeInput: '',
            NameInput: '',
            selectedScenario: undefined
        })
    }
    logOut = () => {
        UserProvider.setUserOnLog(undefined)
        this.props.history.replace({
            pathname: "/",
            state: undefined
        })
    }
    handleChange = async ({ name, value }) => {
        await this.setState({
            [name]: value,
        })
    }
    handleSubmit = async () => {
        if ((!this.state.CodeInput || !this.state.selectedScenario || !this.state.NameInput)) {
            if (this.state.CodeInput || this.state.selectedScenario || this.state.NameInput) {
                if (!this.state.NameInput) {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'center-start',
                        html: 'Classroom name is required',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    toast({
                        type: 'warning',
                        title: 'Something wrong!',
                    })
                }
                if (!this.state.CodeInput) {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'center-start',
                        html: 'Classroom key is required',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    toast({
                        type: 'warning',
                        title: 'Something wrong!',
                    })
                }
                if (!this.state.selectedScenario) {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'center-start',
                        html: 'Please select scenario',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    toast({
                        type: 'info',
                        title: 'Something wrong!',
                    })
                }
            } else {
                const toast = swal.mixin({
                    toast: true,
                    position: 'center-start',
                    html: 'Information are required',
                    showConfirmButton: false,
                    timer: 3000,
                })
                toast({
                    type: 'error',
                    title: 'Something wrong!',
                })
            }
        } else {
            let allCode = this.state.EnterCode
            let checkKey = allCode.find((e) => {
                return e.EnterCode === this.state.CodeInput
            })
            if (checkKey === undefined && this.state.selectedScenario && this.state.NameInput) {
                let today = new Date()
                let dd = today.getDate()
                let mm = today.getMonth() + 1
                let yyyy = today.getFullYear()
                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                today = yyyy + '-' + mm + '-' + dd;
                await insertClassroom(today, this.state.NameInput, this.state.CodeInput, this.state.selectedScenario.BusinessID).then(() => {
                    this.componentDidMount()
                    const toast = swal.mixin({
                        toast: true,
                        position: 'center-start',
                        html: 'Classroom create successfully',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    toast({
                        type: 'success',
                        title: 'Successfully',
                    })
                })
            } else {
                const toast = swal.mixin({
                    toast: true,
                    position: 'center-start',
                    html: 'Key is already used',
                    showConfirmButton: false,
                    timer: 3000,
                })
                toast({
                    type: 'error',
                    title: 'Duplicate key!',
                })
            }
        }
    }
    handleLocation = (path) => {
        this.props.history.push({
            pathname: `/${path}`,
            state: UserProvider.getUserOnLog()
        })
    }
    handleSelected = async (name, value) => {
        if (value && value.ClassID) {
        }
        await this.setState({
            [name]: value
        })
    }
    handleModal = async (value) => {
        let students = []
        students = splitArrayToArray(await getSelectSeStoreClassID(value.ClassID), 6)
        this.setState({
            students: students
        })
    }
    handleStudentReport = async (value) => {
        const dataBis = await getBusinessScenario(value.BusinessID)
        const dataComp = await getCompetitor(value.BusinessID)
        const dataSize = await getSizeChoice(value.BusinessID)
        const dataLo = await getLocationChoice(value.BusinessID)
        const dataOwn = await getOwnershipChoice(value.BusinessID)
        const dataTarget = await getTargetGroupChoice(value.BusinessID)
        const dataPro = await getProductChoice(value.BusinessID)
        const dataMarketing = await getMarketing(value.BusinessID)
        const dataFullTime = await getEmployee(value.BusinessID, 1)
        const dataPartTime = await getEmployee(value.BusinessID, 0)
        const productChoice = dataPro.data.map((e) => {
            return getProductDetail({ BusinessID: value.BusinessID, ProductID: e.ProductID })
        })
        let related, classRoom, userData, targetGroup, location, size, owner, openTime, closeTime, hour, day, decoration, dataDec, relatedSelected, human, partHuman, fullHuman, product, accept, market = []
        userData = await getSelectSeStoreStoreID(value.StoreID)
        related = await getStoreOperationUserSelected(value.StoreID, value.BusinessLocationSizeOwnerRelevantID)
        decoration = await getStoreDecorationSelected(value.StoreID)
        market = await getStoreMarketingSelected(value.StoreID)
        human = await getStoreHumanResourceSelected(value.StoreID)
        product = await getStoreProductSelected(value.StoreID)
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
        dataDec = await getDecorationChoice({ BusinessID: value.BusinessID, LocationID: location.LocationID, SizeID: size.SizeID })
        relatedSelected = await getBusinessSizeLocationOwnership(value.BusinessID, size.SizeID, location.LocationID, owner.OwnershipID)
        accept = await getProductAccept(value.BusinessID, targetGroup.TargetGroupID)

        accept = accept.data
        relatedSelected = relatedSelected.data
        dataDec = dataDec.data
        hour = related.StoreOperatingHour
        day = related.StoreOperatingDay
        closeTime = related.StoreCloseTime
        openTime = related.StoreOpenTime
        await Promise.all(productChoice).then((choices) => {
            const options = choices.map((e) => {
                const choice = e.data.map(tmp => {
                    let obj = { key: tmp.ProductQualityID, value: JSON.stringify(tmp), text: tmp.QualityName }
                    return obj
                })
                return choice
            })
            let economic = []
            for (let i = 0; i <= dataBis.data.BusinessPlayingYear; i++) {
                economic.push(Math.floor(Math.random() * 3) - 1)
            }
            UserSelectedProvider.setUserSelected({
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
                economic: economic,
                userStore: userData,
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
                businessScenarioData: { ...dataBis.data, ...relatedSelected },
                confirmCheck:false,
                fromAdmin:true
            })
            window.open(window.location.origin + "/Report", '_blank', 'toolbar=0,location=0,menubar=0');
        })
    }
    handleClassroomDelete = (value) => {
        swal({
            title: 'Are you sure?',
            html: "Your student history will be lost <br> & <br> You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value) {
                await deleteClassroom(value.ClassID).then(() => {
                    swal(
                        'Deleted!',
                        'Your class has been deleted.',
                        'success'
                    )
                    this.componentDidMount()
                })
            }
        })
    }
    render() {
        if (UserProvider.getUserOnLog()) {
            return (
                <ClassroomManagement
                    classroom={this.state.classroom}
                    scenario={this.state.scenario}
                    EnterCode={this.state.EnterCode}

                    CodeInput={this.state.CodeInput}
                    NameInput={this.state.NameInput}
                    selectedScenario={this.state.selectedScenario}

                    handleClassroomDelete={this.handleClassroomDelete}
                    handleSelected={this.handleSelected}
                    handleLocation={this.handleLocation}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}

                    handleModal={this.handleModal}
                    students={this.state.students}
                    handleStudentReport={this.handleStudentReport}
                />
            )
        } else {
            return (<Bg_wrap fluid></Bg_wrap>)
        }
    }
}