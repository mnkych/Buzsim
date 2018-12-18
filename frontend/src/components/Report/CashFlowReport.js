import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import {
    Label,
    Table,
} from 'semantic-ui-react';
import {
    calculateAllDepreciation,
    calculateAllAmortisation,
    calculateInterest,
    calculateNetProfit,
} from '../../Provider/ProductSellingReportProvider/ProductSellingReportProvider'

import {
    calculateTotalCurrentInventoryValue,
    calculateAccountPayable,
    calculateNetWorkingCapital,
    calculateChangeInNetWorkingCapital,
    calculateTotalOperatingCashFlow,
    calculateTotalFinancialCashFlow,
    calcualateNetCashFlow,
    calculateEndingCF,
    calculateBeginningCF,
    calculateIRR
} from '../../Provider/CashFlowProvider/CashFlowProvider'
import {
    calculateTotalDept
} from '../../Provider/StoreProvider/StoreProvider'


export default class CashFlowReport extends React.Component {
    showYearHeader = () => {
        let showYearHeader = []
        for (let i = 0; i <= this.props.businessScenarioData.BusinessPlayingYear; i++) {
            showYearHeader.push(
                <Table.HeaderCell key={i}>
                    <Label>YEAR {i}</Label>
                </Table.HeaderCell>)
        }
        return showYearHeader
    }
    showOperatingProfit = () => {
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
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return showNetProfit
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
    showTotalCurrentInventoryValue = () => {
        let value = []
        let productValue =
            calculateTotalCurrentInventoryValue(
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
        value = productValue.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showAccountPayable = () => {
        let value = []
        let accountPayable =
            calculateAccountPayable(
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
        value = accountPayable.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showShortTerm = () => {
        let value = []
        let showShortTerm =
            calculateInterest(
                this.props.decorationSelected,
                this.props.productSelected,
                this.props.businessScenarioData,
                this.props.businessScenarioData.BusinessPlayingYear
            )
        value = showShortTerm.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.plan.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showNetWorkingCapital = () => {
        let value = []
        let showNWCapital =
            calculateNetWorkingCapital(
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
        value = showNWCapital.map((e, i) => {
            return (
                <Table.HeaderCell key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    showChangeInNetWorkingCapital = () => {
        let value = []
        let showCNWCapital =
            calculateChangeInNetWorkingCapital(
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
        value = showCNWCapital.map((e, i) => { 
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    showTotalOperatingCashFlow = () => {
        let value = []
        let totalCashFlow =
            calculateTotalOperatingCashFlow(
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
        value = totalCashFlow.map((e, i) => {
            return (
                <Table.HeaderCell key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    showRepaymentPlan = () => {
        let value = []
        let showRepaymentPlan =
            calculateInterest(
                this.props.decorationSelected,
                this.props.productSelected,
                this.props.businessScenarioData,
                this.props.businessScenarioData.BusinessPlayingYear
            )
        value = showRepaymentPlan.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{(e.plan * (-1)).toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showInterestPayment = () => {
        let showInterest = []
        let result = calculateInterest(
            this.props.decorationSelected,
            this.props.productSelected,
            this.props.businessScenarioData,
            this.props.businessScenarioData.BusinessPlayingYear,
        )
        showInterest = result.map((e, index) => {
            return <Table.Cell key={index}>{(e.interest * (-1).toLocaleString('EN'))}</Table.Cell>
        })
        return showInterest
    }
    showTotalFinancialCashFlow = () => {
        let showFinanceCashflow = []
        let result = calculateTotalFinancialCashFlow(
            this.props.decorationSelected,
            this.props.productSelected,
            this.props.businessScenarioData,
            this.props.businessScenarioData.BusinessPlayingYear, 
        )
        showFinanceCashflow = result.map((e, index) => {
            return <Table.HeaderCell key={index}>{e.toLocaleString('EN')}</Table.HeaderCell>
        })
        return showFinanceCashflow
    }
    showNetCashFlow = () => {
        let value = []
        let totalNetCashFlow =
            calcualateNetCashFlow(
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
        value = totalNetCashFlow.map((e, i) => {
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    showBeginCF = () => {
        let value = []
        let showBeginCF =
            calculateBeginningCF(
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
        value = showBeginCF.map((e, i) => {
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    showEndingCF = () => {
        let value = []
        let showEndingCF =
            calculateEndingCF(
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
        value = showEndingCF.map((e, i) => {
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    render() {

        return (
            <div>
                <Scrollbars
                    style={{ width: '100%', height: 1000 }}
                    >
                    <Table singleLine size='small'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='12'>
                                    Cash Flow
                            </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                {this.showYearHeader()}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Internal rate of return (IRR)</Table.HeaderCell>
                                <Table.HeaderCell colSpan='11' style={{ borderTop: 'solid 2px #000000' }}>
                                    {this.props === undefined && this.props !== {} && this.props !== null ? 0 : calculateIRR(
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
                                    )+' %'}
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell colSpan='12' style={{ borderTop: 'solid 2px #000000' }}>Working Capital</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Inventory</Table.Cell>
                                {this.showTotalCurrentInventoryValue()}
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Account Payable</Table.Cell>
                                {this.showAccountPayable()}
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Short Term Reliability</Table.Cell>
                                {this.showShortTerm()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell>Networking Capital</Table.HeaderCell>
                                {this.showNetWorkingCapital()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Change Networking Capital</Table.HeaderCell>
                                {this.showChangeInNetWorkingCapital()}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell colSpan='12' style={{ borderTop: 'solid 2px #000000' }}>Operating Cash flow</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row><Table.Cell style={{ paddingLeft: '2em' }}>Operating profit</Table.Cell>
                                {this.showOperatingProfit()}
                            </Table.Row>
                            <Table.Row><Table.Cell style={{ paddingLeft: '2em' }}>Depreciation</Table.Cell>
                                {this.showDepreciation()}
                            </Table.Row>
                            <Table.Row><Table.Cell style={{ paddingLeft: '2em' }}>Amortisation</Table.Cell>
                                {this.showAmortisation()}
                            </Table.Row>
                            <Table.Row><Table.Cell style={{ paddingLeft: '2em' }}>Interest</Table.Cell>
                                {this.showInterest()}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell style={{ paddingLeft: '2em',borderTop: 'solid 2px #000000' }}>Change in Net working Capital</Table.HeaderCell>
                                {this.showChangeInNetWorkingCapital()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell>Total Operating Cash flow</Table.HeaderCell>
                                {this.showTotalOperatingCashFlow()}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell colSpan='12' style={{ borderTop: 'solid 2px #000000' }}>Financial Cash flow</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Equity</Table.Cell>
                                <Table.Cell colSpan='11'>{this.props.businessScenarioData === undefined ? 0 : this.props.businessScenarioData.BusinessStartMoney.toLocaleString('EN')}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Loan drawdown</Table.Cell>
                                <Table.Cell colSpan='11'>
                                    {this.props.decorationSelected !== undefined || this.props.productSelected !== undefined || this.props.businessScenarioData !== undefined ?
                                        calculateTotalDept(this.props.decorationSelected, this.props.productSelected, this.props.businessScenarioData) * (-1) > 0 ?
                                            (calculateTotalDept(this.props.decorationSelected, this.props.productSelected, this.props.businessScenarioData) * (-1)).toLocaleString('EN') : 0
                                        : 0}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Loan repayment</Table.Cell>
                                {this.showRepaymentPlan()}
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ paddingLeft: '2em' }}>Interest payment</Table.Cell>
                                {this.showInterestPayment()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell>Total Financial Cash flow</Table.HeaderCell>
                                {this.showTotalFinancialCashFlow()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} >Investment</Table.HeaderCell>
                                <Table.HeaderCell colSpan='11' style={{ borderTop: 'solid 2px #000000' }} >
                                    {this.props.decorationSelected !== undefined || this.props.productSelected !== undefined || this.props.businessScenarioData !== undefined ?
                                            (Math.round(((this.props.businessScenarioData.BusinessStartMoney - calculateTotalDept(this.props.decorationSelected, this.props.productSelected, this.props.businessScenarioData)) * (-1)) * 100) / 100).toLocaleString('EN')
                                        : 0}
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Net Cash Flow</Table.HeaderCell>
                                {this.showNetCashFlow()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Beginning CF</Table.HeaderCell>
                                {this.showBeginCF()}
                            </Table.Row>
                            <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Ending CF</Table.HeaderCell>
                                {this.showEndingCF()}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Scrollbars>
            </div>
        )

    }
}