import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import {
    Table,
    Label
} from 'semantic-ui-react';
import {
    calculateProductSelling,
    turnArray,
    calculateGrossProfit,
    calculateTotalRevenue,
    calculateTotalCostOfGoodSold,
    calculateRental,
    calculateFulltimeWage,
    calculateParttimeWage,
    calculateAllOfFulltimeWage,
    calculateAllOfParttimeWage,
    calculateTotalWage,
    calculateUtility,
    calculateOperatingLicense,
    calculateAccounttingFee,
    calculateAllMaintainance,
    calculateAllLandTax,
    calculateAllofMarketing,
    calculateLossProduct,
    calculateAllStorageCost,
    calculateAllOtherCost,
    calculateSellingAdminiStration,
    calculateAllExpense,
    calculateEbitda,
    calculateAllDepreciation,
    calculateAllAmortisation,
    calculateEbit,
    calculateInterest,
    calculateNewEbit,
    calculateTax,
    calculateNetProfit
} from '../../Provider/ProductSellingReportProvider/ProductSellingReportProvider'

export default class ProfitNLoss extends React.Component {

    state = {
        collapseTotalRev: false
    }
    showYearHeader = () => {
        let showYearHeader = []
        for (let i = 0; i <= this.props.businessScenarioData.BusinessPlayingYear; i++) {
            showYearHeader.push(
                <Table.HeaderCell key={i}>
                    <Label>
                        YEAR {i}
                    </Label>
                </Table.HeaderCell>
            )
        }
        return showYearHeader
    }
    showTotalRevenue = () => {
        let revenue = []
        let productRevenue =
            calculateTotalRevenue(
                this.props.productSelected,
                this.props.productTypeAcceptSelected,
                this.props.employeeSelected,
                this.props.parttimeEmployeeSelected,
                this.props.totalTimeSelected,
                this.props.daySelected,
                this.props.businessScenarioData,
                this.props.locationSelected,
                this.props.marketShared,
                this.props.businessScenarioData.BusinessPlayingYear,
                this.props.targetGroupSelected
            )
        revenue = productRevenue.map((e, i) => {
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return revenue
    }
    showProductRevenue = () => {
        let viewRevenue = []
        let productRevenue = turnArray(
            calculateProductSelling(
                this.props.productSelected,
                this.props.productTypeAcceptSelected,
                this.props.employeeSelected,
                this.props.parttimeEmployeeSelected,
                this.props.totalTimeSelected,
                this.props.daySelected,
                this.props.businessScenarioData,
                this.props.locationSelected,
                this.props.marketShared,
                this.props.businessScenarioData.BusinessPlayingYear,
                this.props.targetGroupSelected
            ))
        viewRevenue = productRevenue.map((e, i) => {
            return (
                <Table.Row key={"tr" + i}>
                    <Table.Cell style={{ paddingLeft: '3em' }}>
                        {e[i].productDetail.ProductName}
                    </Table.Cell>
                    {e.map((element, index) => { return (<Table.Cell key={"Col" + index}>{element.revenue.toLocaleString('EN')}</Table.Cell>) })}
                </Table.Row>
            )
        })
        return viewRevenue
    }
    showTotalCostOfGoodSold = () => {
        let cost = []
        let productCost =
            calculateTotalCostOfGoodSold(
                this.props.productSelected,
                this.props.productTypeAcceptSelected,
                this.props.employeeSelected,
                this.props.parttimeEmployeeSelected,
                this.props.totalTimeSelected,
                this.props.daySelected,
                this.props.businessScenarioData,
                this.props.locationSelected,
                this.props.marketShared,
                this.props.businessScenarioData.BusinessPlayingYear,
                this.props.targetGroupSelected
            )
        cost = productCost.map((e, i) => {
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return cost
    }
    showCostOfGoodSold = () => {
        let viewCostOfGoodSold = []
        let productCostGoodSold = turnArray(
            calculateProductSelling(
                this.props.productSelected,
                this.props.productTypeAcceptSelected,
                this.props.employeeSelected,
                this.props.parttimeEmployeeSelected,
                this.props.totalTimeSelected,
                this.props.daySelected,
                this.props.businessScenarioData,
                this.props.locationSelected,
                this.props.marketShared,
                this.props.businessScenarioData.BusinessPlayingYear,
                this.props.targetGroupSelected
            ))
        viewCostOfGoodSold = productCostGoodSold.map((e, i) => {
            return (
                <Table.Row key={"tr" + i}>
                    <Table.Cell style={{paddingLeft:'3em'}}>
                        {e[i].productDetail.ProductName}
                    </Table.Cell>
                    {e.map((element, index) => { return (<Table.Cell key={"Col" + index}>{element.costOfGoodSold.toLocaleString('EN')}</Table.Cell>) })}
                </Table.Row>
            )
        })
        return viewCostOfGoodSold
    }
    showGrossProfit = () => {
        let showGrossProfit = []
        let grossProfit = calculateGrossProfit(this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected)

        showGrossProfit = grossProfit.map((element, index) => {
            return <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={index}>{element.toLocaleString('EN')}</Table.HeaderCell> 
        })
        return showGrossProfit
    }
    showRental = () => {
        let showRental = []
        let show = []
        showRental = calculateRental(this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)
        show = showRental.map((e, i) => {
            return (
                <Table.Cell key={i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return show
    }
    showWageEachJob = () => {
        let wagePerJob = []
        let showWage = []
        if (this.props.employeeSelected !== undefined) {
            if (this.props.employeeSelected.employeeSelected != undefined) {
                showWage = this.props.employeeSelected.employeeSelected.map((e, index) => {
                    wagePerJob = calculateFulltimeWage(e, this.props.employeeSelected.bonus, this.props.employeeSelected.allowance, this.props.businessScenarioData.BusinessPlayingYear)
                    return (
                        <Table.Row key={index}>
                            <Table.Cell style={{ paddingLeft: '5em' }}>
                                {e.Job}
                            </Table.Cell>
                            {wagePerJob.map((element, i) => {
                                return (
                                    <Table.Cell key={i}>{element.currentSalary.toLocaleString('EN')}</Table.Cell>

                                )
                            })
                            }
                        </Table.Row>
                    )
                })
            }
        }
        return showWage
    }
    showPartPayEachJob = () => {
        let wagePerJob = []
        let showWage = []
        if (this.props.parttimeEmployeeSelected !== undefined) {
            showWage = this.props.parttimeEmployeeSelected.map((e, index) => {
                wagePerJob = calculateParttimeWage(e, this.props.businessScenarioData.BusinessPlayingYear)
                return (
                    <Table.Row key={index}>
                        <Table.Cell style={{ paddingLeft: '5em' }}>{e.Job}</Table.Cell>
                        {wagePerJob.map((element, i) => {
                            return (
                                <Table.Cell key={i}>{element.currentSalary.toLocaleString('EN')}</Table.Cell>
                            )
                        })
                        }
                    </Table.Row>
                )
            })
        }
        return showWage
    }
    showAllFullTime = () => {
        let showResult = []
        let result = calculateAllOfFulltimeWage(this.props.employeeSelected, this.props.businessScenarioData.BusinessPlayingYear)
        showResult = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showResult
    }
    showAllPartTime = () => {
        let showResult = []
        let result = calculateAllOfParttimeWage(this.props.parttimeEmployeeSelected, this.props.businessScenarioData.BusinessPlayingYear)
        showResult = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showResult
    }
    showWage = () => {
        let showResult = []
        if (this.props.employeeSelected !== undefined || this.props.parttimeEmployeeSelected !== undefined) {
            let resultAll = calculateTotalWage(this.props.employeeSelected, this.props.parttimeEmployeeSelected, this.props.businessScenarioData.BusinessPlayingYear)
            showResult = resultAll.map((e, index) => {
                return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
            })
        }
        return showResult
    }
    showUtility = () => {
        let showutility = []
        let result = calculateUtility(this.props.decorationSelected, this.props.ownershipSelected, this.props.totalTimeSelected, this.props.sizeSelected, this.props.businessScenarioData.BusinessPlayingYear)
        showutility = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showutility
    }
    showOperatingLicense = () => {
        let showOperatingLicense = []
        let result = calculateOperatingLicense(this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)
        showOperatingLicense = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showOperatingLicense
    }
    showAccFee = () => {
        let showAccFee = []
        let result = calculateAccounttingFee(this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)
        showAccFee = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showAccFee
    }
    showMaintain = () => {
        let showMaintain = []
        let result = calculateAllMaintainance(this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.ownershipSelected
        )
        showMaintain = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showMaintain
    }
    showLandTax = () => {
        let showLandTax = []
        let result = calculateAllLandTax(this.props.ownershipSelected, this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)
        showLandTax = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showLandTax
    }
    showMarketing = () => {
        let showLandTax = []
        let result = calculateAllofMarketing(this.props.marketingSelected, this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)
        showLandTax = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showLandTax
    }
    showLoss = () => {
        let showLoss = []
        let result = calculateLossProduct(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected
        )
        showLoss = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showLoss
    }
    showStorageCost = () => {
        let showStorage = []
        let result = calculateAllStorageCost(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected
        )
        showStorage = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showStorage
    }
    showOtherCost = () => {
        let showOtherCost = []
        let result = calculateAllOtherCost(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected
        )
        showOtherCost = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showOtherCost
    }
    showSellingNAdministration = () => {
        let showSellingNAdministration = []
        let result = calculateSellingAdminiStration(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected
        )
        showSellingNAdministration = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showSellingNAdministration
    }
    showExpense = () => {
        let showExpense = []
        let result = calculateAllExpense(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected
        )
        showExpense = result.map((e, index) => {
            return <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={index}>{e.toLocaleString('EN')}</Table.HeaderCell>
        })
        return showExpense
    }
    showEbitda = () => {
        let showEbitda = []
        let result = calculateEbitda(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected
        )
        showEbitda = result.map((e, index) => {
            return <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={index}>{e.toLocaleString('EN')}</Table.HeaderCell>
        })
        return showEbitda 
    }
    showDepreciation = () => {
        let showDepreciation = []
        let result = calculateAllDepreciation(this.props.businessScenarioData, this.props.decorationSelected, this.props.businessScenarioData.BusinessPlayingYear)
        showDepreciation = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showDepreciation
    }
    showAmortisation = () => {
        let showAmortisation = []
        let result = calculateAllAmortisation(this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)
        showAmortisation = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showAmortisation
    }
    showEbit = () => {
        let showEbit = []
        let result = calculateEbit(
            this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected
        )
        showEbit = result.map((e, index) => {
            return <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={index}>{e.toLocaleString('EN')}</Table.HeaderCell>
        })
        return showEbit
    }
    showInterest = () => {
        let showInterest = []
        let result = calculateInterest(
            this.props.decorationSelected,
            this.props.productSelected,
            this.props.businessScenarioData,
            this.props.businessScenarioData.BusinessPlayingYear,
        )
        showInterest = result.map((e, index) => {
            return <Table.Cell key={index}>{e.interest.toLocaleString('EN')}</Table.Cell>
        })
        return showInterest
    }
    showNewEbit = () => {
        let showNewEbit = []
        let result = calculateNewEbit(this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected)
        showNewEbit = result.map((e, index) => {
            return <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={index}>{e.toLocaleString('EN')}</Table.HeaderCell>
        })
        return showNewEbit
    }
    showTax = () => {
        let showTax = []
        let result = calculateTax(this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected)
        showTax = result.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showTax
    }
    showNetProfit = () => {
        let showNetProfit = []
        let result = calculateNetProfit(this.props.productSelected,
            this.props.productTypeAcceptSelected,
            this.props.employeeSelected,
            this.props.parttimeEmployeeSelected,
            this.props.totalTimeSelected,
            this.props.daySelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.marketShared,
            this.props.businessScenarioData.BusinessPlayingYear,
            this.props.targetGroupSelected,
            this.props.marketingSelected,
            this.props.decorationSelected)
        showNetProfit = result.map((e, index) => {
            return <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={index}>{e.toLocaleString('EN')}</Table.HeaderCell>
        })
        return showNetProfit
    }

    showTotalRev = () => {
        this.setState({ collapseTotalRev: !this.state.collapseTotalRev });
    }

    render() {
        return (
            <Scrollbars
                style={{ width: '100%', height: 1000 }}
                >
                <Table singleLine size='small'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='12' style={{ width: '150%' }}>
                                Profit/Loss
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            {this.showYearHeader()}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} >
                                Revenue
                            </Table.HeaderCell>
                            {this.showTotalRevenue()}
                        </Table.Row>
                        {this.showProductRevenue()}
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>
                                Cost of Goods Sold
                            </Table.HeaderCell>
                            {this.showTotalCostOfGoodSold()}
                        </Table.Row>
                        {this.showCostOfGoodSold()}
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop:'solid 2px #000000'}}>Gross Profit</Table.HeaderCell>
                            {this.showGrossProfit()}
                        </Table.Row>
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Expenses</Table.HeaderCell>
                            {this.showExpense()}
                        </Table.Row>
                        {this.props.businessScenarioData !== undefined && this.props.businessScenarioData.OwnershipName !== "Buy" ?
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                {this.props.businessScenarioData.OwnershipName === "Rent" ?
                                    <Table.HeaderCell style={{ paddingLeft: '2em' }}> Rental </Table.HeaderCell>
                                    :
                                    <Table.HeaderCell style={{ paddingLeft: '2em' }}> Rental On Lease</Table.HeaderCell>
                                } 
                                {this.showRental()}
                            </Table.Row>
                            :
                            ""
                        }
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                            <Table.HeaderCell style={{ paddingLeft: '2em' }}>
                                Wages
                            </Table.HeaderCell>
                            {this.showWage()}
                        </Table.Row>
                        {this.props.employeeSelected !== undefined ?
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '3em' }}>Fulltime Wages</Table.Cell>
                                {this.showAllFullTime()}
                            </Table.Row>
                            : ""}
                        {this.showWageEachJob()}
                        {this.props.parttimeEmployeeSelected !== undefined ?
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '3em' }}>Parttime Wages</Table.Cell>
                                {this.showAllPartTime()}
                            </Table.Row>
                            : ""}
                        {this.showPartPayEachJob()}
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                            <Table.HeaderCell style={{ paddingLeft: '2em' }}>Selling and Administration</Table.HeaderCell>
                            {this.showSellingNAdministration()}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell style={{ paddingLeft: '3em' }}>Utility</Table.Cell>
                            {this.showUtility()}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell style={{ paddingLeft: '3em' }}>Operating Licenses</Table.Cell>
                            {this.showOperatingLicense()}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell style={{ paddingLeft: '3em' }}>Accounting fees</Table.Cell>
                            {this.showAccFee()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '3em' }}>Maintainance</Table.Cell>
                            {this.showMaintain()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '3em' }}>Signate and land Taxes</Table.Cell>
                            {this.showLandTax()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '3em' }}>Marketing costs</Table.Cell>
                            {this.showMarketing()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '3em' }}>Loss from inventory write-off</Table.Cell>
                            {this.showLoss()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '3em' }}>Storage costs</Table.Cell>
                            {this.showStorageCost()}
                        </Table.Row>
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                            <Table.HeaderCell style={{ paddingLeft: '2em' }}>Others</Table.HeaderCell>
                            {this.showOtherCost()}
                        </Table.Row>
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>EBITDA</Table.HeaderCell>
                            {this.showEbitda()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Depreciation</Table.Cell>
                            {this.showDepreciation()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Amortisation</Table.Cell>
                            {this.showAmortisation()}
                        </Table.Row>
                        {/* {this.showEbitda()} */}
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>EBIT</Table.HeaderCell>
                            {this.showEbit()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Interest</Table.Cell>
                            {this.showInterest()}
                        </Table.Row>
                        {/* {this.showEbitOld()} */}
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>EBIT</Table.HeaderCell>
                            {this.showNewEbit()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Tax</Table.Cell>
                            {this.showTax()}
                        </Table.Row>
                        {/* {this.showEbitNew()} */}
                        <Table.Row active>
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Net profit</Table.HeaderCell> 
                            {this.showNetProfit()}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Scrollbars>
        )

    }
}